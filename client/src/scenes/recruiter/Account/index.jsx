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
import { useRcRequestChangeEmailAddressMutation } from "../../../state/recruiter/profile/api";
import ChangePassword from "./ChangePassword";

import { useError } from "../../../components/Error/Para";

const initialValues = {
  newEmail: "",
};

const emailValidationSchema = {
  newEmail: Yup.string().email("Email address must be a valid").required("Email address is required"),
};

const Index = () => {

  const [errorMessage, setError] = useError();

  const [rcRequestChangeEmailAddress, { isLoading: isChangeEmailAddressLoading }] =
    useRcRequestChangeEmailAddressMutation();

  // States
  const [modalStateConfig, setModalStateConfig] = useState(false);

  // Handle change email address
  const handleRequestChangeEmailAddress = async (values) => {
    try {
      const response = await rcRequestChangeEmailAddress(values).unwrap();
      
      setModalStateConfig(false);

    } catch (error) {

      setError(error.data.message);

      console.log("Error requesting email address", error);
    }
  };

  return (
    <>
      <h2 className="main-title mb-0 candidates-profile-details-title-22">
        Account Settings
      </h2>

      <div className="candidates-profile-details border-20 mt-40">
        <div className="inner-card lg-mb-50">
          <h4 className="title mb-3 candidates-profile-details-title-22">
            Email Address
          </h4>
          <p className="mb-0">
            To update your registered email address, please submit a request with your current and desired new email details to our support team for verification and processing.
            <ModelButton
              variant="link"
              colorScheme="blue"
              fontWeight={400}
              text="Request change email"
              // onClickEvent={() => setModalStateConfig(true)}
            />
          </p>
          <ModelWrapper
            title="Change Email Address"
            isOpen={modalStateConfig}
            onClose={() => setModalStateConfig(false)}
            initialValues={initialValues}
            validationSchema={emailValidationSchema}
            onSubmit={handleRequestChangeEmailAddress}
            isLoading={isChangeEmailAddressLoading}
            error={errorMessage}
            saveText="Send"
          >
            <div
              className="dashboard-body bg-white m-0 p-0"
              style={{ minHeight: "auto" }}
            >
              <div className="dash-input-wrapper">
                <Field name="newEmail">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.touched.newEmail && form.errors.newEmail}
                      isRequired
                    >
                      <FormLabel htmlFor="newEmail">Email</FormLabel>
                      <Input
                        id="newEmail"
                        type="newEmail"
                        placeholder="Enter email address"
                        value={form.values.newEmail}
                        onChange={form.handleChange}
                        required={false}
                      />
                      <FormErrorMessage>
                        {form.touched.newEmail && form.errors.newEmail}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </div>
              <p>We will send you a verification email on this email address</p>
            </div>
          </ModelWrapper>
        </div>
      </div>

      <ChangePassword />
    </>
  );
};

export default Index;
