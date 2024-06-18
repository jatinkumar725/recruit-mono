import React, { useEffect, useState } from "react";

import {
  InputGroup,
  InputLeftElement,
  FormLabel,
  Input,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

import ModelButton from "./../../../components/Modal/Button";
import ModelWrapper from "./../../../components/Modal/Wrapper";
import WhatItDO from "./../../../components/Dashboard/WhatItDo";

import { Field } from "formik";
import * as Yup from "yup";

// import { useSelector } from "react-redux";

import filterChangedFields from "./../../../utils/filterChangedFields";
import { useSkGetMeQuery } from "./../../../state/seeker/profile/api";
import { EMPLOYMENT_TYPES, JOB_TYPES } from "../../../constants/siteConstants";
// import { useError } from "../../../components/Error/Para";
// import { APP_ROUTES } from "../../../constants/routeConstant";
import AsyncSelectWithFetch from "./../../../utils/AsyncJBSelect";
import JBSelect from "../../../utils/JBSelect";
import { formatNumber } from "../../../utils/format";
import { pluckList } from "../../../utils/objects";
import AsyncWithOuter from "../../../components/Select/Async/WithOuter";

const jobTypeOptions = Object.entries(JOB_TYPES).map((jobType) => {
  return {
    value: jobType[1],
    label: jobType[0],
  };
});

const employmentTypeOptions = Object.entries(EMPLOYMENT_TYPES).map((employmentType) => {
  return {
    value: employmentType[1],
    label: employmentType[0],
  };
});

/**
 * Validation schema
 */

// Validation schema for basic details
const careerDetailsValidationSchema = {
  industry: Yup.string()
    .required("Please specify your current industry")
    .max(35),
  designation: Yup.string().required("Please specify your designation"),
  prefJobType: Yup.array(Yup.string()).optional(),
  prefEmploymentType: Yup.array(Yup.string()).optional(),
  prefLocation: Yup.array()
    .of(
      Yup.object({
        city: Yup.string().required(
          "Please specify your preferred job location"
        ),
      })
    )
    .max(10, "Please specify at most ten locations").optional(),
  expectedCtc: Yup.string().required(),
};

const CareerDetails = ({ handleSubmit, skUpdateProfileLoading, error }) => {
  // const [errorMessage, setError] = useError();

  // Handle modal toggle
  const [careerProfileModalStateConfigs, setCareerProfileModalStateConfigs] =
    useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [prefEmploymentTypes, setPrefEmploymentTypes] = useState([]);
  const [prefJobTypes, setPrefJobTypes] = useState([]);
  const [careerDetailsInitialValues, setCareerDetailsInitialValues] = useState({
    industry: "",
    designation: "",
    prefJobType: [],
    prefEmploymentType: [],
    prefLocation: [],
    expectedCtc: "",
  });

  const handleModalToggle = () => {
    setCareerProfileModalStateConfigs(!careerProfileModalStateConfigs);
  };

  // const { loggedUserInfo } = useSelector((state) => state.skAuth);
  const { data: { data: myProfileData } = {}, refetch: refetchMe } =
    useSkGetMeQuery(2);

  useEffect(() => {
    if (myProfileData) {
      const { prefJobType, prefEmploymentType, ...rest } = myProfileData;

      if (prefJobType.length) {
        setPrefJobTypes(prefJobType);
      }

      if (prefEmploymentType?.length) {
        setPrefEmploymentTypes(prefEmploymentType);
      }

      setCareerDetailsInitialValues({
        industry: myProfileData?.industry || "",
        designation: myProfileData?.designation || "",
        prefJobType: myProfileData?.prefJobType || [],
        prefEmploymentType: myProfileData?.prefEmploymentType || [],
        prefLocation: myProfileData?.prefLocation || [],
        expectedCtc: myProfileData?.expectedCtc || "",
      });
    }
  }, [myProfileData]);

  return (
    <div className="candidates-profile-details border-20 mt-40">
      <div className="inner-card lg-mb-50">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="title mb-0 candidates-profile-details-title-22">
            Career Profile
          </h4>
          <ModelButton
            className="dash-btn-two tran3s fs-5"
            text="Edit"
            onClickEvent={handleModalToggle}
          />
          <ModelWrapper
            title="Career Profile"
            isOpen={careerProfileModalStateConfigs}
            onClose={handleModalToggle}
            initialValues={careerDetailsInitialValues}
            validationSchema={careerDetailsValidationSchema}
            onSubmit={async (values) => {
              await handleSubmit("careerDetails", values).then(() => {
                setIsSubmitted(true);
                handleModalToggle("careerDetails");
              });
            }}
            isLoading={skUpdateProfileLoading}
            error={error}
          >
            <div
              className="dashboard-body bg-white m-0 p-0"
              style={{ minHeight: "auto" }}
            >
              <div className="mb-25">
                <Field name="industry">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.industry && form.touched.industry}
                      isRequired
                    >
                      <FormLabel htmlFor="industry">Industry</FormLabel>
                      <AsyncSelectWithFetch
                        placeholder="Enter job industry"
                        taxonomy="industry"
                        openMenuOnClick={false}
                        selectedInput={form.values.industry}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            boxShadow:
                              form.errors.industry && form.touched.industry
                                ? "0 0 0 1px #E53E3E !important"
                                : "",
                          }),
                        }}
                        onChange={(selectedOption) => {
                          // Formik expects the selected value to be passed to the handleChange function
                          form.handleChange({
                            target: {
                              name: "industry",
                              value: selectedOption.label,
                            },
                          });
                        }}
                      />
                      <FormErrorMessage>
                        {form.errors.industry}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </div>
              <div className="mb-25">
                <Field name="designation">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.designation && form.touched.designation
                      }
                      isRequired
                    >
                      <FormLabel htmlFor="designation">Designation</FormLabel>
                      <AsyncSelectWithFetch
                        placeholder="Enter job role"
                        taxonomy="designation"
                        openMenuOnClick={false}
                        selectedInput={form.values.designation}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            boxShadow:
                              form.errors.designation &&
                              form.touched.designation
                                ? "0 0 0 1px #E53E3E !important"
                                : "",
                          }),
                        }}
                        onChange={(selectedOption) => {
                          // Formik expects the selected value to be passed to the handleChange function
                          form.handleChange({
                            target: {
                              name: "designation",
                              value: selectedOption.label,
                            },
                          });
                        }}
                      />
                      <FormErrorMessage>
                        {form.errors.designation}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </div>
              <div className="mb-25">
                <Field name="prefEmploymentType">
                  {({ field, form }) => (
                    <>
                      <FormControl>
                        <FormLabel>Preferred Employment Type</FormLabel>
                        <JBSelect
                          controlShouldRenderValue={false}
                          placeholder="Select employment type"
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              boxShadow:
                                form.errors.prefEmploymentType &&
                                form.touched.prefEmploymentType
                                  ? "0 0 0 1px #E53E3E !important"
                                  : "",
                            }),
                          }}
                          onChange={(selectedOption) => {
                            if (!prefEmploymentTypes.includes(selectedOption)) {
                              setPrefEmploymentTypes([
                                ...prefEmploymentTypes,
                                selectedOption.label,
                              ]);

                              // Formik expects the selected value to be passed to the handleChange function
                              form.handleChange({
                                target: {
                                  name: "prefEmploymentType",
                                  value: [
                                    ...prefEmploymentTypes,
                                    selectedOption.label,
                                  ],
                                },
                              });
                            }
                          }}
                          options={employmentTypeOptions.filter(
                            (option) => !prefEmploymentTypes.includes(option.label)
                          )}
                        />
                        <FormErrorMessage>
                          {form.errors.prefEmploymentType}
                        </FormErrorMessage>
                      </FormControl>
                      {prefEmploymentTypes.length > 0 && (
                        <div className="dash-input-wrapper">
                          <div className="skills-wrapper px-0">
                            <ul className="style-none d-flex flex-wrap align-items-center">
                              {prefEmploymentTypes.map((controlItem) => (
                                <li className="is_tag" key={controlItem}>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const filteredControlItem =
                                        prefEmploymentTypes.filter(
                                          (s) => s !== controlItem
                                        );

                                      setPrefEmploymentTypes(filteredControlItem);

                                      form.handleChange({
                                        target: {
                                          name: "prefEmploymentType",
                                          value: filteredControlItem,
                                        },
                                      });
                                    }}
                                  >
                                    {controlItem} <i className="bi bi-x"></i>
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </Field>
              </div>
              <div className="mb-25">
                <Field name="prefJobType">
                  {({ field, form }) => (
                    <>
                      <FormControl>
                        <FormLabel>Preferred Job Type</FormLabel>
                        <JBSelect
                          controlShouldRenderValue={false}
                          placeholder="Select job type"
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              boxShadow:
                                form.errors.prefJobType &&
                                form.touched.prefJobType
                                  ? "0 0 0 1px #E53E3E !important"
                                  : "",
                            }),
                          }}
                          onChange={(selectedOption) => {
                            if (!prefJobTypes.includes(selectedOption)) {
                              setPrefJobTypes([
                                ...prefJobTypes,
                                selectedOption.label,
                              ]);

                              // Formik expects the selected value to be passed to the handleChange function
                              form.handleChange({
                                target: {
                                  name: "prefJobType",
                                  value: [
                                    ...prefJobTypes,
                                    selectedOption.label,
                                  ],
                                },
                              });
                            }
                          }}
                          options={jobTypeOptions.filter(
                            (option) => !prefJobTypes.includes(option.label)
                          )}
                        />
                        <FormErrorMessage>
                          {form.errors.prefJobType}
                        </FormErrorMessage>
                      </FormControl>
                      {prefJobTypes.length > 0 && (
                        <div className="dash-input-wrapper">
                          <div className="skills-wrapper px-0">
                            <ul className="style-none d-flex flex-wrap align-items-center">
                              {prefJobTypes.map((controlItem) => (
                                <li className="is_tag" key={controlItem}>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const filteredControlItem =
                                        prefJobTypes.filter(
                                          (s) => s !== controlItem
                                        );

                                      setPrefJobTypes(filteredControlItem);

                                      form.handleChange({
                                        target: {
                                          name: "prefJobType",
                                          value: filteredControlItem,
                                        },
                                      });
                                    }}
                                  >
                                    {controlItem} <i className="bi bi-x"></i>
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </Field>
              </div>
              <div className="mb-25">
                <Field name="prefLocation">
                  {({ field, form }) => (
                    <AsyncWithOuter
                      isCreatable={false}
                      noOptionsMessage={() => "No results found"}
                      openMenuOnClick={false}
                      controlShouldRenderValue={false}
                      controlLabel="Preferred Locations"
                      placeholder="Enter work location"
                      controlName="prefLocation"
                      controlId="locationId"
                      controlSearchKey="city"
                      entity="city"
                      taxonomy="city"
                      selectFrom="label"
                      controlValue={form.values.prefLocation}
                      controlTouched={form.touched.prefLocation}
                      controlErrors={form.errors.prefLocation}
                      handleChange={form.handleChange}
                      triggerAction={!error && isSubmitted}
                      setIsSubmitted={setIsSubmitted}
                      handleModalToggle={handleModalToggle}
                    />
                  )}
                </Field>
              </div>
              {/* <div className="mb-25">
              <Field name="prefLocation">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.prefLocation && form.touched.prefLocation
                    }
                  >
                    <FormLabel htmlFor="prefLocation">
                      Preferred Locations
                    </FormLabel>
                    <AsyncSelectWithFetch
                      isMulti={true}
                      placeholder="Enter job location"
                      taxonomy="city"
                      selectedInput={form.values.prefLocation}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          boxShadow:
                            form.errors.prefLocation &&
                            form.touched.prefLocation
                              ? "0 0 0 1px #E53E3E !important"
                              : "",
                        }),
                      }}
                      onChange={(selectedOptions) => {
                        // Extract labels from selected options
                        const selectedLabels = selectedOptions.map((option) => {
                          return {
                            city: option.label,
                          };
                        });
                        // Formik expects the selected value to be passed to the handleChange function
                        form.handleChange({
                          target: {
                            name: "prefLocation",
                            value: selectedLabels, // Use array of labels for multi-select
                          },
                        });
                      }}
                    />
                    <FormErrorMessage>
                      {form.errors.prefLocation}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              </div> */}
              <div className="dash-input-wrapper">
                {/* Rest of the code */}
                <Field name="expectedCtc">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.touched.expectedCtc && form.errors.expectedCtc
                      }
                    >
                      <FormLabel htmlFor="expectedCtc">
                        Expected salary
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement height="100%" pointerEvents="none">
                          INR
                        </InputLeftElement>
                        <Input
                          {...field}
                          type="text"
                          id="expectedCtc"
                          placeholder="Eg. 4,50,0000"
                          maxLength={11}
                          onChange={(e) => {
                            const formattedValue = formatNumber(e.target.value);
                            form.setFieldValue("expectedCtc", formattedValue);
                          }}
                          required={false}
                          onBlur={(e) => {
                            const formattedValue = formatNumber(e.target.value);
                            form.setFieldValue("expectedCtc", formattedValue);
                          }}
                        />
                      </InputGroup>
                      <FormErrorMessage>
                        {form.touched.expectedCtc && form.errors.expectedCtc}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </div>
            </div>
          </ModelWrapper>
        </div>
        <div className="dash-input-wrapper mb-15">
          <label className="mb-0">Industry</label>
          {!myProfileData?.industry ? (
            <WhatItDO fieldName="industry" />
          ) : (
            <p>{myProfileData.industry}</p>
          )}
        </div>
        <div className="dash-input-wrapper mb-15">
          <label className="mb-0">Designation</label>
          {!myProfileData?.designation ? (
            <WhatItDO fieldName="designation" />
          ) : (
            <p>{myProfileData.designation}</p>
          )}
        </div>
        <div className="dash-input-wrapper mb-15">
          <label className="mb-0">Preferred Employment Type</label>
          {!myProfileData?.prefEmploymentType?.length ? (
            <WhatItDO fieldName="prefEmploymentType" />
          ) : (
            <p>{myProfileData.prefEmploymentType?.join(", ")}</p>
          )}
        </div>
        <div className="dash-input-wrapper mb-15">
          <label className="mb-0">Preferred Job Type</label>
          {!myProfileData?.prefJobType?.length ? (
            <WhatItDO fieldName="prefJobType" />
          ) : (
            <p>{myProfileData.prefJobType?.join(", ")}</p>
          )}
        </div>
        <div className="dash-input-wrapper mb-15">
          <label className="mb-0">Preferred Location</label>
          {!myProfileData?.prefLocation?.length ? (
            <WhatItDO fieldName="prefLocation" />
          ) : (
            <p>{pluckList(myProfileData.prefLocation, "city").join(", ")}</p>
          )}
        </div>
        <div className="dash-input-wrapper mb-15">
          <label className="mb-0">Expected Salary</label>
          {!myProfileData?.expectedCtc ? (
            <WhatItDO fieldName="expectedCtc" />
          ) : (
            <p>{`₹ ${myProfileData.expectedCtc}`}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerDetails;
