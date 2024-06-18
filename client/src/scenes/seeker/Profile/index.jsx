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

import { ExternalLinkIcon } from "@chakra-ui/icons";

import AsyncSelectWithFetch from "./../../../utils/AsyncJBSelect";

import ModelButton from "./../../../components/Modal/Button";
import ModelWrapper from "./../../../components/Modal/Wrapper";
import WhatItDO from "./../../../components/Dashboard/WhatItDo";

import { Field } from "formik";
import * as Yup from "yup";

// Redux
import { useDispatch } from "react-redux";
import {
  useSkMnjOnlineProfileMutation,
  useSkDeleteOnlineProfileMutation,
  useSkGetMeQuery,
  useSkUpdateProfileMutation,
} from "./../../../state/seeker/profile/api";

import {
  setCredentials,
  setUpdateTimeStamp,
} from "./../../../state/seeker/authentication/slice";
import { useError } from "../../../components/Error/Para";

import BasicDetails from "./BasicDetails";
import PersonalDetails from "./PersonalDetails";
import CareerDetails from "./CareerDetails";
import ProfileAvatar from "./ProfileAvatar";

const modalConfigs = {
  network: false,
  address: false,
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

// Validation schema for social profile details
const onlineProfileDetailsValidationSchema = {
  name: Yup.string().required("Profile name is required"),
  url: Yup.string().required("Profile url is required"),
};

/**
 * Fields criteria
 */

const onlineProfilesFields = [
  {
    name: "name",
    label: "Social Profile",
    type: "text",
    placeholder: "Enter Social Profile Name",
  },
  {
    name: "url",
    label: "Profile URL",
    type: "url",
    placeholder: "Enter Social Profile URL",
  },
];

const index = () => {

  const [errorMessage, setError] = useError();

  const dispatch = useDispatch();

  const { data: { data: myProfileData } = {}, refetch: refetchMe } =
    useSkGetMeQuery(2);

  /**
   * Initial Values
   */

  // Initial value of address and location details
  const addressLocationDetailsInitialValues = myProfileData?.location[0] || {
    address: "",
    city: "",
    pincode: "",
  };

  // Initial value of social profile details
  const [
    onlineProfileDetailsInitialValues,
    setOnlineProfileDetailsInitialValues,
  ] = useState({
    name: "",
    url: "",
  });

  // Handle modal toggle
  const [modalStateConfigs, setModalStateConfigs] = useState(modalConfigs);
  const [modelEditSate, setModelEditSate] = useState({
    edge: false,
    title: "",
  });

  const handleModalToggle = (key) => {
    setModalStateConfigs({
      ...modalStateConfigs,
      [key]: !modalStateConfigs[key],
    });

    // Reset to add
    if (modelEditSate.edge) {
      setModelEditSate({
        edge: false,
        title: modelEditSate.edge && "Add",
      });
    }
  };

  // Mutations
  const [skUpdateProfile, { isLoading: skUpdateProfileLoading }] =
    useSkUpdateProfileMutation();
  const [skMnjOnlineProfile, { isLoading: skMnjOnlineProfileLoading }] =
    useSkMnjOnlineProfileMutation();
  const [skDeleteOnlineProfile, { isLoading: skDeleteOnlineProfileLoading }] =
    useSkDeleteOnlineProfileMutation();

  /**
   * Handle update
   *
   */

  const handleSubmit = async (key, values, actions) => {
    try {
      // Update profile
      const response = await skUpdateProfile(values).unwrap();

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

  const handleMnjOnlineProfile = async (values) => {
    try {
      // Update profile
      const response = await skMnjOnlineProfile({
        onlineProfiles: [values],
      }).unwrap();

      // Update data in local
      if (response.data) {
        dispatch(setUpdateTimeStamp());
        
        refetchMe();

        // Close modal
        handleModalToggle("network");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditModal = (values) => {
    // Update initial value
    setOnlineProfileDetailsInitialValues(values);

    setModelEditSate({
      edge: true,
      title: `Edit - ${values.name}`,
    });

    // Open modal
    handleModalToggle("network");
  };

  const handleDeleteOnlineProfile = async (ogId) => {
    try {
      // Update profile
      const response = await skDeleteOnlineProfile(ogId);

      // Update timestamp
      dispatch(setUpdateTimeStamp());

      // Refetch me
      refetchMe();

      // Close modal
      handleModalToggle("network");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2 className="main-title mb-0 candidates-profile-details-title-22">
        My Profile
      </h2>

      <ProfileAvatar />

      <BasicDetails error={errorMessage} handleSubmit={handleSubmit} skUpdateProfileLoading={skUpdateProfileLoading} />

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
              isLoading={skUpdateProfileLoading}
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
                          openMenuOnClick={false}
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
                          openMenuOnClick={false}
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
              Online Profile
            </h4>
            <ModelButton
              className="dash-btn-two tran3s fs-5"
              text="Add"
              onClickEvent={() => handleModalToggle("network")}
            />
            <ModelWrapper
              title={
                modelEditSate.edge ? modelEditSate.title : "Add Online Profile"
              }
              isOpen={modalStateConfigs.network}
              onClose={() => handleModalToggle("network")}
              initialValues={onlineProfileDetailsInitialValues}
              validationSchema={onlineProfileDetailsValidationSchema}
              onSubmit={handleMnjOnlineProfile}
              isLoading={
                skMnjOnlineProfileLoading || skDeleteOnlineProfileLoading
              }
              isDelete={modelEditSate.edge}
              onDelete={handleDeleteOnlineProfile}
              deleteById="ogId"
              error={errorMessage}
            >
              <div
                className="dashboard-body bg-white m-0 p-0"
                style={{ minHeight: "auto" }}
              >
                {onlineProfilesFields.map((field) => {
                  const { input: inputType, ...fieldAttributes } = field;
                  const FieldComponent =
                    inputType === "textarea" ? Textarea : Input;
                  return (
                    <div
                      key={Math.random() * 3}
                      className="dash-input-wrapper mb-25 int-x-20"
                    >
                      <Field name={fieldAttributes.name}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors[fieldAttributes.name] &&
                              form.touched[fieldAttributes.name]
                            }
                            isRequired
                          >
                            <FormLabel htmlFor={fieldAttributes.name}>
                              {fieldAttributes.label}
                            </FormLabel>
                            <FieldComponent
                              {...fieldAttributes}
                              id={fieldAttributes.name}
                              onChange={form.handleChange}
                              value={form.values[fieldAttributes.name]}
                            />
                            <FormErrorMessage>
                              {form.errors[fieldAttributes.name]}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </div>
                  );
                })}
              </div>
            </ModelWrapper>
          </div>
          {!myProfileData?.onlineProfiles?.length ? (
            <WhatItDO fieldName="onlineProfile" />
          ) : (
            <List spacing={3} padding={0}>
              {myProfileData?.onlineProfiles.map((profile, index) => (
                <ListItem key={profile.ogId}>
                  <div className="dash-input-wrapper mb-15">
                    <p className="mb-1 fw-500 d-flex align-items-center">
                      {profile.name}
                      <span
                        className="rp-edit"
                        onClick={() => handleEditModal(profile)}
                      >
                        <i className="bi bi-pencil"></i>
                      </span>
                    </p>
                    <Link href={profile.url} isExternal color="ActiveCaption">
                      {profile.url}
                      {""}
                      <ExternalLinkIcon mx="2px" />
                    </Link>
                  </div>
                </ListItem>
              ))}
            </List>
          )}
        </div>
      </div>

      <PersonalDetails error={errorMessage} handleSubmit={handleSubmit} skUpdateProfileLoading={skUpdateProfileLoading} />

      <CareerDetails error={errorMessage} handleSubmit={handleSubmit} skUpdateProfileLoading={skUpdateProfileLoading} />

    </>
  );
};

export default index;
