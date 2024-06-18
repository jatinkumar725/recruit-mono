import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
  Image,
  Text,
  Spinner,
} from "@chakra-ui/react";

import InnerBanner from "../../../components/InnerBanner";
import { SITE_DIR_URI } from "../../../constants/siteConstants";

// Importing rc authentication slice
import { useRcLoginMutation, } from "../../../state/recruiter/authentication/api";
import { setCredentials } from "../../../state/recruiter/authentication/slice";

import ErrorComponent, { useError } from "../../../components/Error/Para";
import { APP_ROUTES } from "../../../constants/routeConstant";

const LoginFormSchema = Yup.object().shape({
  username: Yup
    .string()
    .trim()
    .email("Email address must be a valid email")
    .required("Email address is required"),
  password: Yup.string().trim().required("Password is required"),
});

const Index = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [rcLogin, { isLoading: isRCaLoginLoading }] = useRcLoginMutation();

  /**
   * Error Handling
   */
  const [errorMessage, setError] = useError();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginFormSchema,
    onSubmit: async (values) => {
      try {
        const response = await rcLogin(values).unwrap();

        // Dispatch action to set credentials
        dispatch(setCredentials(response.data));

        // Redirect to recruiter dashboard
        navigate('/recruit/dashboard/homepage');

      } catch (error) {
        // console.log(error);
        const loginErrorMessage = error.data.message;
        setError(loginErrorMessage);
      }
    },
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <InnerBanner heading="Employer Login" subTitle="Login to your account" />
      <section className="registration-section position-relative pt-100 lg-pt-80 pb-150 lg-pb-80">
        <div className="container">
          <div className="user-data-form">
            <div className="text-center">
              <h2>Ready to hire like you're in 2050?</h2>
            </div>
            <ErrorComponent errorMessage={errorMessage} />
            <div className="form-wrapper m-auto">
              <form onSubmit={formik.handleSubmit}>
                <div className="row">
                  <div className="col-12">
                    <div className="input-group-meta position-relative mb-25 int-x-52 inp-h-55">
                      <FormControl
                        isInvalid={
                          formik.touched.username && formik.errors.username
                        }
                        isRequired
                      >
                        <FormLabel htmlFor="username">
                          Email Address
                        </FormLabel>
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          required={false}
                          {...formik.getFieldProps("username")}
                        />
                        {
                          <FormErrorMessage>
                            {formik.errors.username}
                          </FormErrorMessage>
                        }
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input-group-meta position-relative mb-20 inp-h-55">
                      <FormControl
                        isInvalid={
                          formik.touched.password && formik.errors.password
                        }
                        isRequired
                      >
                        <FormLabel htmlFor="Password">Password</FormLabel>
                        <Input
                          type={showPassword ? "text" : "Password"}
                          placeholder="Enter password"
                          className="pass_log_id"
                          required={false}
                          {...formik.getFieldProps("password")}
                        />
                        {
                          <FormErrorMessage>
                            {formik.errors.password}
                          </FormErrorMessage>
                        }
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
                    {/* <Link to="#" className="forgot-pass text-primary ms-auto d-block text-end">
                      Forgot Password?
                    </Link> */}
                  </div>
                  <div className="col-12">
                    <Button
                      type="submit"
                      className="btn-eleven fw-500 tran3s d-block mt-20 d-flex align-items-center justify-content-center"
                      isLoading={isRCaLoginLoading}
                      spinner={<Spinner size="md" />}
                    >
                      Login
                    </Button>
                  </div>
                </div>
              </form>

              <Text className="text-center mt-10">
                Don't have an account?
                <Link to={APP_ROUTES.RecruiterRegister} className="fw-500">
                  Register
                </Link>
              </Text>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;