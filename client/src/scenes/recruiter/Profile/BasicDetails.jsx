import React, { useState } from "react";
import VerifiedSVG from "./../../../assets/svg/verified.svg";

import { NavLink } from 'react-router-dom';

import {
  InputGroup,
  InputLeftElement,
  FormLabel,
  Input,
  Textarea,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

import ModelButton from "./../../../components/Modal/Button";
import ModelWrapper from "./../../../components/Modal/Wrapper";
import WhatItDO from "./../../../components/Dashboard/WhatItDo";
import VerifyButton from "../../../components/Verify/Button";

import { Field } from "formik";
import * as Yup from "yup";

import { useSelector } from "react-redux";

import filterChangedFields from "./../../../utils/filterChangedFields";
import { useRcRequestVerificationEmailMutation } from "../../../state/recruiter/authentication/api";
import { useRcGetMeQuery } from "./../../../state/recruiter/profile/api";
import VerifyWrapper from "../../../components/Verify/Wrapper";
import { USER_VERIFICATION } from "../../../constants/siteConstants";
import { useError } from "../../../components/Error/Para";
import { APP_ROUTES } from "../../../constants/routeConstant";

/**
 * Validation schema
 */

// Validation schema for basic details
const basicDetailsValidationSchema = {
  name: Yup.string()
    .required("Name is required")
    .trim()
    .max(32, "Name must be maximum of 32 characters")
    .matches(/^[a-zA-Z\s.']+$/, "Name can only contain letters, spaces, and '.'"),
  mobile: Yup.string()
    .required("Mobile number is required")
    .matches(/^\d{10}$/, "Please enter your 10 digit mobile number"),
  bio: Yup.string().max(250, "Bio must be at most 250 characters long"),
  overview: Yup.string().max(1000, "Bio must be at most 250 characters long"),
};

/**
 * Fields criteria
 */
const basicDetailsFields = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Enter Your Name",
    maxLength: 35,
    isRequired: true,
  },
  {
    name: "mobile",
    label: "Mobile Number",
    type: "tel",
    placeholder: "Enter Your Mobile Number",
    maxLength: 10,
    isRequired: true,
  }
];

const BasicDetails = ({ handleSubmit, rcUpdateProfileLoading, error }) => {

  const [errorMessage, setError] = useError();

  // Handle modal toggle
  const [modalStateConfigs, setModalStateConfigs] = useState({
    basicDetails: false,
    verifyEmail: false,
  });

  const handleModalToggle = (key) => {
    setModalStateConfigs({
      ...modalStateConfigs,
      [key]: !modalStateConfigs[key],
    });
  };

  const { loggedUserInfo } = useSelector((state) => state.rcAuth);
  const { data: { data: myProfileData } = {}, refetch: refetchMe } =
    useRcGetMeQuery(2);

  // Initial value of basic details
  const basicDetailsInitialValues = {
    name: loggedUserInfo?.name || "",
    mobile: loggedUserInfo?.mobile || "",
  };

  // Mutation
  const [
    rcRequestVerifyEmail,
    { isLoading: rcRequestVerificationEmailLoading },
  ] = useRcRequestVerificationEmailMutation();

  const [sendedVerifyEmail, setSendedVerifyEmail] = useState(false);
  // Request Verification email
  const requestVerificationEmail = async () => {
    try {
      // Request verification email
      const response = await rcRequestVerifyEmail().unwrap();

      // Send verification email
      setSendedVerifyEmail(true);
    } catch (error) {

      setError(error.data.message);

      console.error("Error requesting verify email:", error);
    }
  };

  return (
    <div className="candidates-profile-details border-20 mt-40">
      <div className="inner-card lg-mb-50">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="title mb-0 candidates-profile-details-title-22">
            Basic Details
          </h4>
          <ModelButton
            className="dash-btn-two tran3s fs-5"
            text="Edit"
            onClickEvent={() => handleModalToggle("basicDetails")}
          />
          <ModelWrapper
            title="Basic Details"
            isOpen={modalStateConfigs.basicDetails}
            onClose={() => handleModalToggle("basicDetails")}
            initialValues={basicDetailsInitialValues}
            validationSchema={basicDetailsValidationSchema}
            onSubmit={(values) => {
              // Filter changed and not changed fields
              const changedFields = filterChangedFields(
                basicDetailsInitialValues,
                values
              );

              handleSubmit("basicDetails", changedFields);
              
              handleModalToggle("basicDetails");
            }}
            isLoading={rcUpdateProfileLoading}
            error={error}
          >
            <div
              className="dashboard-body bg-white m-0 p-0"
              style={{ minHeight: "auto" }}
            >
              {basicDetailsFields.map((field) => {
                const {
                  input: inputType,
                  isRequired,
                  ...fieldAttributes
                } = field;
                const FieldComponent =
                  inputType === "textarea" ? Textarea : Input;
                return (
                  <div
                    key={fieldAttributes.name}
                    className={`dash-input-wrapper mb-25 ${"mobile" !== fieldAttributes.name && 'int-x-20' }`}
                  >
                    <Field name={fieldAttributes.name}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.touched[fieldAttributes.name] &&
                            form.errors[fieldAttributes.name]
                          }
                          isRequired={isRequired}
                        >
                          <FormLabel htmlFor={fieldAttributes.name}>
                            {fieldAttributes.label}
                          </FormLabel>
                          {"mobile" !== fieldAttributes.name ? (
                            <FieldComponent
                              {...fieldAttributes}
                              value={form.values[fieldAttributes.name]}
                              id={fieldAttributes.name}
                              onChange={form.handleChange}
                              required={false}
                            />
                          ) : (<InputGroup>
                            <InputLeftElement height="100%" pointerEvents='none'>
                              +91
                            </InputLeftElement>
                            <FieldComponent
                              {...fieldAttributes}
                              value={form.values[fieldAttributes.name]}
                              id={fieldAttributes.name}
                              onChange={form.handleChange}
                              required={false}
                            />
                          </InputGroup>)}
                          <FormErrorMessage>
                            {form.touched[fieldAttributes.name] &&
                              form.errors[fieldAttributes.name]}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </div>
                );
              })}
              <div className="dash-input-wrapper">
                <FormControl isRequired>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <div className="d-flex align-items-center gap-2">
                    <span className="text-secondary">{loggedUserInfo?.email}</span> 
                    <NavLink to={APP_ROUTES.RecruiterAccount} target="_blank" className="text-primary link-underline-opacity-10">
                      Change Email
                    </NavLink>
                  </div>
                </FormControl>
              </div>
            </div>
          </ModelWrapper>
        </div>
        <div className="dash-input-wrapper mb-15">
          <label className="mb-0">Full Name</label>
          <p className="mb-0">{loggedUserInfo?.name}</p>
        </div>
        <div className="dash-input-wrapper mb-15">
          <div className="d-flex justify-content-between align-items-center">
            <label className="mb-0 d-inline-flex align-items-center gap-2">
              <span>Email Address</span>
              {loggedUserInfo?.email &&
                loggedUserInfo.isPrimaryEmailVerified &&
                USER_VERIFICATION.RECRUITER.email && (
                  <img src={VerifiedSVG} alt="verified icon" />
                )}
            </label>
            {loggedUserInfo?.email &&
              !loggedUserInfo.isPrimaryEmailVerified &&
              USER_VERIFICATION.RECRUITER.email && (
                <VerifyButton
                  text="Verify"
                  onClickEvent={() => handleModalToggle("verifyEmail")}
                />
              )}
          </div>
          <p>{loggedUserInfo?.email}</p>
        </div>
        <div className="dash-input-wrapper mb-15">
          <div className="d-flex justify-content-between align-items-center">
            <label className="mb-0 d-inline-flex align-items-center gap-2">
              <span>Mobile Number</span>
              {loggedUserInfo?.mobile &&
                loggedUserInfo.isPrimaryMobileVerified &&
                USER_VERIFICATION.RECRUITER.mobile && (
                  <img src={VerifiedSVG} alt="verified icon" />
                )}
            </label>
            {loggedUserInfo?.mobile &&
              !loggedUserInfo.isPrimaryMobileVerified &&
              USER_VERIFICATION.RECRUITER.mobile && <VerifyButton text="Verify" />}
          </div>
          {!loggedUserInfo?.mobile ? (
            <WhatItDO fieldName="mobile" />
          ) : (
            <p>{loggedUserInfo.mobile}</p>
          )}
        </div>
      </div>
      <VerifyWrapper
        email={loggedUserInfo?.email}
        isOpen={modalStateConfigs.verifyEmail}
        onClose={() => {
          // Close model
          handleModalToggle("verifyEmail");

          // Reset sended verify email
          setSendedVerifyEmail(false);
        }}
        onClickEvent={requestVerificationEmail}
        isLoading={rcRequestVerificationEmailLoading}
        isSendedMail={sendedVerifyEmail}
        error={errorMessage}
      />
    </div>
  );
};

export default BasicDetails;
