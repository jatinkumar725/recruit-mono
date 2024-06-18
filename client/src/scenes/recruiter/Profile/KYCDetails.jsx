import React, { useState } from "react";
import { FormControl, Input } from "@chakra-ui/react";
import ModelButton from "./../../../components/Modal/Button";
import ModelWrapper from "./../../../components/Modal/Wrapper";
import { Field } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { useRcUploadAssetMutation } from "../../../state/recruiter/uploads/api";

import { AlertErrorComponent, useError } from "../../../components/Error/Para";

import {
  MAX_SUPPORTED_DOC_UPlOAD_SIZE,
  SUPPORTED_DOC_UPlOAD_FORMATS,
} from "../../../constants/siteConstants";
import { setCredentials } from "../../../state/recruiter/authentication/slice";

/**
 * Initial Values
 */
const kycDetailsInitialValues = {
  kycDocuments: [],
};

/**
 * Validation schema
 */
const kycDetailsValidationSchema = {
  kycDocuments: Yup.array(
    Yup.mixed()
      .test(
        "is-file-too-big",
        ({ value }) => `File ${value.name} exceeds 2MB`,
        (kyc) => {
          let valid = true;
          if (kyc) {
            const size = kyc.size / 1024 / 1024;
            if (size > MAX_SUPPORTED_DOC_UPlOAD_SIZE) {
              valid = false;
            }
          }
          return valid;
        }
      )
      .test(
        "is-file-of-correct-type",
        ({ value }) => `File ${value.name} is not of supported type`,
        (kyc) => {
          let valid = true;
          if (kyc) {
            const type = kyc.type.split("/")[1];
            if (!SUPPORTED_DOC_UPlOAD_FORMATS.includes(type)) {
              valid = false;
            }
          }
          return valid;
        }
      )
  )
    .max(4, "You can upload up to 4 KYC documents")
    .required("Please upload at least one KYC document"),
};

const KYCDetails = () => {
  const dispatch = useDispatch();

  const { loggedUserInfo } = useSelector((state) => state.rcAuth);

  const [errorMessage, setError] = useError();

  const [kycUploadModel, setKycUploadModel] = useState(false);
  const [rcUploadAsset, { isLoading: rcUploadAssetLoading }] =
    useRcUploadAssetMutation();

  const handleModalToggle = () => {
    setKycUploadModel(!kycUploadModel);
  };

  const handleUploadKYCDocuments = async (values) => {
    try {
      const uploadData = new FormData();
      values.kycDocuments.forEach((file) => {
        uploadData.append("files", file);
      });

      // Implement your mutation to upload KYC documents
      const response = await rcUploadAsset({
        profileId: loggedUserInfo?.profileId,
        uploadType: "docs",
        data: uploadData,
      }).unwrap();

      if (response.data.profile) {
        dispatch(setCredentials(response.data.profile));
      }

      // Close model
      setKycUploadModel(false);
    } catch (error) {
      const editPostErrorMessage = error.data.message;

      setError(editPostErrorMessage);

      console.error("Error uploading KYC documents: ", error);
    }
  };

  return (
    <div className="candidates-profile-details border-20 mt-40">
      <div className="inner-card">
        <h4 className="title mb-3 candidates-profile-details-title-22">
          KYC Details
        </h4>
        <div className="dash-input-wrapper mb-15">
          <p>
            {!loggedUserInfo?.isKYCDocsUploaded ? (
              <>
                Upload your KYC documents. Your KYC request will be processed
                within 2 business days.{" "}
                <ModelButton
                  variant="link"
                  colorScheme="blue"
                  fontWeight={500}
                  text="Upload documents"
                  onClickEvent={handleModalToggle}
                />
              </>
            ) : (
              "We have received your request and will process it within 2 business days. We will notify you on your registered email address."
            )}
          </p>
        </div>
        <ModelWrapper
          title="KYC Document Upload"
          isOpen={kycUploadModel}
          onClose={handleModalToggle}
          initialValues={kycDetailsInitialValues}
          validationSchema={kycDetailsValidationSchema}
          onSubmit={handleUploadKYCDocuments}
          isLoading={rcUploadAssetLoading}
        >
          <div
            className="dashboard-body bg-white m-0 p-0"
            style={{ minHeight: "auto" }}
          >
            <AlertErrorComponent
              fontSize="14px"
              fontWeight={500}
              errorMessage={errorMessage}
              setError={setError}
            />
            <Field name="kycDocuments">
              {({ field, form }) => (
                <FormControl
                  isInvalid={
                    form.touched.kycDocuments && form.errors.kycDocuments
                  }
                  // isRequired
                >
                  <Input
                    type="file"
                    id="kycDocuments"
                    name="kycDocuments"
                    className="form-control mb-2 shadow-none"
                    multiple
                    onChange={async (event) => {
                      const files = Array.from(event.currentTarget.files);
                      form.setFieldValue("kycDocuments", files);
                    }}
                  />
                  {form.errors.kycDocuments ? (
                    form.errors.kycDocuments.map((error) => (
                      <small
                        key={error}
                        className="text-danger d-block mb-2 fw-500"
                      >
                        {error}
                      </small>
                    ))
                  ) : (
                    <small className="text-center d-block fw-500">
                      Supported file format: pdf, jpg, jpeg - upto 2MB
                    </small>
                  )}
                </FormControl>
              )}
            </Field>
          </div>
        </ModelWrapper>
      </div>
    </div>
  );
};

export default KYCDetails;
