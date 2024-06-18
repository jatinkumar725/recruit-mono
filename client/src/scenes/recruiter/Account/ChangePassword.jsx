import React, { useState } from "react";

import { Field } from "formik";
import * as Yup from "yup";

import {
  Input,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

import ModelButton from "./../../../components/Modal/Button";
import ModelWrapper from "./../../../components/Modal/Wrapper";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { useRcChangePasswordMutation } from "../../../state/recruiter/profile/api";
import { setUpdateTimeStamp } from "../../../state/recruiter/authentication/slice";

import { useError } from "../../../components/Error/Para";

const initialValues = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const changePasswordValidationSchema = {
  oldPassword: Yup.string().required("Old password is required").trim(),
  newPassword: Yup.string()
    .required("New password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/ , 'Password must contain alphanumeric characters (a-z and 0-9)')
    .trim(),
  confirmNewPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
};

const ChangePassword = () => {

  const [errorMessage, setError] = useError();
  
  const dispatch = useDispatch();

  const [modalStateConfig, setModalStateConfig] = useState(false);

  // Mutations
  const [rcChangePassword, { isLoading: isChangePasswordLoading }] =
    useRcChangePasswordMutation();

  const handleChangePassword = async (values) => {
    try {

      const { confirmNewPassword, ...restValues } = values;
      
      const response = await rcChangePassword(restValues).unwrap();

      dispatch(setUpdateTimeStamp());

      setModalStateConfig(false);

    } catch (error) {

      setError(error.data.message);

      console.log("error", error);
    }
  };

  return (
    <div className="candidates-profile-details border-20 mt-40">
      <div className="inner-card lg-mb-50">
        <h4 className="title mb-3 candidates-profile-details-title-22">
          Change Password
        </h4>
        <p className="mb-0">
          Your password should be at least 6 characters long and contain
          alphanumeric characters (a-z and 0-9)
        </p>
        <ModelButton
          colorScheme="blue"
          variant="link"
          text="Change Password"
          onClickEvent={() => setModalStateConfig(true)}
        />
        <ModelWrapper
          title="Change Password"
          isOpen={modalStateConfig}
          onClose={() => setModalStateConfig(false)}
          initialValues={initialValues}
          validationSchema={changePasswordValidationSchema}
          onSubmit={handleChangePassword}
          isLoading={isChangePasswordLoading}
          error={errorMessage}
        >
          <div
            className="dashboard-body bg-white m-0 p-0"
            style={{ minHeight: "auto" }}
          >
            <div className="dash-input-wrapper mb-25 int-x-20">
              <Field name="oldPassword">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.touched.oldPassword && form.errors.oldPassword
                    }
                    isRequired
                  >
                    <FormLabel htmlFor="oldPassword">Old Password</FormLabel>
                    <Input
                      id="oldPassword"
                      type="password"
                      placeholder="Enter new password"
                      value={form.values.oldPassword}
                      onChange={form.handleChange}
                      required={false}
                    />
                    <FormErrorMessage>
                      {form.touched.oldPassword && form.errors.oldPassword}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </div>
            <div className="dash-input-wrapper mb-25 int-x-20">
              <Field name="newPassword">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.touched.newPassword && form.errors.newPassword
                    }
                    isRequired
                  >
                    <FormLabel htmlFor="newPassword">New Password</FormLabel>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter new password"
                      value={form.values.newPassword}
                      onChange={form.handleChange}
                      required={false}
                    />
                    <FormErrorMessage>
                      {form.touched.newPassword && form.errors.newPassword}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </div>
            <div className="dash-input-wrapper">
              <Field name="confirmNewPassword">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.touched.confirmNewPassword &&
                      form.errors.confirmNewPassword
                    }
                    isRequired
                  >
                    <FormLabel htmlFor="confirmNewPassword">
                      Confirm Password
                    </FormLabel>
                    <Input
                      id="confirmNewPassword"
                      type="password"
                      placeholder="Re-enter new password"
                      value={form.values.confirmNewPassword}
                      onChange={form.handleChange}
                      required={false}
                    />
                    <FormErrorMessage>
                      {form.touched.confirmNewPassword && form.errors.confirmNewPassword}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </div>
          </div>
        </ModelWrapper>
      </div>
    </div>
  );
};

export default ChangePassword;
