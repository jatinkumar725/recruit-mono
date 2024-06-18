import React, { useEffect, useState } from "react";

import {
  FormLabel,
  Input,
  Textarea,
  FormControl,
  FormErrorMessage,
  RadioGroup,
  Radio,
  HStack,
  Spinner,
  Image,
  Link,
} from "@chakra-ui/react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import {
  // SITE_DIR_URI,
  SUPPORTED_YEARS,
  SUPPORTED_MONTHS,
  // SUPPORTED_EXPERIENCE_YEARS,
  // SUPPORTED_EXPERIENCE_MONTHS,
  MAX_SUPPORTED_CV_RESUME_SIZE,
  SUPPORTED_CV_RESUME_FORMATS,
  EDUCATION_TYPES,
  EXAM_BOARDS,
  EXAM_BOARD_GROUPS,
  EXCLUSIVE_EDUCATION_TYPES,
  SITE_DIR_URI,
} from "./../../../constants/siteConstants";

import JBSelect from "./../../../utils/JBSelect";
import AsyncSelectWithFetch from "./../../../utils/AsyncJBSelect";

import ModelButton from "./../../../components/Modal/Button";
import ModelWrapper from "./../../../components/Modal/Wrapper";
import WhatItDO from "./../../../components/Dashboard/WhatItDo";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  // setCredentials,
  setUpdateTimeStamp,
} from "./../../../state/seeker/authentication/slice";
import {
  useSkGetMeQuery,
  useSkUpdateProfileMutation,
  useSkDeleteProfileEntityMutation,
  useSkMnjProjectMutation,
  useSkDeleteProjectMutation,
} from "./../../../state/seeker/profile/api";

import {
  createDate,
  formatDate,
  getDateComponents,
} from "./../../../utils/date";
import {
  useSkDeleteUploadAssetMutation,
  useLazySkGetUploadAssetQuery,
  useSkUploadAssetMutation,
} from "../../../state/seeker/uploads/api";
import makeDownloadFile from "../../../utils/makeDownloadFile";

import { AlertErrorComponent, useError } from "../../../components/Error/Para";
import { useLazySeSuggestEntityQuery } from "../../../state/site/suggester/api";
import { getKeyByValue } from "../../../utils/objects";
import { useOutletContext } from "react-router-dom";

const modalConfigs = {
  education: false,
  skills: false,
  employment: false,
  project: false,
};

/**
 * Yup Schema Validations
 */
// Validation schema for cv resume
const cvResumeValidationSchema = Yup.object().shape({
  cv: Yup.mixed()
    .required("Please upload your CV")
    .test("is-file-too-big", "File exceeds 2MB", (cvResume) => {
      let valid = true;
      if (cvResume) {
        const size = cvResume.size / 1024 / 1024;
        if (size > MAX_SUPPORTED_CV_RESUME_SIZE) {
          valid = false;
        }
      }
      return valid;
    })
    .test(
      "is-file-of-correct-type",
      "File is not of supported type. Supported file .pdf, .doc, .docx",
      (cvResume) => {
        let valid = true;
        if (cvResume) {
          const type = cvResume.type.split("/")[1];
          if (!SUPPORTED_CV_RESUME_FORMATS.includes(type)) {
            valid = false;
          }
        }
        return valid;
      }
    ),
});

// Validation schema for education details
const educationDetailsSchema = {
  educationType: Yup.string().required("Education is required"),
  specialisation: Yup.string()
    .when("educationType", {
      is: (educationType) => !["Class X", "Class XII"].includes(educationType),
      then: () => Yup.string().required("Course is required"),
    })
    .notRequired(),
  institute: Yup.string()
    .when("educationType", {
      is: (educationType) => !["Class X", "Class XII"].includes(educationType),
      then: () => Yup.string().required("Academy is required"),
    })
    .notRequired(),
  startYear: Yup.number().required("Start year is required"),
  endYear: Yup.number().required("End year is required"),
  examBoard: Yup.string()
    .when("educationType", {
      is: (educationType) => ["Class X", "Class XII"].includes(educationType),
      then: () => Yup.string().required("Board is required"),
    })
    .notRequired(),
};

// Validation schema for skill details
const skillDetailsSchema = {
  skills: Yup.array()
    .of(Yup.string())
    .min(1, "Please specify at least one key skill")
    .max(24, "Up to 24 key skills are allowed to be added"),
};

// Validation schema for employment details
const employmentDetailsSchema = {
  isYourCurrentCompany: Yup.bool(),
  designation: Yup.string().required("Designation is required"),
  company: Yup.string().required("Company is required"),
  startYear: Yup.number().required("Year is required"),
  skills: Yup.array()
    .of(Yup.string())
    .min(1, "Please specify at least one Key Skill")
    .max(10, "Up to 10 skills are allowed to be added"),
  startMonth: Yup.number().required("Month is required"),
  endYear: Yup.number()
    .when("isYourCurrentCompany", {
      is: (isYourCurrentCompany) => isYourCurrentCompany === false,
      then: () => Yup.number().required("Year is required"),
    })
    .notRequired(),
  endMonth: Yup.number()
    .when("isYourCurrentCompany", {
      is: (isYourCurrentCompany) => isYourCurrentCompany === false,
      then: () => Yup.number().required("Month is required"),
    })
    .notRequired(),
  description: Yup.string(),
};

// Validation schema for project details
const projectDetailsValidationSchema = {
  name: Yup.string().required("Project name is required"),
  url: Yup.string()
    .url("Invalid project url")
    .required("Project url is required"),
  imageURL: Yup.string().url("Invalid image url"),
};

/**
 * Options
 */

const supportedStartYearsOptions = SUPPORTED_YEARS.map((year) => {
  const currentYear = new Date().getFullYear();

  if (year <= currentYear) {
    return {
      value: year,
      label: year,
    };
  }
}).filter((year) => year);

