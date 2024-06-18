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
import { useSkChangeEmailAddressMutation } from "../../../state/seeker/profile/api";
import ChangePassword from "./ChangePassword";
import { setCredentials } from "../../../state/seeker/authentication/slice";

import { useError } from "../../../components/Error/Para";

const initialValues = {
  newEmail: "",
};

const emailValidationSchema = {
  newEmail: Yup.string().email("Email address must be a valid").required("Email address is required"),
};

const Index = () => {

  const [errorMessage, setError] = useError();

  const dispatch = useDispatch();

  const { loggedUserInfo } = useSelector((state) => state.skAuth);
  const [skChangeEmailAddress, { isLoading: isChangeEmailAddressLoading }] =
    useSkChangeEmailAddressMutation();

  // States
  const [modalStateConfig, setModalStateConfig] = useState(false);

  // Handle change email address
  const handleChangeEmailAddress = async (values) => {
    try {
      const response = await skChangeEmailAddress(values).unwrap();
      
      dispatch(setCredentials(response.data));

      setModalStateConfig(false);

    } catch (error) {

      setError(error.data.message);

      console.log("Error updating email address", error);
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
          <p className="mb-0">{loggedUserInfo?.email}</p>
          <ModelButton
            colorScheme="blue"
            variant="link"
            text="Change Email"
            onClickEvent={() => setModalStateConfig(true)}
          />
          <ModelWrapper
            title="Change Email Address"
            isOpen={modalStateConfig}
            onClose={() => setModalStateConfig(false)}
            initialValues={initialValues}
            validationSchema={emailValidationSchema}
            onSubmit={handleChangeEmailAddress}
            isLoading={isChangeEmailAddressLoading}
            error={errorMessage}
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
