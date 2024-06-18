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

import ModelButton from "./../../../components/Modal/Button";
import ModelWrapper from "./../../../components/Modal/Wrapper";
import WhatItDO from "./../../../components/Dashboard/WhatItDo";
import VerifyButton from "../../../components/Verify/Button";

import { Field } from "formik";
import * as Yup from "yup";

import { useSelector } from "react-redux";

import filterChangedFields from "./../../../utils/filterChangedFields";
import { useSkRequestVerificationEmailMutation } from "../../../state/seeker/authentication/api";
import { useSkGetMeQuery } from "./../../../state/seeker/profile/api";
import VerifyWrapper from "../../../components/Verify/Wrapper";
import {
  NOTICE_PERIOD_TYPES,
  SUPPORTED_EXPERIENCE_MONTHS,
  SUPPORTED_EXPERIENCE_YEARS,
  USER_VERIFICATION,
} from "../../../constants/siteConstants";
import { useError } from "../../../components/Error/Para";
import { APP_ROUTES } from "../../../constants/routeConstant";
import JBSelect from "../../../utils/JBSelect";
import { formatNumber, formatUnit } from "../../../utils/format";

// May be used in another life 🥴
const supportedExperienceYearsOptions = SUPPORTED_EXPERIENCE_YEARS.map(
  (year) => {
    if (year < 2) {
      return {
        value: year,
        label: `${year} Year`,
      };
    } else if (year === 31) {
      return {
        value: year,
        label: "30+ Years",
      };
    }
    return {
      value: year,
      label: `${year} Years`,
    };
  }
);

const supportedExperienceMonthsOptions = SUPPORTED_EXPERIENCE_MONTHS.map(
  (month) => {
    if (month < 2) {
      return {
        value: month,
        label: `${month} Month`,
      };
    }
    return {
      value: month,
      label: `${month} Months`,
    };
  }
);

const supportedNoticePeriodOptions = Object.entries(NOTICE_PERIOD_TYPES).map(
  (entry) => ({
    value: entry[1],
    label: entry[1],
  })
);

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
  currentSalary: Yup.string()
    .required("Please specify your Current Salary.")
    .max(11),
  noticePeriod: Yup.string().required("Please specify your notice period"),
  year: Yup.string().required("Please select Experience."),
  month: Yup.string().required("Please select Experience."),
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
  },
  {
    name: "headline",
    label: "Bio",
    placeholder: "Brief description for your profile. URLs are hyperlinked.",
    input: "textarea",
    maxLength: 250,
    isRequired: false,
  },
  {
    name: "overview",
    label: "Overview",
    placeholder: "Brief description for your resume. URLs are hyperlinked.",
    input: "textarea",
    maxLength: 1000,
    isRequired: false,
  },
];

