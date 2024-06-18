import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  InputGroup,
  InputLeftElement,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
  Spinner,
  Text,
  Image,
} from "@chakra-ui/react";

import InnerBanner from "../../../components/InnerBanner";
import { COMPANY_SIZE, SITE_DIR_URI } from "../../../constants/siteConstants";

import JBSelect from "./../../../utils/JBSelect";
import AsyncSelectWithFetch from "./../../../utils/AsyncJBSelect";

// Importing rc authentication slice
import { useRcRegisterMutation } from "../../../state/recruiter/authentication/api";
import { setCredentials } from "../../../state/recruiter/authentication/slice";

import ErrorComponent, { useError } from "../../../components/Error/Para";
import { APP_ROUTES } from "../../../constants/routeConstant";

const RegisterFormSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .trim()
    .max(32, "Name must be maximum of 32 characters")
    .matches(/^[a-zA-Z\s.']+$/, "Name can only contain letters, spaces, and '.'"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),
  mobile: Yup.string()
    .required("Mobile number is required")
    .matches(/^\d{10}$/, "Please enter a valid 10 digit Mobile Number"),
  industry: Yup.string().required("Industry is required").trim(),
  company: Yup.string().required("Company name is required").trim(),
  companySize: Yup.string().required("Company size is required"),
  roleAtCompany: Yup.string().required("Role at company is required").trim(),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [rcRegister, { isLoading: isRCaLoginLoading }] = useRcRegisterMutation();

  // Error Handling
  const [errorMessage, setError] = useError();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      industry: "",
      company: "",
      companySize: "",
      roleAtCompany: "",
      password: "",
    },
    validationSchema: RegisterFormSchema,
    onSubmit: async (values) => {
      try {
        const response = await rcRegister(values).unwrap();
        console.log('response', response)
        dispatch(setCredentials(response.data));
        navigate('/recruit/dashboard/homepage');
      } catch (error) {
        const loginErrorMessage = error.data.message;
        setError(loginErrorMessage);
      }
    },
  });

  const companySizeOptions = Object.entries(COMPANY_SIZE).map(
    ([value, label]) => ({ value: parseInt(value), label })
  );

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <InnerBanner
        heading="Employer Register"
        subTitle="Find & hire the right talent with us"
      />
      <section className="registration-section position-relative pt-100 lg-pt-80 pb-150 lg-pb-80">
        <div className="container">
          <div className="user-data-form">
            <div className="text-center">
              <h2>Create Your Account</h2>
            </div>
            <ErrorComponent errorMessage={errorMessage} />
            <div className="form-wrapper m-auto">
              <form onSubmit={formik.handleSubmit}>
                <div className="row">
                  <div className="col-12">
                    <div className="input-group-meta position-relative mb-25 int-x-52 inp-h-55">
                      <FormControl
                        isInvalid={formik.touched.name && formik.errors.name}
                        isRequired
                      >
                        <FormLabel className="fw-bold" htmlFor="name">Name</FormLabel>
                        <Input
                          type="text"
                          required={false}
                          placeholder="Enter your name"
                          {...formik.getFieldProps("name")}
                        />
                        <FormErrorMessage>
                          {formik.errors.name}
                        </FormErrorMessage>
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input-group-meta position-relative mb-25 int-x-52 inp-h-55">
                      <FormControl
                        isInvalid={formik.touched.email && formik.errors.email}
                        isRequired
                      >
                        <FormLabel className="fw-bold" htmlFor="email">Email Address</FormLabel>
                        <Input
                          type="email"
                          required={false}
                          placeholder="Enter your email address"
                          {...formik.getFieldProps("email")}
                        />
                        <FormErrorMessage>
                          {formik.errors.email}
                        </FormErrorMessage>
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input-group-meta position-relative inp-h-55 mb-25">
                      <FormControl
                        isInvalid={
                          formik.touched.mobile && formik.errors.mobile
                        }
                        isRequired
                      >
                        <FormLabel className="fw-bold" htmlFor="mobile">Mobile Number</FormLabel>
                        <InputGroup>
                          <InputLeftElement height="100%">
                            {" "}
                            {/* color="#7180ad" */}
                            +91
                          </InputLeftElement>
                          <Input
                            type="tel"
                            required={false}
                            placeholder="Enter your mobile number"
                            {...formik.getFieldProps("mobile")}
                          />
                        </InputGroup>
                        <FormErrorMessage>
                          {formik.errors.mobile}
                        </FormErrorMessage>
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input-group-meta position-relative mb-25 int-x-52">
                      <FormControl
                        isInvalid={
                          formik.touched.industry && formik.errors.industry
                        }
                        isRequired
                      >
                        <FormLabel className="fw-bold" htmlFor="industry">Industry</FormLabel>
                        <AsyncSelectWithFetch
                          components={{
                            DropdownIndicator: null
                          }}
                          placeholder="Enter your industry"
                          taxonomy="industry"
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              boxShadow:
                                formik.errors.industry && formik.touched.industry
                                  ? "0 0 0 1px #E53E3E !important"
                                  : "",
                              borderRadius: "8px",
                            }),
                          }}
                          onChange={(selectedOption, { action }) => {
                            formik.handleChange({
                              target: {
                                name: "industry",
                                value: selectedOption.label,
                              },
                            });
                          }}
                        />
                        <FormErrorMessage>
                          {formik.errors.industry}
                        </FormErrorMessage>
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input-group-meta position-relative mb-25 int-x-52">
                      <FormControl
                        isInvalid={
                          formik.touched.company && formik.errors.company
                        }
                        isRequired
                      >
                        <FormLabel className="fw-bold" htmlFor="company">Company Name</FormLabel>
                        <AsyncSelectWithFetch
                          components={{
                            DropdownIndicator: null
                          }}
                          placeholder="Enter your company"
                          taxonomy="company"
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              boxShadow:
                                formik.errors.company && formik.touched.company
                                  ? "0 0 0 1px #E53E3E !important"
                                  : "",
                              borderRadius: "8px",
                            }),
                          }}
                          onChange={(selectedOption, { action }) => {
                            formik.handleChange({
                              target: {
                                name: "company",
                                value: selectedOption.label,
                              },
                            });
                          }}
                        />
                        <FormErrorMessage>
                          {formik.errors.company}
                        </FormErrorMessage>
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input-group-meta position-relative mb-25">
                      <FormControl
                        isInvalid={
                          formik.touched.companySize &&
                          formik.errors.companySize
                        }
                        isRequired
                      >
                        <FormLabel className="fw-bold" htmlFor="companySize">
                          Company Size
                        </FormLabel>
                        <JBSelect
                          required={false}
                          placeholder="Select company size"
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              height: "55px", // Adjust the height of the control container
                              boxShadow:
                                formik.errors.companySize &&
                                formik.touched.companySize
                                  ? "0 0 0 1px #E53E3E !important"
                                  : "",
                              borderRadius: "8px",
                            }),
                            input: (baseStyles, state) => ({
                              ...baseStyles,
                              height: "100%", // Adjust the height of the input field
                            }),
                          }}
                          options={companySizeOptions}
                          onChange={(selectedOption) => {
                            // Formik expects the selected value to be passed to the handleChange function
                            formik.handleChange({
                              target: {
                                name: "companySize",
                                value: selectedOption.value,
                              },
                            });
                          }}
                        />
                        <FormErrorMessage>
                          {formik.errors.companySize}
                        </FormErrorMessage>
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input-group-meta position-relative mb-25 int-x-52 inp-h-55">
                      <FormControl
                        isInvalid={
                          formik.touched.roleAtCompany &&
                          formik.errors.roleAtCompany
                        }
                        isRequired
                      >
                        <FormLabel className="fw-bold" htmlFor="roleAtCompany">
                          Role at Company
                        </FormLabel>
                        <Input
                          type="text"
                          required={false}
                          placeholder="Enter your role at company"
                          {...formik.getFieldProps("roleAtCompany")}
                        />
                        <FormErrorMessage>
                          {formik.errors.roleAtCompany}
                        </FormErrorMessage>
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input-group-meta position-relative int-x-52 inp-h-55 mb-20">
                      <FormControl
                        isInvalid={
                          formik.touched.password && formik.errors.password
                        }
                        isRequired
                      >
                        <FormLabel className="fw-bold" htmlFor="password">Password</FormLabel>
                        <Input
                          type={showPassword ? "text" : "Password"}
                          required={false}
                          placeholder="Enter password"
                          className="pass_log_id"
                          {...formik.getFieldProps("password")}
                        />
                        <FormErrorMessage>
                          {formik.errors.password}
                        </FormErrorMessage>
                        <span
                          className="placeholder_icon"
                          onClick={handleTogglePassword}
                        >
                          <span
                            className={`passVicon ${
                              showPassword ? "eye-slash" : ""
                            }`}
                          >
                            <Image
                              src={`${SITE_DIR_URI}images/icon/icon_60.svg`}
                              alt=""
                            />
                          </span>
                        </span>
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-12">
                    <Button
                      type="submit"
                      className="btn-eleven fw-500 tran3s d-block mt-20 d-flex align-items-center justify-content-center"
                      isLoading={isRCaLoginLoading}
                      spinner={<Spinner size="md" />}
                    >
                      Create Account
                    </Button>
                  </div>
                </div>
              </form>

              <Text className="text-center mt-10">
                Have an account?
                <NavLink to={APP_ROUTES.RecruiterLogin} className="fw-500">
                  Login
                </NavLink>
              </Text>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
