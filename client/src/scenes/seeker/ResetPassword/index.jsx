import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  Spinner,
} from "@chakra-ui/react";

import InnerBanner from "../../../components/InnerBanner";

// Importing sk authentication slice
import {
  useSkRequestValidateResetPasswordCodeMutation,
  useSkResetPasswordMutation,
} from "../../../state/seeker/authentication/api";

import ErrorComponent, { useError } from "../../../components/Error/Para";

const ResetPasswordFormSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .trim(),
  confirmNewPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required("Confirm password is required"),
});

const Index = () => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const verificationCode = searchParams.get("rpId");

  // Mutations
  const [skRequestValidateResetPasswordCode, { isLoading: isRequestValidateResetPasswordCodeLoading }] = useSkRequestValidateResetPasswordCodeMutation();
  const [skResetPassword, { isLoading: isResetPasswordLoading }] = useSkResetPasswordMutation();

  const verifyCode = async () => {
    try {
      const response = await skRequestValidateResetPasswordCode({
        otp: verificationCode
      }).unwrap();

      if (response && 'Invalid OTP' === response.message) {
        navigate("/rpLogin/forgotPassword");
      }

    } catch (error) {
      console.log('error', error);
      navigate("/rpLogin/forgotPassword");
    }
  }

  useEffect(() => {
    if (!verificationCode) {
      navigate("/rpLogin/forgotPassword");
      return;
    }

    verifyCode();
  }, [verificationCode]);

  /**
   * Error Handling
   */
  const [errorMessage, setError] = useError();

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: ResetPasswordFormSchema,
    onSubmit: async (values) => {
      try {
        const { newPassword } = values;

        const response = await skResetPassword({
          newPassword,
          code: verificationCode
        }).unwrap();

        if (response && 'Password reset successfully' === response.message) {
          navigate("/rpLogin");
        }

      } catch (error) {
        // console.log(error);
        const resetPasswordErrorMessage = error.data.message;
        setError(resetPasswordErrorMessage);
      }
    },
  });

  return (
    <>
      <InnerBanner heading="Reset your password"/>
      <section className="registration-section position-relative pt-100 lg-pt-80 pb-150 lg-pb-80">
        <div className="container">
          <div className="user-data-form">
            <div className="text-center">
              <h2>Reset password</h2>
            </div>
            <ErrorComponent errorMessage={errorMessage} />
            <div className="form-wrapper m-auto">
              <form onSubmit={formik.handleSubmit}>
                <div className="row">
                  <div className="col-12">
                    <div className="input-group-meta position-relative mt-20 mb-25 int-x-52 inp-h-55">
                      <FormControl
                        isInvalid={
                          formik.touched.newPassword && formik.errors.newPassword
                        }
                      >
                        <Input
                          type="password"
                          placeholder="Enter new password"
                          {...formik.getFieldProps("newPassword")}
                        />
                        {
                          <FormErrorMessage>
                            {formik.errors.newPassword}
                          </FormErrorMessage>
                        }
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input-group-meta position-relative mb-25 int-x-52 inp-h-55">
                      <FormControl
                        isInvalid={
                          formik.touched.confirmNewPassword && formik.errors.confirmNewPassword
                        }
                      >
                        <Input
                          type="password"
                          placeholder="Re-enter new password"
                          {...formik.getFieldProps("confirmNewPassword")}
                        />
                        {
                          <FormErrorMessage>
                            {formik.errors.confirmNewPassword}
                          </FormErrorMessage>
                        }
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-12">
                    <Button
                      type="submit"
                      className="btn-eleven fw-500 mb-25 tran3s d-block d-flex align-items-center justify-content-center"
                      isLoading={isResetPasswordLoading}
                      spinner={<Spinner size="md" />}
                    >
                      Reset Password
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;