const BasicDetails = ({ handleSubmit, skUpdateProfileLoading, error }) => {
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

  const { loggedUserInfo } = useSelector((state) => state.skAuth);
  const { data: { data: myProfileData } = {}, refetch: refetchMe } =
    useSkGetMeQuery(2);

  // Initial value of basic details
  const basicDetailsInitialValues = {
    name: loggedUserInfo?.name || "",
    mobile: loggedUserInfo?.mobile || "",
    headline: myProfileData?.headline || "",
    overview: myProfileData?.overview || "",
    currentSalary: myProfileData?.currentSalary || "",
    noticePeriod: myProfileData?.noticePeriod || "",
    year: myProfileData?.experience?.year || "",
    month: myProfileData?.experience?.month || "",
  };

  // Mutation
  const [
    skRequestVerifyEmail,
    { isLoading: skRequestVerificationEmailLoading },
  ] = useSkRequestVerificationEmailMutation();

  const [sendedVerifyEmail, setSendedVerifyEmail] = useState(false);
  // Request Verification email
  const requestVerificationEmail = async () => {
    try {
      // Request verification email
      const response = await skRequestVerifyEmail().unwrap();

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

              let { year, month } = changedFields;

              // Re-build experience
              const experience = {};

              if (year) {
                experience.year = year.toString();

                // Delete year
                delete changedFields.year;
              }

              if (month) {
                experience.month = month.toString();

                // Delete month
                delete changedFields.month;
              }

              if (Object.entries(experience).length) {
                changedFields.experience = experience;
              }

              if (Object.entries(changedFields).length) {
                handleSubmit("basicDetails", changedFields).then(() => handleModalToggle("basicDetails"));
              }

            }}
            isLoading={skUpdateProfileLoading}
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
              <div className="dash-input-wrapper mb-25">
                {/* Rest of the code */}
                <Field name="currentSalary">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.touched.currentSalary && form.errors.currentSalary
                      }
                      isRequired={true}
                    >
                      <FormLabel htmlFor="currentSalary">
                        Current salary
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement height="100%" pointerEvents="none">
                          INR
                        </InputLeftElement>
                        <Input
                          {...field}
                          required={false}
                          id="currentSalary"
                          placeholder="Eg. 4,50,0000"
                          maxLength={11}
                          onChange={(e) => {
                            const formattedValue = formatNumber(e.target.value);
                            form.setFieldValue("currentSalary", formattedValue);
                          }}
                          onBlur={(e) => {
                            const formattedValue = formatNumber(e.target.value);
                            form.setFieldValue("currentSalary", formattedValue);
                          }}
                        />
                      </InputGroup>
                      <FormErrorMessage>
                        {form.touched.currentSalary &&
                          form.errors.currentSalary}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </div>
              <div className="mb-25">
                <FormControl isRequired>
                  <FormLabel htmlFor="year">Total Experience</FormLabel>
                  <div className="row">
                    <div className="col-sm-6">
                      <Field name="year">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              (form.errors.year && form.touched.year) ||
                              (form.errors.month && form.touched.month)
                            }
                          >
                            <JBSelect
                              options={supportedExperienceYearsOptions}
                              placeholder="Years"
                              onChange={(selectedOption) => {
                                // Formik expects the selected value to be passed to the handleChange function
                                form.handleChange({
                                  target: {
                                    name: "year",
                                    value: selectedOption.value,
                                  },
                                });
                              }}
                              styles={{
                                control: (baseStyles, state) => ({
                                  ...baseStyles,
                                  boxShadow:
                                    form.errors.year && form.touched.year
                                      ? "0 0 0 1px #E53E3E !important"
                                      : "",
                                }),
                              }}
                              defaultValue={
                                form.values.year && [
                                  {
                                    value: form.values.year,
                                    label: form.values.year,
                                  },
                                ]
                              }
                            />
                            <FormErrorMessage>
                              {(form.errors.month || form.errors.year) &&
                                "Please select Experience."}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </div>
                    <div className="col-sm-6">
                      <Field name="month">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.month && form.touched.month}
                          >
                            <JBSelect
                              options={
                                form.values.year > 0
                                  ? supportedExperienceMonthsOptions
                                  : supportedExperienceMonthsOptions.filter(
                                      (month) => 0 !== month.value
                                    )
                              }
                              placeholder="Months"
                              onChange={(selectedOption) => {
                                // Formik expects the selected value to be passed to the handleChange function
                                form.handleChange({
                                  target: {
                                    name: "month",
                                    value: selectedOption.value,
                                  },
                                });
                              }}
                              defaultValue={
                                form.values.month && [
                                  {
                                    value: form.values.month,
                                    label: form.values.month,
                                  },
                                ]
                              }
                              styles={{
                                control: (baseStyles, state) => ({
                                  ...baseStyles,
                                  boxShadow:
                                    form.errors.month && form.touched.month
                                      ? "0 0 0 1px #E53E3E !important"
                                      : "",
                                }),
                              }}
                            />
                          </FormControl>
                        )}
                      </Field>
                    </div>
                  </div>
                </FormControl>
              </div>
              <div className="mb-25">
                <Field name="noticePeriod">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.noticePeriod && form.touched.noticePeriod
                      }
                      isRequired
                    >
                      <FormLabel htmlFor="noticePeriod">
                        Notice Period
                      </FormLabel>
                      <JBSelect
                        options={supportedNoticePeriodOptions}
                        placeholder="Notice Period"
                        onChange={(selectedOption) => {
                          // Formik expects the selected value to be passed to the handleChange function
                          form.handleChange({
                            target: {
                              name: "noticePeriod",
                              value: selectedOption.value,
                            },
                          });
                        }}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            boxShadow:
                              form.errors.noticePeriod &&
                              form.touched.noticePeriod
                                ? "0 0 0 1px #E53E3E !important"
                                : "",
                          }),
                        }}
                        defaultValue={
                          form.values.noticePeriod && [
                            {
                              value: form.values.noticePeriod,
                              label: form.values.noticePeriod,
                            },
                          ]
                        }
                      />
                      <FormErrorMessage>
                        {form.errors.noticePeriod}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </div>
              <div className="dash-input-wrapper">
                <FormControl isRequired>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <div className="d-flex align-items-center gap-2">
                    <span className="text-secondary">
                      {loggedUserInfo?.email}
                    </span>
                    <NavLink
                      to={APP_ROUTES.SeekerAccountSettings}
                      target="_blank"
                      className="text-primary link-underline-opacity-10"
                    >
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
                USER_VERIFICATION.SEEKER.email && (
                  <img src={VerifiedSVG} alt="verified icon" />
                )}
            </label>
            {loggedUserInfo?.email &&
              !loggedUserInfo.isPrimaryEmailVerified &&
              USER_VERIFICATION.SEEKER.email && (
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
                USER_VERIFICATION.SEEKER.mobile && (
                  <img src={VerifiedSVG} alt="verified icon" />
                )}
            </label>
            {loggedUserInfo?.mobile &&
              !loggedUserInfo.isPrimaryMobileVerified &&
              USER_VERIFICATION.SEEKER.mobile && <VerifyButton text="Verify" />}
          </div>
          {!loggedUserInfo?.mobile ? (
            <WhatItDO fieldName="mobile" />
          ) : (
            <p>{loggedUserInfo.mobile}</p>
          )}
        </div>
        <div className="dash-input-wrapper mb-15">
          <label className="mb-0">
            <span>Total Experience</span>
          </label>
          {!myProfileData?.experience ? (
            <WhatItDO fieldName="experience" />
          ) : (
            <p>
              {myProfileData.experience.year > 0 &&
                formatUnit(myProfileData.experience.year, "Year")}{" "}
              {myProfileData.experience.month > 0 &&
                formatUnit(myProfileData.experience.month, "Month")}
            </p>
          )}
        </div>
        <div className="dash-input-wrapper mb-15">
          <label className="mb-0">
            <span>Current Salary</span>
          </label>
          {!myProfileData?.currentSalary ? (
            <WhatItDO fieldName="currentSalary" />
          ) : (
            <p>{myProfileData.currentSalary}</p>
          )}
        </div>
        <div className="dash-input-wrapper mb-15">
          <label className="mb-0">
            <span>Notice Period</span>
          </label>
          {!myProfileData?.noticePeriod ? (
            <WhatItDO fieldName="noticePeriod" />
          ) : (
            <p>{myProfileData.noticePeriod}</p>
          )}
        </div>
        <div className="dash-input-wrapper mb-15">
          <label className="mb-0">Bio</label>
          {!myProfileData?.headline ? (
            <WhatItDO fieldName="bio" />
          ) : (
            <p>{myProfileData.headline}</p>
          )}
        </div>
        <div className="dash-input-wrapper">
          <label className="mb-0">Overview</label>
          {!myProfileData?.overview ? (
            <WhatItDO fieldName="overview" />
          ) : (
            <p>{myProfileData.overview}</p>
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
        isLoading={skRequestVerificationEmailLoading}
        isSendedMail={sendedVerifyEmail}
        error={errorMessage}
      />
    </div>
  );
};

export default BasicDetails;
