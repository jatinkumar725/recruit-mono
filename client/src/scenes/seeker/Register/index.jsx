import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
  Flex,
  Text,
  Divider,
  Image,
  Spinner,
} from "@chakra-ui/react";

import InnerBanner from "./../../../components/InnerBanner";

// Importing sk authentication slice
import { useSkRegisterMutation, useLazySkSignInWithGoogleQuery } from "./../../../state/seeker/authentication/api";
import { setCredentials } from "./../../../state/seeker/authentication/slice";

import ErrorComponent, { useError } from "./../../../components/Error/Para";
import { APP_ROUTES } from "../../../constants/routeConstant";
import { SITE_DIR_URI } from "../../../constants/siteConstants";

const RegisterFormSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .trim()
    .max(32, "Name must be maximum of 32 characters")
    .matches(/^[a-zA-Z\s.']+$/, "Name can only contain letters, spaces, and '.'"),
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email address is required"),
  password: Yup.string()
    .required("Password is required")
    .trim()
    .min(6),
});

const Index = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const redirectURL = searchParams.get('redirectURL');

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [skRegister, { isLoading: isSKRegisterLoading }] = useSkRegisterMutation();
  const [triggerSkSignInWithGoogle] = useLazySkSignInWithGoogleQuery();

  useEffect(() => {
    
    // Get redirect URL from session storage if its not exsist in url
    if (!redirectURL) {

      const redirectURLFromSession = sessionStorage.getItem('redirectURL');
      
      // Attach redirect url to page url
      if (redirectURLFromSession) {
        setSearchParams({'redirectURL': redirectURLFromSession});
      }

    }

  }, []);

   /**
   * Error Handling
   */
   const [errorMessage, setError] = useError();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: RegisterFormSchema,
    onSubmit: async (values) => {
      try {
        
        const response = await skRegister(values).unwrap();

        // Dispatch action to set credentials
        dispatch(setCredentials(response.data));

        // Redirect seeker to page
        if (redirectURL) {
          window.location.href = redirectURL;
        } 
        navigate(APP_ROUTES.SeekerDashboard);

      } catch (error) {
        // console.error(error);
        const registerErrorMessage = error.data.message;
        setError(registerErrorMessage);
      }
    },
  });

  const SignInWithGoogle = async () => {
    try {
      const response = await triggerSkSignInWithGoogle();

      if (response.data) {
        const { redirectUrl } = response.data;
        // window.open(redirectUrl, '_blank', 'width=400,height=400,left=200,top=100');
        window.location.href = redirectUrl;
      }

    } catch (error) {
      console.error('error', error)
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <InnerBanner
        heading="Register"
        subTitle="Create an account & start getting job"
      />
      <section className="registration-section position-relative pt-100 lg-pt-80 pb-150 lg-pb-80">
        <div className="container">
          <div className="user-data-form">
            <div className="text-center">
              <h2>Create Account</h2>
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
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input
                          type="text"
                          placeholder="Enter your name"
                          {...formik.getFieldProps("name")}
                          maxLength={32}
                          required={false}
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
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          {...formik.getFieldProps("email")}
                          required={false}
                        />
                        <FormErrorMessage>
                          {formik.errors.email}
                        </FormErrorMessage>
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
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input
                          type={showPassword ? "text" : "Password"}
                          placeholder="Enter password"
                          className="pass_log_id"
                          {...formik.getFieldProps("password")}
                          required={false}
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
                      isLoading={isSKRegisterLoading}
                      spinner={<Spinner size="md" />}
                      fontWeight={500}
                    >
                      Register
                    </Button>
                  </div>
                </div>
              </form>

              <Divider my={3} />

              <Flex align="center" justify="center" mt={3}>
                <Divider flex="1" />
                <Text px={3}>OR</Text>
                <Divider flex="1" />
              </Flex>

              <Button
                className="social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10"
                variant="outline"
                fontWeight={500}
                onClick={() => SignInWithGoogle()}
              >
                <Image src={`${SITE_DIR_URI}images/icon/google.png`} alt="sign in with google" />
                <Text ps={2} mb={0}>
                  Signup with Google
                </Text>
              </Button>
              <Text className="text-center mt-10">
                Have an account?
                <Link to={APP_ROUTES.SeekerLogin} className="fw-500">
                  {" "}
                  Login
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