const supportedEndYearsOptions = SUPPORTED_YEARS.map((year) => {
  return {
    value: year,
    label: year,
  };
});

const supportedMonthsOptions = Object.entries(SUPPORTED_MONTHS).map(
  ([monthIndex, monthObject]) => {
    return {
      value: parseInt(monthIndex),
      label: monthObject.short,
    };
  }
);

const educationTypeOptions = Object.values(EDUCATION_TYPES).map(
  (educationType) => {
    return {
      label: educationType,
      value: educationType,
    };
  }
);

const examBoardOptions = EXAM_BOARDS.reduce((acc, board) => {
  // Find the group label corresponding to the board's group ID
  const groupLabel =
    EXAM_BOARD_GROUPS.find((group) => group.id === board.group)?.name ||
    "Other";

  // Check if the group already exists in the accumulator
  const existingGroup = acc.find((group) => group.label === groupLabel);

  if (existingGroup) {
    // Add the board to the existing group's options
    existingGroup.options.push({ label: board.name, value: board.name });
  } else {
    // Create a new group and add the board to its options
    acc.push({
      label: groupLabel,
      options: [{ label: board.name, value: board.name }],
    });
  }

  return acc;
}, []);

const initialValues = {
  file: {
    cv: "",
  },
  skills: [],
  education: {
    educationType: "",
    specialisation: "",
    examBoard: "",
    institute: "",
    startYear: "",
    endYear: "",
  },
  employment: {
    isYourCurrentCompany: true,
    company: "",
    designation: "",
    startYear: "",
    startMonth: "",
    endYear: null,
    endMonth: null,
    skills: [],
  },
  project: {
    name: "",
    imageURL: "",
    url: "",
  },
};

