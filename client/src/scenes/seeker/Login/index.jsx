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
  Divider,
  Image,
  Text,
  Spinner,
} from "@chakra-ui/react";

import InnerBanner from "./../../../components/InnerBanner";
import { SITE_DIR_URI } from "../../../constants/siteConstants";

// Importing sk authentication slice
import { useSkLoginMutation, useLazySkSignInWithGoogleQuery } from "./../../../state/seeker/authentication/api";
import { setCredentials } from "./../../../state/seeker/authentication/slice";

import ErrorComponent, { useError } from "./../../../components/Error/Para";
import { APP_ROUTES } from "../../../constants/routeConstant";
import { useLazyGetLoginStatusQuery } from "../../../state/site/LoginStatus/api";
// import { GoogleLogin } from 'react-google-login';

const LoginFormSchema = Yup.object().shape({
  username: Yup
    .string()
    .trim()
    .email()
    .required("Email address is required"),
  password: Yup.string().trim().required("Password is required"),
});

const Index = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const redirectURL = searchParams.get('redirectURL');

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [skLogin, { isLoading: isSKaLoginLoading }] = useSkLoginMutation();
  const [triggerSkSignInWithGoogle] = useLazySkSignInWithGoogleQuery();
  const [triggerLoginStatus] = useLazyGetLoginStatusQuery();

  const checkLoginStatus = async () => {
    try {
      const response = await triggerLoginStatus().unwrap();
      if (response.loggedIn) {
        navigate(APP_ROUTES.SeekerDashboard);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

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
      username: "",
      password: "",
    },
    validationSchema: LoginFormSchema,
    onSubmit: async (values) => {
      try {
        const response = await skLogin(values).unwrap();

        // Dispatch action to set credentials
        dispatch(setCredentials(response.data));

        // Redirect seeker to page
        if (redirectURL) {
          window.location.href = redirectURL;
        } 
        navigate(APP_ROUTES.SeekerDashboard);

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

  return (
    <>
      <InnerBanner heading="Login" subTitle="Login to your account" />
      <section className="registration-section position-relative pt-100 lg-pt-80 pb-150 lg-pb-80">
        <div className="container">
          <div className="user-data-form">
            <div className="text-center">
              <h2>Hi, Welcome Back!</h2>
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
                          {...formik.getFieldProps("username")}
                          required={false}
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
                          {...formik.getFieldProps("password")}
                          required={false}
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
                    <Link to={APP_ROUTES.SeekerForgotPassword} className="forgot-pass text-primary ms-auto d-block text-end">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="col-12">
                    <Button
                      type="submit"
                      className="btn-eleven fw-500 tran3s d-block mt-20 d-flex align-items-center justify-content-center"
                      isLoading={isSKaLoginLoading}
                      spinner={<Spinner size="md" />}
                      fontWeight={500}
                    >
                      Login
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
                  SignIn with Google
                </Text>
              </Button>
              <Text className="text-center mt-10">
                Don't have an account?
                <Link to={APP_ROUTES.SeekerRegister} className="fw-500">
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
