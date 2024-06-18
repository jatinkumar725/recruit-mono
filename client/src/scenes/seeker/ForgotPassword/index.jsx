import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  useSkRequestResetPasswordMutation,
} from "../../../state/seeker/authentication/api";

import ErrorComponent, { useError } from "../../../components/Error/Para";

const ForgetPasswordFormSchema = Yup.object().shape({
  email: Yup.string().email().required("Email address is required").trim(),
});

const Index = () => {

  const navigate = useNavigate();

  /**
   * Error Handling
   */
  const [errorMessage, setError] = useError();

  // Mutations
  const [skRequestResetPassword, { isLoading: isRequestResetPasswordLoading }] = useSkRequestResetPasswordMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgetPasswordFormSchema,
    onSubmit: async (values) => {
      try {
        const response = await skRequestResetPassword(values).unwrap();

        if (response) {
          const requestResetSuccessMessage = response.message;
          setError(requestResetSuccessMessage);
        }

      } catch (error) {
        const requestResetErrorMessage = error.data.message;
        setError(requestResetErrorMessage);
      }
    },
  });

  return (
    <>
      <InnerBanner heading="Forgot your password?" />
      <section className="registration-section position-relative pt-100 lg-pt-80 pb-150 lg-pb-80">
        <div className="container">
          <div className="user-data-form">
            <div className="text-center mb-25">
              <h2>Request reset password</h2>
            </div>
            <ErrorComponent errorMessage={errorMessage} />
            <div className="form-wrapper m-auto">
              <form onSubmit={formik.handleSubmit}>
                <div className="row">
                  <div className="col-12">
                    <div className="input-group-meta position-relative mb-25 int-x-52 inp-h-55">
                      <FormControl
                        isInvalid={
                          formik.touched.email && formik.errors.email
                        }
                      >
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          {...formik.getFieldProps("email")}
                        />
                        {
                          <FormErrorMessage>
                            {formik.errors.email}
                          </FormErrorMessage>
                        }
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-12">
                    <Button
                      type="submit"
                      className="btn-eleven fw-500 mb-25 tran3s d-block d-flex align-items-center justify-content-center"
                      isLoading={isRequestResetPasswordLoading}
                      spinner={<Spinner size="md" />}
                      fontWeight={500}
                    >
                      Send Reset Password Link
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