const Index = () => {
  const [isPageLoading, setIsPageLoading] = useOutletContext();

  const [errorMessage, setError] = useError();
  const [errorMessagePrjDltError, setPrjDltError] = useError();
  const [errorMessageCVDltError, setCVDltError] = useError();

  const dispatch = useDispatch();

  const { loggedUserInfo } = useSelector((state) => state.skAuth);
  const { data: { data: myProfileData } = {}, refetch: refetchMe } =
    useSkGetMeQuery(2);

  /**
   * Initial Values
   */
  const [skillDetails, setSkillDetails] = useState([]);
  const [employmentSkillDetails, setEmploymentSkillDetails] = useState([]);
  const [isCurrentCompany, setIsCurrentCompany] = useState(true);
  const [isExclusiveEdType, setIsExclusiveEdType] = useState(false);

  const [modelDetailsInitialValues, setModelDetailsInitialValues] =
    useState(initialValues);

  useEffect(() => {
    if (myProfileData && myProfileData?.skills) {
      setSkillDetails(myProfileData?.skills?.split(","));
    }
  }, [myProfileData]);

  // Handle modal toggle
  const [modalStateConfigs, setModalStateConfigs] = useState(modalConfigs);
  const [modelEditSate, setModelEditSate] = useState({
    edge: false,
    title: "",
  });

  const handleModalToggle = (key, values = null) => {
    setModalStateConfigs({
      ...modalStateConfigs,
      [key]: !modalStateConfigs[key],
    });

    if (values) {
      setModelDetailsInitialValues({
        ...modelDetailsInitialValues,
        [key]: values,
      });
    }

    // Reset to add
    if (modelEditSate.edge) {
      setModelEditSate({
        edge: false,
        title: modelEditSate.edge && "Add",
      });
    }

    // ? edge: false means modal in add state
  };

  /**
   * Handle Update
   */

  // Mutations
  const [skUpdateProfile, { isLoading: skUpdateProfileLoading }] =
    useSkUpdateProfileMutation();
  const [skDeleteProfileEntity, { isLoading: skDeleteProfileEntityLoading }] =
    useSkDeleteProfileEntityMutation();
  const [skMnjProject, { isLoading: skMnjProjectLoading }] =
    useSkMnjProjectMutation();
  const [skDeleteProject, { isLoading: isSkDeleteProjectLoading }] =
    useSkDeleteProjectMutation();
  const [skUploadAsset, { isLoading: skUploadAssetLoading }] =
    useSkUploadAssetMutation();
  const [skDeleteUploadAsset, { isLoading: skDeleteUploadAssetLoading }] =
    useSkDeleteUploadAssetMutation();
  const [triggerGetUploadAsset, resultGetUploadAsset, lastPromiseInfo] =
    useLazySkGetUploadAssetQuery();

  const handleSubmit = async (model, values, profileData = []) => {
    try {
      const entityId = `${model}Id`;

      // Handle Entity
      const dataToSubmit = {};

      // case of edit
      if (values[entityId]) {
        dataToSubmit[model] = profileData?.map((entity) =>
          values[entityId] === entity[entityId] ? values : entity
        );
      } else {
        // case of add
        dataToSubmit[model] = [...profileData, values];
      }

      // Update profile
      const response = await skUpdateProfile(dataToSubmit).unwrap();

      // Update data in local
      if (response.data) {
        // Update timestamp
        dispatch(setUpdateTimeStamp());

        // Close modal
        handleModalToggle(model, initialValues[model]);

        refetchMe();
      }
    } catch (error) {
      setError(error.data.message);

      console.error(error);
    }
  };

  const handleDelete = (model) => async (entityId) => {
    try {
      // Update profile
      const response = await skDeleteProfileEntity({ entity: model, entityId });

      // Update timestamp
      dispatch(setUpdateTimeStamp());

      refetchMe();

      // Close modal
      handleModalToggle(model, initialValues[model]);
    } catch (error) {
      setError(error.data.message);

      console.error(error);
    }
  };

  /**
   * Skills
   */

  const handleSkillsSubmit = async (values) => {
    try {
      // Convert skills array to comma separated string
      const skills = values.skills.join(",");

      // Create data to update
      const dataToUpdate = {
        skills,
      };

      // Update profile
      const response = await skUpdateProfile(dataToUpdate).unwrap();

      // Update timestamp
      dispatch(setUpdateTimeStamp());

      refetchMe();

      // Close modal
      handleModalToggle("skills", initialValues.skills);
    } catch (error) {
      setError(error.data.message);

      console.error(error);
    }
  };

  /**
   * Education
   */

  const handleEditEducationModal = (values) => {
    const isExclusiveEdType = EXCLUSIVE_EDUCATION_TYPES.includes(
      values.educationType
    );

    if (isExclusiveEdType) {
      setIsExclusiveEdType(true);
    }

    if (!isExclusiveEdType) {
      getSpecialisationUnderEdType(
        getKeyByValue(EDUCATION_TYPES, values.educationType)
      );
    }

    // Set model edit state to true
    setModelEditSate({
      edge: true,
      title: `Edit - ${values.specialisation || values.educationType}`,
    });

    // Open modal
    handleModalToggle("education", values);
  };

  /**
   * Employment
   */

  const handleEditEmploymentModal = (values) => {
    // Set model edit state to true
    setModelEditSate({
      edge: true,
      title: `Edit - ${values.designation}`,
    });

    setIsCurrentCompany(values.isYourCurrentCompany);

    if (values.skills) {
      setEmploymentSkillDetails(values.skills.split(","));
    }

    // Open modal
    handleModalToggle("employment", values);
  };

  /**
   * Project Mnj's
   */
  const handleMnjProject = async (values) => {
    try {
      // Update profile
      const response = await skMnjProject({
        projects: [values],
      }).unwrap();

      // Update data in local
      if (response.data) {
        // Update timestamp
        dispatch(setUpdateTimeStamp());

        refetchMe();

        // Close modal
        handleModalToggle("project", initialValues.project);
      }
    } catch (error) {
      setError(error.data.message);

      console.error(error);
    }
  };

  const handleEditProjectModal = (values) => {
    // Set model edit state to true
    setModelEditSate({
      edge: true,
      title: `Edit - ${values.name}`,
    });

    // Open modal
    handleModalToggle("project", values);
  };

  const handleDeleteProject = async (projectId) => {
    try {

      setIsPageLoading(true);
      
      // Update profile
      const response = await skDeleteProject(projectId).unwrap();

      // Update timestamp
      dispatch(setUpdateTimeStamp());

      refetchMe();
      setIsPageLoading(false);

    } catch (error) {
      console.error(error);
      setPrjDltError(error.data.message);
      setIsPageLoading(false);
    }
  };

  /**
   * Handle CV Resume Upload
   *
   */
  const handleCVResumeUpload = async (resume) => {
    try {
      const uploadData = new FormData();
      uploadData.append("files", resume);

      // Only proceed with upload if resume exists
      if (resume) {
        const response = await skUploadAsset({
          profileId: loggedUserInfo?.profileId,
          uploadType: "resume",
          data: uploadData,
        }).unwrap();

        // Refetch me
        refetchMe();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCVResume = async () => {
    try {

      setIsPageLoading(true);

      const response = await skDeleteUploadAsset({
        profileId: loggedUserInfo?.profileId,
        uploadType: "resume",
      }).unwrap();

      // Refetch me
      refetchMe();
      setIsPageLoading(false);
    } catch (error) {
      console.error(error);
      setCVDltError(error.data.message);
      setIsPageLoading(false);
    }
  };

  const handleDownloadCVResume = async () => {
    try {
      const response = await triggerGetUploadAsset({
        profileId: loggedUserInfo?.profileId,
        uploadType: "resume",
      }).unwrap();
      const { data } = response;

      // Use response data to generate download link and trigger it
      if (data) {
        const relativePath = data.uploadPath;
        const fileName = data.uploadName;

        // Trigger download
        makeDownloadFile(relativePath, fileName);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [triggerSeSuggestEntity] = useLazySeSuggestEntityQuery();
  const [specialisationUnderEdType, setSpecialisationUnderEdType] = useState(
    []
  );
  const getSpecialisationUnderEdType = async (type) => {
    try {
      const response = await triggerSeSuggestEntity({
        type,
        category: "specialisation",
      }).unwrap();

      if (response) {
        // Format options based on skSearchTermsData
        const options = response.map((option) => ({
          value: option.termId,
          label: option.name,
        }));

        setSpecialisationUnderEdType(options);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2 className="main-title">My Resume</h2>

      <div className="candidates-profile-details border-20 mt-40">
        <div className="inner-card lg-mb-50">
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="title candidates-profile-details-title-22">
              Resume Attachment
            </h4>
            {myProfileData?.cvInfo && (
              <p>
                <span className="fw-500">Last updated on: </span>
                {formatDate(myProfileData?.cvInfo.updatedAt, "M d, Y")}
              </p>
            )}
          </div>
          <AlertErrorComponent errorMessage={errorMessageCVDltError} setError={setCVDltError} />
          <Formik
            initialValues={modelDetailsInitialValues.file}
            validationSchema={cvResumeValidationSchema}
            encType="multipart/form-data"
          >
            {({ values, setFieldValue, setFieldError, errors, touched }) => (
              <Form>
                {myProfileData?.cvInfo && (
                  <div className="dash-input-wrapper mb-20">
                    <div className="attached-file d-flex align-items-center justify-content-between mb-15">
                      <span>{myProfileData?.cvInfo.uploadName}</span>
                      <div className="d-flex align-items-center gap-3">
                        <span
                          className="remove-btn btn p-0 border-0"
                          onClick={handleDownloadCVResume}
                        >
                          <i className="bi bi-download fs-6"></i>
                        </span>
                        <span
                          className="remove-btn btn p-0 border-0"
                          onClick={handleDeleteCVResume}
                        >
                          <i className="bi bi-trash3 fs-6"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div className="d-flex align-items-center">
                  <div className="dash-btn-one rp-upload-btn position-relative me-3">
                    {!skUploadAssetLoading ? (
                      myProfileData?.cvInfo ? (
                        "Update CV"
                      ) : (
                        "Upload CV"
                      )
                    ) : (
                      <Spinner />
                    )}
                    <Input
                      type="file"
                      id="cv"
                      name="cv"
                      onChange={async (event) => {
                        const file = event.currentTarget.files[0];
                        if (file) {
                          // Set form field value
                          const response = await setFieldValue("cv", file);
                          if (!response.cv) {
                            // Trigger upload only if file is selected
                            handleCVResumeUpload(file);
                          }
                        }
                      }}
                      disabled={skUploadAssetLoading}
                    />
                  </div>
                  <small className={errors.cv ? "text-danger" : ""}>
                    {errors.cv ? errors.cv : "Upload file .pdf, .doc, .docx"}
                  </small>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className="candidates-profile-details border-20 mt-40">
        <div className="inner-card lg-mb-50">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="title mb-0 candidates-profile-details-title-22">
              Education
            </h4>
            <ModelButton
              className="dash-btn-two tran3s fs-5"
              text="Add"
              onClickEvent={() => handleModalToggle("education")}
            />
            <ModelWrapper
              title={modelEditSate.edge ? modelEditSate.title : "Add Education"}
              isOpen={modalStateConfigs.education}
              onClose={() => {
                handleModalToggle("education", initialValues.education);
                if (isExclusiveEdType) {
                  setIsExclusiveEdType(false);
                }
              }}
              initialValues={modelDetailsInitialValues.education}
              validationSchema={educationDetailsSchema}
              onSubmit={(values, actions) => {
                const dataToCreate = values;

                // filter empty field
                if (isExclusiveEdType) {
                  delete dataToCreate.specialisation;
                  delete dataToCreate.institute;
                } else {
                  delete dataToCreate.examBoard;
                }

                handleSubmit(
                  "education",
                  dataToCreate,
                  myProfileData.education
                );
              }}
              onDelete={handleDelete("education")}
              deleteById="educationId"
              isDelete={modelEditSate.edge}
              isLoading={skUpdateProfileLoading || skDeleteProfileEntityLoading}
              error={errorMessage}
            >
              <div
                className="dashboard-body bg-white m-0 p-0"
                style={{ minHeight: "auto" }}
              >
                <div className="mb-30">
                  <Field name="educationType">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.educationType &&
                          form.touched.educationType
                        }
                        isRequired
                      >
                        <FormLabel htmlFor="educationType">Education</FormLabel>
                        <JBSelect
                          placeholder="Select education"
                          options={educationTypeOptions}
                          onChange={(selectedOption) => {
                            // Formik expects the selected value to be passed to the handleChange function
                            form.handleChange({
                              target: {
                                name: "educationType",
                                value: selectedOption.value,
                              },
                            });

                            const isExclusiveEdType =
                              EXCLUSIVE_EDUCATION_TYPES.includes(
                                selectedOption.value
                              );

                            if (isExclusiveEdType) {
                              setIsExclusiveEdType(true);
                            }

                            if (!isExclusiveEdType) {
                              getSpecialisationUnderEdType(
                                getKeyByValue(
                                  EDUCATION_TYPES,
                                  selectedOption.value
                                )
                              );
                            }
                          }}
                          defaultValue={
                            form.values.educationType && [
                              {
                                value: form.values.educationType,
                                label: form.values.educationType,
                              },
                            ]
                          }
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              boxShadow:
                                form.errors.educationType &&
                                form.touched.educationType
                                  ? "0 0 0 1px #E53E3E !important"
                                  : "",
                            }),
                          }}
                          isDisabled={modelEditSate.edge}
                        />
                        <FormErrorMessage>
                          {form.errors.educationType}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </div>
                {isExclusiveEdType && (
                  <div className="mb-30">
                    <Field name="examBoard">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.examBoard && form.touched.examBoard
                          }
                          isRequired
                        >
                          <FormLabel htmlFor="examBoard">Board</FormLabel>
                          <JBSelect
                            placeholder="Select board"
                            options={examBoardOptions}
                            onChange={(selectedOption) => {
                              // Formik expects the selected value to be passed to the handleChange function
                              form.handleChange({
                                target: {
                                  name: "examBoard",
                                  value: selectedOption.value,
                                },
                              });
                            }}
                            defaultValue={
                              form.values.examBoard && [
                                {
                                  value: form.values.examBoard,
                                  label: form.values.examBoard,
                                },
                              ]
                            }
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                boxShadow:
                                  form.errors.examBoard &&
                                  form.touched.examBoard
                                    ? "0 0 0 1px #E53E3E !important"
                                    : "",
                              }),
                            }}
                          />
                          <FormErrorMessage>
                            {form.errors.examBoard}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </div>
                )}
                {!isExclusiveEdType && (
                  <div className="mb-30">
                    <Field name="specialisation">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.specialisation &&
                            form.touched.specialisation
                          }
                          isRequired
                        >
                          <FormLabel htmlFor="specialisation">Course</FormLabel>
                          <AsyncSelectWithFetch
                            placeholder="Select course"
                            taxonomy="specialisation"
                            selectedInput={form.values.specialisation}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                boxShadow:
                                  form.errors.specialisation &&
                                  form.touched.specialisation
                                    ? "0 0 0 1px #E53E3E !important"
                                    : "",
                              }),
                            }}
                            defaultOptions={specialisationUnderEdType}
                            isCreatable={specialisationUnderEdType.length}
                            noOptionsMessage={() => "No data found"}
                            onChange={(selectedOption) => {
                              // Formik expects the selected value to be passed to the handleChange function
                              form.handleChange({
                                target: {
                                  name: "specialisation",
                                  value: selectedOption.label,
                                },
                              });
                            }}
                          />
                          <FormErrorMessage>
                            {form.errors.specialisation}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </div>
                )}
                {!isExclusiveEdType && (
                  <div className="mb-30">
                    <Field name="institute">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.institute && form.touched.institute
                          }
                          isRequired
                        >
                          <FormLabel htmlFor="institute">Academy</FormLabel>
                          <AsyncSelectWithFetch
                            placeholder="Select academy"
                            taxonomy="institute"
                            selectedInput={form.values.institute}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                boxShadow:
                                  form.errors.institute &&
                                  form.touched.institute
                                    ? "0 0 0 1px #E53E3E !important"
                                    : "",
                              }),
                            }}
                            onChange={(selectedOption) => {
                              // Formik expects the selected value to be passed to the handleChange function
                              form.handleChange({
                                target: {
                                  name: "institute",
                                  value: selectedOption.label,
                                },
                              });
                            }}
                          />
                          <FormErrorMessage>
                            {form.errors.institute}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </div>
                )}
                <div className="mb-30">
                  <FormControl isRequired>
                    <FormLabel>Course Duration</FormLabel>
                    <div className="row">
                      <div className="col-sm-6">
                        <Field name="startYear">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.startYear && form.touched.startYear
                              }
                            >
                              <JBSelect
                                options={supportedStartYearsOptions}
                                placeholder="Start Year"
                                onChange={(selectedOption) => {
                                  // Formik expects the selected value to be passed to the handleChange function
                                  form.handleChange({
                                    target: {
                                      name: "startYear",
                                      value: selectedOption.value,
                                    },
                                  });
                                }}
                                defaultValue={
                                  form.values.startYear && [
                                    {
                                      value: form.values.startYear,
                                      label: form.values.startYear,
                                    },
                                  ]
                                }
                                styles={{
                                  control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    boxShadow:
                                      form.errors.startYear &&
                                      form.touched.startYear
                                        ? "0 0 0 1px #E53E3E !important"
                                        : "",
                                  }),
                                }}
                              />
                              <FormErrorMessage>
                                {form.errors.startYear}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </div>
                      <div className="col-sm-6">
                        <Field name="endYear">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.endYear && form.touched.endYear
                              }
                            >
                              <JBSelect
                                options={supportedEndYearsOptions}
                                placeholder="End Year"
                                onChange={(selectedOption) => {
                                  // Formik expects the selected value to be passed to the handleChange function
                                  form.handleChange({
                                    target: {
                                      name: "endYear",
                                      value: selectedOption.value,
                                    },
                                  });
                                }}
                                defaultValue={
                                  form.values.endYear && [
                                    {
                                      value: form.values.endYear,
                                      label: form.values.endYear,
                                    },
                                  ]
                                }
                                styles={{
                                  control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    boxShadow:
                                      form.errors.endYear &&
                                      form.touched.endYear
                                        ? "0 0 0 1px #E53E3E !important"
                                        : "",
                                  }),
                                }}
                              />
                              <FormErrorMessage>
                                {form.errors.endYear}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </div>
                    </div>
                  </FormControl>
                </div>
              </div>
            </ModelWrapper>
          </div>
          {!myProfileData?.education?.length ? (
            <WhatItDO fieldName="education" />
          ) : (
            <div className="time-line-data position-relative pt-15">
              {myProfileData.education.map((education, index) => (
                <div
                  className="info position-relative"
                  key={education.educationId}
                >
                  <div className="numb fw-500 rounded-circle d-flex align-items-center justify-content-center">
                    {index + 1}
                  </div>
                  <div className="text_1 fw-500 d-flex align-items-center">
                    {education.institute || education.examBoard}
                    <span
                      className="rp-edit"
                      onClick={() => handleEditEducationModal(education)}
                    >
                      <i className="bi bi-pencil"></i>
                    </span>
                  </div>
                  <h4>{education.specialisation || education.educationType}</h4>
                  {education?.description && (
                    <p className="mb-0">{education?.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="candidates-profile-details border-20 mt-40">
        <div className="inner-card lg-mb-50">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="title mb-0 candidates-profile-details-title-22">
              Key skills
            </h4>
            <ModelButton
              className="dash-btn-two tran3s fs-5"
              text="Add"
              onClickEvent={() => handleModalToggle("skills")}
            />
            <ModelWrapper
              title="Key skills"
              isOpen={modalStateConfigs.skills}
              onClose={() => {
                handleModalToggle("skills", initialValues.skills);

                if (myProfileData?.skills) {
                  setSkillDetails(myProfileData?.skills?.split(","));
                }
              }}
              initialValues={{
                skills: skillDetails,
              }}
              validationSchema={skillDetailsSchema}
              onSubmit={(values, actions) => handleSkillsSubmit(values)}
              isLoading={skUpdateProfileLoading}
              error={errorMessage}
            >
              <div
                className="dashboard-body bg-white m-0 p-0"
                style={{ minHeight: "auto" }}
              >
                <div>
                  <div className="dash-input-wrapper">
                    <FormLabel htmlFor="skills">Skills</FormLabel>
                  </div>
                  <Field name="skills">
                    {({ field, form }) => (
                      <>
                        <FormControl
                          isInvalid={form.errors.skills && form.touched.skills}
                        >
                          <AsyncSelectWithFetch
                            // forwardRef={skillRef}
                            placeholder="Enter your area of expertise"
                            taxonomy="skill"
                            controlShouldRenderValue={false}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                boxShadow:
                                  form.errors.skills && form.touched.skills
                                    ? "0 0 0 1px #E53E3E !important"
                                    : "",
                              }),
                            }}
                            onChange={(selectedOption, { action }) => {
                              // Formik expects the selected value to be passed to the handleChange function
                              if (
                                !skillDetails.includes(selectedOption.label)
                              ) {
                                setSkillDetails([
                                  ...skillDetails,
                                  selectedOption.label,
                                ]);
                                form.handleChange({
                                  target: {
                                    name: "skills",
                                    value: [
                                      ...skillDetails,
                                      selectedOption.label,
                                    ],
                                  },
                                });
                              }
                            }}
                          />
                          <FormErrorMessage>
                            {form.errors.skills}
                          </FormErrorMessage>
                        </FormControl>
                        {skillDetails.length > 0 && (
                          <div className="dash-input-wrapper">
                            <div className="skills-wrapper px-0">
                              <ul className="style-none d-flex flex-wrap align-items-center">
                                {skillDetails.map((skill) => (
                                  <li className="is_tag" key={skill}>
                                    <button
                                      onClick={() => {
                                        const filteredSkills =
                                          skillDetails.filter(
                                            (s) => s !== skill
                                          );

                                        setSkillDetails(filteredSkills);
                                        form.handleChange({
                                          target: {
                                            name: "skills",
                                            value: filteredSkills,
                                          },
                                        });
                                      }}
                                    >
                                      {skill} <i className="bi bi-x"></i>
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
              </div>
            </ModelWrapper>
          </div>
          {myProfileData?.skills?.length ? (
            <ul className="style-none skill-tags d-flex flex-wrap pb-15 mt-30">
              {myProfileData?.skills?.split(",").map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          ) : (
            <WhatItDO fieldName="skills" />
          )}
        </div>
      </div>

      <div className="candidates-profile-details border-20 mt-40">
        <div className="inner-card lg-mb-50">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="title mb-0 candidates-profile-details-title-22">
              Employment
            </h4>
            <ModelButton
              className="dash-btn-two tran3s fs-5"
              text="Add"
              onClickEvent={() => {
                handleModalToggle("employment");
                setEmploymentSkillDetails([]);
              }}
            />
            <ModelWrapper
              title={
                modelEditSate.edge ? modelEditSate.title : "Add Employment"
              }
              isOpen={modalStateConfigs.employment}
              onClose={() =>
                handleModalToggle("employment", initialValues.employment)
              }
              initialValues={modelDetailsInitialValues.employment}
              validationSchema={employmentDetailsSchema}
              onSubmit={(values, actions) => {
                const cloneValues = { ...values };

                if (Array.isArray(cloneValues.skills)) {
                  cloneValues.skills = cloneValues.skills.join(",");
                }

                if (cloneValues.startYear && cloneValues.startMonth) {
                  cloneValues.startDate = createDate(
                    cloneValues.startYear,
                    cloneValues.startMonth
                  );
                }

                if (
                  !cloneValues.isYourCurrentCompany &&
                  cloneValues.endYear &&
                  cloneValues.endMonth
                ) {
                  cloneValues.endDate = createDate(
                    cloneValues.endYear,
                    cloneValues.endMonth
                  );
                }

                delete cloneValues.startYear;
                delete cloneValues.endYear;
                delete cloneValues.endMonth;
                delete cloneValues.startMonth;

                handleSubmit(
                  "employment",
                  cloneValues,
                  myProfileData.employment
                );
              }}
              onDelete={handleDelete("employment")}
              deleteById="employmentId"
              isDelete={modelEditSate.edge}
              isLoading={skUpdateProfileLoading || skDeleteProfileEntityLoading}
              error={errorMessage}
            >
              <div
                className="dashboard-body bg-white m-0 p-0"
                style={{ minHeight: "auto" }}
              >
                <Field name="isYourCurrentCompany">
                  {({ field, form }) => (
                    <FormControl
                      id="isYourCurrentCompany"
                      mb={4}
                      isInvalid={form.errors.isYourCurrentCompany}
                    >
                      <FormLabel>Is this your current employment?</FormLabel>
                      <RadioGroup
                        value={form.values.isYourCurrentCompany ? "yes" : "no"}
                        onChange={(value) => {
                          setIsCurrentCompany(value === "yes");
                          form.setFieldValue(
                            "isYourCurrentCompany",
                            value === "yes"
                          );
                        }}
                      >
                        <HStack spacing="24px">
                          <Radio value="yes">Yes</Radio>
                          <Radio value="no">No</Radio>
                        </HStack>
                      </RadioGroup>
                    </FormControl>
                  )}
                </Field>
                <div className="mb-30">
                  <Field name="company">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.company && form.touched.company}
                        isRequired
                      >
                        <FormLabel htmlFor="company">Company</FormLabel>
                        <AsyncSelectWithFetch
                          placeholder="Type your company"
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
                </div>
                <div className="mb-30">
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
                          placeholder="Type your designation"
                          taxonomy="designation"
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
                <div className="mb-30">
                  <FormControl isRequired>
                    <FormLabel htmlFor="startYear">Joining date</FormLabel>
                    <div className="row">
                      <div className="col-sm-6">
                        <Field name="startYear">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.startYear && form.touched.startYear
                              }
                            >
                              <JBSelect
                                options={supportedStartYearsOptions}
                                placeholder="Years"
                                onChange={(selectedOption) => {
                                  // Formik expects the selected value to be passed to the handleChange function
                                  form.handleChange({
                                    target: {
                                      name: "startYear",
                                      value: selectedOption.value,
                                    },
                                  });
                                }}
                                styles={{
                                  control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    boxShadow:
                                      form.errors.startYear &&
                                      form.touched.startYear
                                        ? "0 0 0 1px #E53E3E !important"
                                        : "",
                                  }),
                                }}
                                defaultValue={
                                  form.values.startYear && [
                                    {
                                      value: form.values.startYear,
                                      label: form.values.startYear,
                                    },
                                  ]
                                }
                              />
                              <FormErrorMessage>
                                {form.errors.startYear}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </div>
                      <div className="col-sm-6">
                        <Field name="startMonth">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.startMonth &&
                                form.touched.startMonth
                              }
                            >
                              <JBSelect
                                options={
                                  form.values.startYear ===
                                  new Date().getFullYear()
                                    ? supportedMonthsOptions.filter(
                                        (month) =>
                                          month.value <=
                                          new Date().getMonth() + 1
                                      )
                                    : supportedMonthsOptions
                                }
                                placeholder="Months"
                                onChange={(selectedOption) => {
                                  // Formik expects the selected value to be passed to the handleChange function
                                  form.handleChange({
                                    target: {
                                      name: "startMonth",
                                      value: selectedOption.value,
                                    },
                                  });
                                }}
                                value={supportedMonthsOptions.filter(
                                  ({ value }) =>
                                    value === form.values.startMonth
                                )}
                                styles={{
                                  control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    boxShadow:
                                      form.errors.startMonth &&
                                      form.touched.startMonth
                                        ? "0 0 0 1px #E53E3E !important"
                                        : "",
                                  }),
                                }}
                              />
                              <FormErrorMessage>
                                {form.errors.startMonth}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </div>
                    </div>
                  </FormControl>
                </div>
                {!isCurrentCompany && (
                  <div className="mb-30">
                    <FormControl isRequired>
                      <FormLabel htmlFor="endYear">Worked till</FormLabel>
                      <div className="row">
                        <div className="col-sm-6">
                          <Field name="endYear">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.endYear && form.touched.endYear
                                }
                                isRequired
                              >
                                <JBSelect
                                  options={supportedStartYearsOptions}
                                  placeholder="Years"
                                  onChange={(selectedOption) => {
                                    // Formik expects the selected value to be passed to the handleChange function
                                    form.handleChange({
                                      target: {
                                        name: "endYear",
                                        value: selectedOption.value,
                                      },
                                    });
                                  }}
                                  styles={{
                                    control: (baseStyles, state) => ({
                                      ...baseStyles,
                                      boxShadow:
                                        form.errors.endYear &&
                                        form.touched.endYear
                                          ? "0 0 0 1px #E53E3E !important"
                                          : "",
                                    }),
                                  }}
                                  defaultValue={
                                    form.values.endYear && [
                                      {
                                        value: form.values.endYear,
                                        label: form.values.endYear,
                                      },
                                    ]
                                  }
                                />
                                <FormErrorMessage>
                                  {form.errors.endYear}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </div>
                        <div className="col-sm-6">
                          <Field name="endMonth">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.endMonth && form.touched.endMonth
                                }
                              >
                                <JBSelect
                                  options={
                                    form.values.endYear ===
                                    new Date().getFullYear()
                                      ? supportedMonthsOptions.filter(
                                          (month) =>
                                            month.value <=
                                            new Date().getMonth() + 1
                                        )
                                      : supportedMonthsOptions
                                  }
                                  placeholder="Months"
                                  onChange={(selectedOption) => {
                                    // Formik expects the selected value to be passed to the handleChange function
                                    form.handleChange({
                                      target: {
                                        name: "endMonth",
                                        value: selectedOption.value,
                                      },
                                    });
                                  }}
                                  value={supportedMonthsOptions.filter(
                                    ({ value }) =>
                                      value === form.values.endMonth
                                  )}
                                  styles={{
                                    control: (baseStyles, state) => ({
                                      ...baseStyles,
                                      boxShadow:
                                        form.errors.endMonth &&
                                        form.touched.endMonth
                                          ? "0 0 0 1px #E53E3E !important"
                                          : "",
                                    }),
                                  }}
                                />
                                <FormErrorMessage>
                                  {form.errors.endMonth}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </div>
                      </div>
                    </FormControl>
                  </div>
                )}
                <div className="mb-30">
                  <Field name="skills">
                    {({ field, form }) => (
                      <>
                        <FormControl
                          isInvalid={form.errors.skills && form.touched.skills}
                          isRequired
                        >
                          <FormLabel htmlFor="skills">Skills</FormLabel>
                          <AsyncSelectWithFetch
                            // forwardRef={skillRef}
                            placeholder="Enter your area of Expertise"
                            taxonomy="skill"
                            controlShouldRenderValue={false}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                boxShadow:
                                  form.errors.skills && form.touched.skills
                                    ? "0 0 0 1px #E53E3E !important"
                                    : "",
                              }),
                            }}
                            onChange={(selectedOption) => {
                              // Formik expects the selected value to be passed to the handleChange function
                              if (
                                !employmentSkillDetails.includes(
                                  selectedOption.label
                                )
                              ) {
                                setEmploymentSkillDetails([
                                  ...employmentSkillDetails,
                                  selectedOption.label,
                                ]);
                                form.handleChange({
                                  target: {
                                    name: "skills",
                                    value: [
                                      ...employmentSkillDetails,
                                      selectedOption.label,
                                    ],
                                  },
                                });
                              }
                            }}
                          />
                          <FormErrorMessage>
                            {form.errors.skills}
                          </FormErrorMessage>
                        </FormControl>
                        {employmentSkillDetails.length > 0 && (
                          <div className="dash-input-wrapper">
                            <div className="skills-wrapper px-0">
                              <ul className="style-none d-flex flex-wrap align-items-center">
                                {employmentSkillDetails.map((skill) => (
                                  <li className="is_tag" key={skill}>
                                    <button
                                      onClick={() => {
                                        const filteredSkills =
                                          employmentSkillDetails.filter(
                                            (s) => s !== skill
                                          );

                                        setEmploymentSkillDetails(
                                          filteredSkills
                                        );
                                        form.handleChange({
                                          target: {
                                            name: "skills",
                                            value: filteredSkills,
                                          },
                                        });
                                      }}
                                    >
                                      {skill} <i className="bi bi-x"></i>
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
                <div className="dash-input-wrapper">
                  <FormLabel htmlFor="description">Job Profile</FormLabel>
                  <Field name="description">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.description && form.touched.description
                        }
                      >
                        <Textarea
                          placeholder="Type here..."
                          id="description"
                          name="description"
                          onChange={form.handleChange}
                          value={form.values.description}
                        />
                        <FormErrorMessage>
                          {form.errors.description}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </div>
              </div>
            </ModelWrapper>
          </div>
          {!myProfileData?.employment?.length ? (
            <WhatItDO fieldName="employment" />
          ) : (
            <div className="time-line-data position-relative pt-15">
              {myProfileData.employment.map((employment, index) => (
                <div
                  className="info position-relative"
                  key={employment.employmentId}
                >
                  <div className="numb fw-500 rounded-circle d-flex align-items-center justify-content-center">
                    {index + 1}
                  </div>
                  <div className="text_1 fw-500 d-flex align-items-center">
                    {formatDate(employment.startDate, "M Y")} -{" "}
                    {employment.isYourCurrentCompany
                      ? "Present"
                      : formatDate(employment.endDate, "M Y")}
                    <span
                      className="rp-edit"
                      onClick={() => {
                        const { startDate, endDate, ...restEmploymentData } =
                          employment;

                        const { year: startYear, month: startMonth } =
                          getDateComponents(startDate);

                        const dataToPass = {
                          ...restEmploymentData,
                          startYear,
                          startMonth,
                        };

                        const { year: endYear, month: endMonth } =
                          getDateComponents(endDate);

                        dataToPass.endYear = endYear || null;
                        dataToPass.endMonth = endMonth || null;

                        setIsCurrentCompany(employment.isYourCurrentCompany);

                        handleEditEmploymentModal(dataToPass);

                        // handleModalToggle("employment");
                      }}
                    >
                      <i className="bi bi-pencil"></i>
                    </span>
                  </div>
                  <h4 className="mb-0">{`${employment.designation} (${employment.company})`}</h4>
                  {employment?.skills && (
                    <span>
                      <span className="fw-500 text-dark">Skills: </span>
                      {employment.skills}
                    </span>
                  )}
                  {employment?.description && (
                    <p className="mb-0">{employment.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="candidates-profile-details border-20 mt-40">
        <div className="inner-card lg-mb-50">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="title mb-0 candidates-profile-details-title-22">
              Projects
            </h4>
            <ModelButton
              className="dash-btn-two tran3s fs-5"
              text="Add"
              onClickEvent={() => handleModalToggle("project")}
            />
            <ModelWrapper
              title={modelEditSate.edge ? modelEditSate.title : "Add Project"}
              isOpen={modalStateConfigs.project}
              onClose={() => handleModalToggle("project", initialValues.project)}
              initialValues={modelDetailsInitialValues.project}
              validationSchema={projectDetailsValidationSchema}
              onSubmit={handleMnjProject}
              isLoading={skMnjProjectLoading}
              error={errorMessage}
            >
              <div
                className="dashboard-body bg-white m-0 p-0"
                style={{ minHeight: "auto" }}
              >
                <div className="dash-input-wrapper mb-25 int-x-20">
                  <Field name="name">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                        isRequired
                      >
                        <FormLabel htmlFor="name">Project Name</FormLabel>
                        <Input
                          type="text"
                          placeholder="Enter your Project Name"
                          id="name"
                          name="name"
                          onChange={form.handleChange}
                          value={form.values.name}
                          required={false}
                        />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </div>
                <div className="dash-input-wrapper mb-25 int-x-20">
                  <Field name="url">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.url && form.touched.url}
                        isRequired
                      >
                        <FormLabel htmlFor="url">Link</FormLabel>
                        <Input
                          type="url"
                          placeholder="Enter your Project URL"
                          id="url"
                          name="url"
                          onChange={form.handleChange}
                          value={form.values.url}
                          required={false}
                        />
                        <FormErrorMessage>{form.errors.url}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </div>
                <div className="dash-input-wrapper mb-25 int-x-20">
                  <FormLabel htmlFor="imageURL">Project Image URL</FormLabel>
                  <Field name="imageURL">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.imageURL && form.touched.imageURL
                        }
                      >
                        <Input
                          type="url"
                          placeholder="Enter your Project Image URL"
                          id="imageURL"
                          name="imageURL"
                          onChange={form.handleChange}
                          value={form.values.imageURL}
                          required={false}
                        />
                        <FormErrorMessage>
                          {form.errors.imageURL}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </div>
              </div>
            </ModelWrapper>
          </div>
          {!myProfileData?.projects?.length ? (
            <WhatItDO fieldName="project" />
          ) : (
            <div className="row">
              <AlertErrorComponent errorMessage={errorMessagePrjDltError} setError={setPrjDltError}  />
              {myProfileData?.projects.map((project, index) => (
                <div className="col-lg-3 col-6 mb-25" key={project.projectId}>
                  <div className="candidate-portfolio-block position-relative mb-2">
                    <Image
                      src={project.imageURL}
                      fallbackSrc={`${SITE_DIR_URI}images/198.png`}
                      className="lazy-img w-100"
                    />
                    <span
                      className="cursor-pointer remove-portfolio-item rounded-circle d-flex align-items-center justify-content-center tran3s bg-white"
                      onClick={() => handleDeleteProject(project.projectId)}
                    >
                      <i className="bi bi-x"></i>
                    </span>
                  </div>
                  <div className="text_1 fw-500 d-flex align-items-center justify-content-center">
                    <a href={project.url} target="_blank" rel="noopener noreferrer">{project.name}</a>
                    <span
                      className="rp-edit"
                      onClick={() => handleEditProjectModal(project)}
                    >
                      <i className="bi bi-pencil"></i>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Index;
