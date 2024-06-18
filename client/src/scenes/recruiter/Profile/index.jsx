import React, { useState } from "react";

import {
  List,
  ListItem,
  Link,
  FormLabel,
  Input,
  Textarea,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

import JBSelect from "./../../../utils/JBSelect";
import AsyncSelectWithFetch from "./../../../utils/AsyncJBSelect";

import { COMPANY_SIZE } from "../../../constants/siteConstants";

import ModelButton from "./../../../components/Modal/Button";
import ModelWrapper from "./../../../components/Modal/Wrapper";
import WhatItDO from "./../../../components/Dashboard/WhatItDo";

import { Field } from "formik";
import * as Yup from "yup";

// Redux
import { useDispatch } from "react-redux";
import {
  useRcGetMeQuery,
  useRcUpdateProfileMutation,
} from "./../../../state/recruiter/profile/api";

import {
  setCredentials,
  setUpdateTimeStamp,
} from "./../../../state/recruiter/authentication/slice";
import { useError } from "../../../components/Error/Para";

import BasicDetails from "./BasicDetails";
import ProfileAvatar from "./ProfileAvatar";
import KYCDetails from "./KYCDetails";

const modalConfigs = {
  address: false,
  professional: false,
};

/**
 * Validation schema
 */

// Validation schema for address and location details
const addressLocationDetailsValidationSchema = {
  address: Yup.string().required("Address is required").max(35),
  city: Yup.string().required("City is required"),
  pincode: Yup.string().required("Pincode is required"),
};

const professionalDetailsSchema = {
  industry: Yup.string().required("Industry is required").max(35),
  // company: Yup.string().required("Company is required"),
  companySize: Yup.string().required("Company size is required"),
  roleAtCompany: Yup.string().required("Role at company is required"),
};

const index = () => {
  const [errorMessage, setError] = useError();

  const dispatch = useDispatch();

  const { data: { data: myProfileData } = {}, refetch: refetchMe } =
    useRcGetMeQuery(2);

  /**
   * Initial Values
   */

  // Initial value of address and location details
  const addressLocationDetailsInitialValues = myProfileData?.location[0] || {
    address: "",
    city: "",
    pincode: "",
  };

  // Initial value of professional details
  const professionalDetailsInitialValues = {
    industry: myProfileData?.industry || "",
    // company: myProfileData?.company || "",
    roleAtCompany: myProfileData?.roleAtCompany || "",
    companySize: myProfileData?.companySize || "",
  };

  // Handle modal toggle
  const [modalStateConfigs, setModalStateConfigs] = useState(modalConfigs);

  const handleModalToggle = (key) => {
    setModalStateConfigs({
      ...modalStateConfigs,
      [key]: !modalStateConfigs[key],
    });
  };

  // Mutations
  const [rcUpdateProfile, { isLoading: rcUpdateProfileLoading }] =
    useRcUpdateProfileMutation();

  /**
   * Handle update
   *
   */

  const handleSubmit = async (key, values, actions) => {
    try {
      // Update profile
      const response = await rcUpdateProfile(values).unwrap();

      // Update data in local
      if (response.data) {
        dispatch(setCredentials(response.data));

        refetchMe();

        // Close modal
        handleModalToggle(key);
      }
    } catch (error) {
      setError(error.data.message);

      console.error(error);
    }
  };

  const companySizeOptions = Object.entries(COMPANY_SIZE).map(
    ([value, label]) => ({ value: parseInt(value), label })
  );

  return (
    <>
      <h2 className="main-title mb-0 candidates-profile-details-title-22">
        My Profile
      </h2>

      <ProfileAvatar />

      <BasicDetails
        error={errorMessage}
        handleSubmit={handleSubmit}
        rcUpdateProfileLoading={rcUpdateProfileLoading}
      />

      <div className="candidates-profile-details border-20 mt-40">
        <div className="inner-card lg-mb-50">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="title mb-0 candidates-profile-details-title-22">
              Address & Location
            </h4>
            <ModelButton
              className="dash-btn-two tran3s fs-5"
              text="Edit"
              onClickEvent={() => handleModalToggle("address")}
            />
            <ModelWrapper
              title="Address & Location"
              isOpen={modalStateConfigs.address}
              onClose={() => handleModalToggle("address")}
              initialValues={addressLocationDetailsInitialValues}
              validationSchema={addressLocationDetailsValidationSchema}
              onSubmit={(values) => {
                const { pincode, ...restValues } = values;

                const dataToPass = {
                  location: [
                    {
                      ...restValues,
                      pincode: pincode,
                    },
                  ],
                };

                handleSubmit("address", dataToPass);
              }}
              isLoading={rcUpdateProfileLoading}
              error={errorMessage}
            >
              <div
                className="dashboard-body bg-white m-0 p-0"
                style={{ minHeight: "auto" }}
              >
                <div className="dash-input-wrapper mb-25 int-x-20">
                  <Field name="address">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.address && form.touched.address}
                        isRequired
                      >
                        <FormLabel htmlFor="address">Address</FormLabel>
                        <Input
                          type="text"
                          placeholder="Enter Your Address"
                          id="address"
                          name="address"
                          value={form.values.address}
                          onChange={form.handleChange}
                          required={false}
                        />
                        <FormErrorMessage>
                          {form.errors.address}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </div>
                <div className="mb-25">
                  <Field name="city">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.city && form.touched.city}
                        isRequired
                      >
                        <FormLabel htmlFor="city">City</FormLabel>
                        <AsyncSelectWithFetch
                          placeholder="City"
                          taxonomy="city"
                          selectedInput={form.values.city}
                          onChange={(selectedOption) => {
                            // Formik expects the selected value to be passed to the handleChange function
                            form.handleChange({
                              target: {
                                name: "city",
                                value: selectedOption.label,
                              },
                            });
                          }}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              boxShadow:
                                form.errors.city && form.touched.city
                                  ? "0 0 0 1px #E53E3E !important"
                                  : "",
                            }),
                          }}
                        />
                        <FormErrorMessage>{form.errors.city}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </div>
                <div className="mb-25">
                  <Field name="pincode">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.pincode && form.touched.pincode}
                        isRequired
                      >
                        <FormLabel htmlFor="pincode">Pincode</FormLabel>
                        <AsyncSelectWithFetch
                          placeholder="Pincode"
                          taxonomy="pincode"
                          selectedInput={form.values.pincode}
                          onChange={(selectedOption) => {
                            // Formik expects the selected value to be passed to the handleChange function
                            form.handleChange({
                              target: {
                                name: "pincode",
                                value: selectedOption.label,
                              },
                            });
                          }}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              boxShadow:
                                form.errors.pincode && form.touched.pincode
                                  ? "0 0 0 1px #E53E3E !important"
                                  : "",
                            }),
                          }}
                        />
                        <FormErrorMessage>
                          {form.errors.pincode}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </div>
              </div>
            </ModelWrapper>
          </div>
          {myProfileData?.location?.length > 0 ? (
            <>
              <div className="dash-input-wrapper mb-15">
                <label className="mb-0">Address</label>
                <p className="mb-0">{myProfileData?.location[0].address}</p>
              </div>
              <div className="dash-input-wrapper mb-15">
                <label className="mb-0">City</label>
                <p className="mb-0">{myProfileData?.location[0].city}</p>
              </div>
              <div className="dash-input-wrapper">
                <label className="mb-0">Pincode</label>
                <p className="mb-0">{myProfileData?.location[0].pincode}</p>
              </div>
            </>
          ) : (
            <WhatItDO fieldName="location" />
          )}
        </div>
      </div>

      <div className="candidates-profile-details border-20 mt-40">
        <div className="inner-card lg-mb-50">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="title mb-0 candidates-profile-details-title-22">
              Professional Details
            </h4>
            <ModelButton
              className="dash-btn-two tran3s fs-5"
              text="Edit"
              onClickEvent={() => {
                handleModalToggle("professional");
              }}
            />
            <ModelWrapper
              title="Professional Details"
              isOpen={modalStateConfigs.professional}
              onClose={() => handleModalToggle("professional")}
              initialValues={professionalDetailsInitialValues}
              validationSchema={professionalDetailsSchema}
              onSubmit={(values, actions) => {
                handleSubmit("professional", values);
              }}
              isLoading={rcUpdateProfileLoading}
              error={errorMessage}
            >
              <div
                className="dashboard-body bg-white m-0 p-0"
                style={{ minHeight: "auto" }}
              >
                <div className="mb-30">
                  <Field name="industry">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.industry && form.touched.industry
                        }
                        isRequired
                      >
                        <FormLabel htmlFor="industry">Industry</FormLabel>
                        <AsyncSelectWithFetch
                          placeholder="Industry"
                          taxonomy="industry"
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
                {/* <div className="mb-30">
                  <Field name="company">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.company && form.touched.company}
                        isRequired
                      >
                        <FormLabel htmlFor="company">Company</FormLabel>
                        <AsyncSelectWithFetch
                          placeholder="Company"
                          taxonomy="company"
                          selectedInput={form.values.company}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              boxShadow:
                                form.errors.company && form.touched.company
                                  ? "0 0 0 1px #E53E3E !important"
                                  : "",
                            }),
                          }}
                          onChange={(selectedOption) => {
                            // Formik expects the selected value to be passed to the handleChange function
                            form.handleChange({
                              target: {
                                name: "company",
                                value: selectedOption.label,
                              },
                            });
                          }}
                        />
                        <FormErrorMessage>
                          {form.errors.company}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </div> */}
                <div className="dash-input-wrapper mb-30">
                  <Field name="roleAtCompany">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.roleAtCompany &&
                          form.touched.roleAtCompany
                        }
                        isRequired
                      >
                        <FormLabel htmlFor="roleAtCompany">
                          Role at Company
                        </FormLabel>
                        <Input
                          placeholder="Enter your role at company"
                          id="roleAtCompany"
                          name="roleAtCompany"
                          onChange={form.handleChange}
                          value={form.values.roleAtCompany}
                          required={false}
                        />
                        <FormErrorMessage>
                          {form.errors.roleAtCompany}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </div>
                <Field name="companySize">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.touched.companySize && form.errors.companySize
                      }
                      isRequired
                    >
                      <FormLabel htmlFor="companySize">
                        Company Size
                      </FormLabel>
                      <JBSelect
                        required={false}
                        placeholder="Select company size"
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            height: "55px", // Adjust the height of the control container
                            boxShadow:
                              form.errors.companySize &&
                              form.touched.companySize
                                ? "0 0 0 1px #E53E3E !important"
                                : "",
                            borderRadius: "8px",
                          }),
                          input: (baseStyles, state) => ({
                            ...baseStyles,
                            height: "100%", // Adjust the height of the input field
                          }),
                        }}
                        defaultValue={
                          form.values.companySize && companySizeOptions.filter(size => size.value === form.values.companySize)
                        }
                        options={companySizeOptions}
                        onChange={(selectedOption) => {
                          // Form expects the selected value to be passed to the handleChange function
                          form.handleChange({
                            target: {
                              name: "companySize",
                              value: selectedOption.value,
                            },
                          });
                        }}
                      />
                      <FormErrorMessage>
                        {form.errors.companySize}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </div>
            </ModelWrapper>
          </div>
          <div className="dash-input-wrapper mb-15">
            <label className="mb-0">Industry</label>
            {myProfileData?.industry ? (
              <p className="mb-0">{myProfileData?.industry}</p>
            ) : (
              <WhatItDO fieldName="industry" />
            )}
          </div>
          <div className="dash-input-wrapper mb-15">
            <label className="mb-0">Company</label>
            {myProfileData?.company ? (
              <p className="mb-0">{myProfileData?.company}</p>
            ) : (
              <WhatItDO fieldName="company" />
            )}
          </div>
          <div className="dash-input-wrapper mb-15">
            <label className="mb-0">Company size</label>
            {myProfileData?.companySize ? (
              <p className="mb-0">
                {COMPANY_SIZE[myProfileData?.companySize]} Employees
              </p>
            ) : (
              <WhatItDO fieldName="companySize" />
            )}
          </div>
          <div className="dash-input-wrapper mb-15">
            <label className="mb-0">Role at company</label>
            {myProfileData?.roleAtCompany ? (
              <p className="mb-0">{myProfileData?.roleAtCompany}</p>
            ) : (
              <WhatItDO fieldName="roleAtCompany" />
            )}
          </div>
        </div>
      </div>

      <KYCDetails />
    </>
  );
};

export default index;
