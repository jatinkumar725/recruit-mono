import React, { useState, useEffect } from "react";

import { Avatar, Input } from "@chakra-ui/react";

import {
  MAX_SUPPORTED_PROFILE_PICTURE_SIZE,
  SUPPORTED_PROFILE_PICTURE_FORMATS,
} from "./../../../constants/siteConstants";

import ModelButton from "./../../../components/Modal/Button";
import ModelWrapper from "./../../../components/Modal/Wrapper";

import { Field } from "formik";
import * as Yup from "yup";

// Redux
import { useSelector } from "react-redux";
import { useRcGetMeQuery } from "./../../../state/recruiter/profile/api";
import {
  useRcUploadAssetMutation,
  useRcDeleteUploadAssetMutation,
} from "../../../state/recruiter/uploads/api";

/**
 * Initial Values
 */
// Initial value for profile picture
const companyLogoInitialValues = {
  profile: "",
};

/**
 * Validation schema
 */
// Validation schema for profile picture
const companyLogoValidationSchema = {
  profile: Yup.mixed()
    .test("is-file-too-big", "File exceeds 2MB", (profile) => {
      let valid = true;
      if (profile) {
        const size = profile.size / 1024 / 1024;
        if (size > MAX_SUPPORTED_PROFILE_PICTURE_SIZE) {
          valid = false;
        }
      }
      return valid;
    })
    .test(
      "is-file-of-correct-type",
      "File is not of supported type. Supported file format: png, jpg, jpeg - upto 2MB",
      (profile) => {
        let valid = true;
        if (profile) {
          const type = profile.type.split("/")[1];
          if (!SUPPORTED_PROFILE_PICTURE_FORMATS.includes(type)) {
            valid = false;
          }
        }
        return valid;
      }
    ),
};

const CompanyLogo = () => {
  const { loggedUserInfo } = useSelector((state) => state.rcAuth);
  const { data: { data: myProfileData } = {}, refetch: refetchMe } =
    useRcGetMeQuery(2);

  /**
   * Initial Values
   */

  const [companyLogoUploadModel, setCompanyLogoUploadModel] =
    useState(false);

  // State management for avatar
  const [avatarBlob, setAvatarBlob] = useState({
    previewBox: null,
    siteBox: null,
  });

  useEffect(() => {
    if (myProfileData?.companyLogo) {
      setAvatarBlob({
        previewBox: myProfileData?.companyLogo.uploadPath,
        siteBox: myProfileData?.companyLogo.uploadPath,
      });
    }
  }, [myProfileData]);

  const handleModalToggle = () => {
    setCompanyLogoUploadModel(!companyLogoUploadModel);
  };

  // Mutations
  const [rcUploadAsset, { isLoading: rcUploadAssetLoading }] =
    useRcUploadAssetMutation();
  const [rcDeleteUploadAsset, { isLoading: rcDeleteUploadAssetLoading }] =
    useRcDeleteUploadAssetMutation();

  // Preview Company logo
  const handlePreviewCompanyLogo = (file) => {
    try {
      const reader = new FileReader();

      reader.onload = function (event) {
        const imageData = event.target.result;
        // const blob = dataURItoBlob(imageData);
        setAvatarBlob({
          ...avatarBlob,
          previewBox: imageData,
        });
        // You can use this blob further, for example, to upload it via AJAX
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error preview profile picture: ", error);
    }
  };

  // Handle upload company logo
  const handleUploadCompanyLogo = async (values) => {
    try {
      const uploadData = new FormData();
      uploadData.append("files", values.profile);

      await rcUploadAsset({
        profileId: loggedUserInfo?.profileId,
        uploadType: "profile",
        data: uploadData,
      }).unwrap();

      refetchMe();

      // Close model
      setCompanyLogoUploadModel(false);

      // Clear Preview
      setAvatarBlob({
        ...avatarBlob,
        previewBox: null,
      });
    } catch (error) {
      console.error("Error upload profile picture: ", error);
    }
  };

  const handleDeleteCompanyLogo = async () => {
    try {
      const response = await rcDeleteUploadAsset({
        profileId: loggedUserInfo?.profileId,
        uploadType: "profile",
      }).unwrap();

      // If there is visible delay void before page reload in profile picture on delete, then comment below code
      setAvatarBlob({
        previewBox: null,
        siteBox: null,
      });

      // Refetch me
      refetchMe();

      // Reload page
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="candidates-profile-details border-20 mt-40">
      <div className="inner-card">
        <div className="user-avatar-setting d-flex align-items-center">
          <Avatar size="xl" src={avatarBlob.siteBox} />
          <ModelButton
            className="upload-btn position-relative tran3s ms-4 me-3"
            text="Manage logo"
            onClickEvent={handleModalToggle}
          />
          <ModelWrapper
            title="Company logo upload"
            isOpen={companyLogoUploadModel}
            onClose={handleModalToggle}
            initialValues={companyLogoInitialValues}
            validationSchema={companyLogoValidationSchema}
            onSubmit={handleUploadCompanyLogo}
            isLoading={rcUploadAssetLoading || rcDeleteUploadAssetLoading}
          >
            <div
              className="dashboard-body text-center bg-white m-0 p-0"
              style={{ minHeight: "auto" }}
            >
              <div className="dash-input-wrapper mb-20">
                <Avatar size="xl" src={avatarBlob.previewBox} />
              </div>
              <Field name="profile">
                {({ field, form }) => (
                  <>
                    <div className="d-flex justify-content-center align-items-center mb-2">
                      {avatarBlob.siteBox && (
                        <button
                          className="delete-btn tran3s text-danger fw-500 me-3"
                          type="button"
                          onClick={handleDeleteCompanyLogo}
                        >
                          Delete logo
                        </button>
                      )}
                      <div className="dash-btn-one d-inline-block position-relative">
                        Upload logo
                        <Input
                          type="file"
                          id="profile"
                          name="profile"
                          onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            if (file) {
                              form.setFieldValue("profile", file);
                              handlePreviewCompanyLogo(file);
                            }
                          }}
                        />
                      </div>
                    </div>
                    <small
                      className={`fw-500 ${
                        form.errors.profile ? "text-danger" : ""
                      }`}
                    >
                      {form.errors.profile
                        ? form.errors.profile
                        : "Supported file format: png, jpg, jpeg - upto 2MB"}
                    </small>
                  </>
                )}
              </Field>
            </div>
          </ModelWrapper>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogo;
