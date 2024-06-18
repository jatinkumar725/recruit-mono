import React, { useState } from "react";
import VerifiedSVG from "./../../../assets/svg/verified.svg";

import { NavLink } from "react-router-dom";

import {
  InputGroup,
  InputLeftElement,
  FormLabel,
  Input,
  Textarea,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

import ModelButton from "../../../components/Modal/Button";
import ModelWrapper from "../../../components/Modal/Wrapper";
import WhatItDO from "../../../components/Dashboard/WhatItDo";
import VerifyButton from "../../../components/Verify/Button";

import { Field } from "formik";
import * as Yup from "yup";

import { useSelector } from "react-redux";

import filterChangedFields from "../../../utils/filterChangedFields";
import { useSkGetMeQuery } from "../../../state/seeker/profile/api";
import {
  GENDER_TYPES,
  MARITAL_STATUS_TYPES,
  RELIGION_TYPES,
} from "../../../constants/siteConstants";
// import { useError } from "../../../components/Error/Para";
import JBSelect from "../../../utils/JBSelect";

const supportedGenderOptions = Object.entries(GENDER_TYPES).map(
  (entry) => ({
    value: entry[0],
    label: entry[1],
  })
);

const supportedReligionOptions = RELIGION_TYPES.map(
  (entry) => ({
    value: entry,
    label: entry,
  })
);

const supportedMaritalStatusOptions = MARITAL_STATUS_TYPES.map(
  (entry) => ({
    value: entry,
    label: entry,
  })
);

/**
 * Validation schema
 */

// Validation schema for personal details
const personalDetailsValidationSchema = {
  gender: Yup.string(),
  maritalStatus: Yup.string(),
  birthDate: Yup.string(),
  religion: Yup.string(),
};

/**
 * Fields criteria
 */
const personalDetailsFields = [
  {
    name: "birthDate",
    label: "Date of birth",
    type: "date",
    placeholder: "Enter Your Date of Birth",
    isRequired: false,
  }
];

const PersonalDetails = ({ handleSubmit, skUpdateProfileLoading, error }) => {
  // const [errorMessage, setError] = useError();

  // Handle modal toggle
  const [modalStateConfigs, setModalStateConfigs] = useState({
    personalDetails: false,
  });

  const handleModalToggle = (key) => {
    setModalStateConfigs({
      ...modalStateConfigs,
      [key]: !modalStateConfigs[key],
    });
  };

  const { loggedUserInfo } = useSelector((state) => state.skAuth);
  const { data: { data: myProfileData } = {}, refetch: refetchMe } =
    useSkGetMeQuery(2);

  // Initial value of personal details
  const personalDetailsInitialValues = {
    birthDate: myProfileData?.birthDate|| "",
    gender: myProfileData?.gender || "",
    religion: myProfileData?.religion || "",
    maritalStatus: myProfileData?.maritalStatus || "",
  };

  return (
    <div className="candidates-profile-details border-20 mt-40">
      <div className="inner-card lg-mb-50">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="title mb-0 candidates-profile-details-title-22">
            Personal Details
          </h4>
          <ModelButton
            className="dash-btn-two tran3s fs-5"
            text="Edit"
            onClickEvent={() => handleModalToggle("personalDetails")}
          />
          <ModelWrapper
            title="Personal Details"
            isOpen={modalStateConfigs.personalDetails}
            onClose={() => handleModalToggle("personalDetails")}
            initialValues={personalDetailsInitialValues}
            validationSchema={personalDetailsValidationSchema}
            onSubmit={(values) => {
              // Filter changed and not changed fields
              const changedFields = filterChangedFields(
                personalDetailsInitialValues,
                values
              );

              if (Object.keys(changedFields).length){
                handleSubmit("personalDetails", changedFields).then(() => handleModalToggle("personalDetails"));
              }
            }}
            isLoading={skUpdateProfileLoading}
            error={error}
          >
            <div
              className="dashboard-body bg-white m-0 p-0"
              style={{ minHeight: "auto" }}
            >
              {personalDetailsFields.map((field) => {
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
                    className={`dash-input-wrapper mb-25 ${
                      "mobile" !== fieldAttributes.name && "int-x-20"
                    }`}
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
                          ) : (
                            <InputGroup>
                              <InputLeftElement
                                height="100%"
                                pointerEvents="none"
                              >
                                +91
                              </InputLeftElement>
                              <FieldComponent
                                {...fieldAttributes}
                                value={form.values[fieldAttributes.name]}
                                id={fieldAttributes.name}
                                onChange={form.handleChange}
                                required={false}
                              />
                            </InputGroup>
                          )}
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
              <div className="mb-25">
                <Field name="gender">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.gender && form.touched.gender}
                    >
                      <FormLabel htmlFor="gender">
                        Gender
                      </FormLabel>
                      <JBSelect
                        options={supportedGenderOptions}
                        placeholder="Gender"
                        onChange={(selectedOption) => {
                          // Formik expects the selected value to be passed to the handleChange function
                          form.handleChange({
                            target: {
                              name: "gender",
                              value: selectedOption.value,
                            },
                          });
                        }}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            boxShadow:
                              form.errors.gender &&
                              form.touched.gender
                                ? "0 0 0 1px #E53E3E !important"
                                : "",
                          }),
                        }}
                        defaultValue={
                          form.values.gender && [
                            {
                              value: form.values.gender,
                              label: GENDER_TYPES[form.values.gender],
                            },
                          ]
                        }
                      />
                      <FormErrorMessage>
                        {form.errors.gender}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </div>
              <div className="mb-25">
                <Field name="religion">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.religion && form.touched.religion}
                    >
                      <FormLabel htmlFor="religion">
                        Religion
                      </FormLabel>
                      <JBSelect
                        options={supportedReligionOptions}
                        placeholder="Religion"
                        onChange={(selectedOption) => {
                          // Formik expects the selected value to be passed to the handleChange function
                          form.handleChange({
                            target: {
                              name: "religion",
                              value: selectedOption.value,
                            },
                          });
                        }}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            boxShadow:
                              form.errors.religion &&
                              form.touched.religion
                                ? "0 0 0 1px #E53E3E !important"
                                : "",
                          }),
                        }}
                        defaultValue={
                          form.values.religion && [
                            {
                              value: form.values.religion,
                              label: form.values.religion,
                            },
                          ]
                        }
                      />
                      <FormErrorMessage>
                        {form.errors.religion}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </div>
              <div className="mb-25">
                <Field name="maritalStatus">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.maritalStatus && form.touched.maritalStatus}
                    >
                      <FormLabel htmlFor="maritalStatus">
                        Marital Status
                      </FormLabel>
                      <JBSelect
                        options={supportedMaritalStatusOptions}
                        placeholder="MaritalStatus"
                        onChange={(selectedOption) => {
                          // Formik expects the selected value to be passed to the handleChange function
                          form.handleChange({
                            target: {
                              name: "maritalStatus",
                              value: selectedOption.value,
                            },
                          });
                        }}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            boxShadow:
                              form.errors.maritalStatus &&
                              form.touched.maritalStatus
                                ? "0 0 0 1px #E53E3E !important"
                                : "",
                          }),
                        }}
                        defaultValue={
                          form.values.maritalStatus && [
                            {
                              value: form.values.maritalStatus,
                              label: form.values.maritalStatus,
                            },
                          ]
                        }
                      />
                      <FormErrorMessage>
                        {form.errors.maritalStatus}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </div>
            </div>
          </ModelWrapper>
        </div>
        <div className="dash-input-wrapper mb-15">
          <label className="mb-0">Gender</label>
          {!myProfileData?.gender ? (
            <WhatItDO fieldName="gender" />
          ) : (
            <p>{GENDER_TYPES[myProfileData.gender]}</p>
          )}
        </div>
        <div className="dash-input-wrapper mb-15">
          <label className="mb-0">BirthDate</label>
          {!myProfileData?.birthDate ? (
            <WhatItDO fieldName="birthDate" />
          ) : (
            <p>{myProfileData.birthDate}</p>
          )}
        </div>
        <div className="dash-input-wrapper mb-15">
          <label className="mb-0">Religion</label>
          {!myProfileData?.religion ? (
            <WhatItDO fieldName="religion" />
          ) : (
            <p>{myProfileData.religion}</p>
          )}
        </div>
        <div className="dash-input-wrapper mb-15">
          <label className="mb-0">Marital Status</label>
          {!myProfileData?.maritalStatus ? (
            <WhatItDO fieldName="maritalStatus" />
          ) : (
            <p>{myProfileData.maritalStatus}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
