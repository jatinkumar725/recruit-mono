import React, { useEffect, useState } from "react";

import { NavLink, useNavigate, useOutletContext, useSearchParams } from "react-router-dom";

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Checkbox,
} from "@chakra-ui/react";
import { CloseButton } from "@chakra-ui/react";

import { Formik, Form, Field, FieldArray, getIn } from "formik";
import * as Yup from "yup";

import JBSelect from "../../../utils/JBSelect";
import AsyncSelectWithFetch from "../../../utils/AsyncJBSelect";
import {
  EDUCATION_TYPES,
  EMPLOYMENT_TYPES,
  JOB_OPENINGS,
  JOB_TYPES,
  SUPPORTED_EXPERIENCE_YEARS,
  SUPPORTED_JOB_VALIDITY_PERIOD,
} from "../../../constants/siteConstants";
import {
  useLazyRcGetSingleJobPostQuery,
  useRcDeleteEntityUnderPostMutation,
  useRcUpdateSingleJobPostMutation,
} from "../../../state/recruiter/post/api";
import Editor from "../../../components/Editor";
// import { getKeyByValue } from "../../../utils/objects";
import { AlertErrorComponent, useError } from "../../../components/Error/Para";
import { APP_ROUTES } from "../../../constants/routeConstant";
import { useLazySeSuggestEntityQuery } from "../../../state/site/suggester/api";

const ErrorMessage = ({ name }) => (
  <Field
    name={name}
    render={({ form }) => {
      const error = getIn(form.errors, name);
      const touch = getIn(form.touched, name);
      return touch && error ? error : null;
    }}
  />
);

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

const employmentTypeOptions = Object.entries(EMPLOYMENT_TYPES).map((employmentType) => {
  return {
    value: employmentType[1],
    label: employmentType[0],
  };
});

const jobTypeOptions = Object.entries(JOB_TYPES).map((jobType) => {
  return {
    value: jobType[1],
    label: jobType[0],
  };
});

const jobOpeningOptions = Object.entries(JOB_OPENINGS).map((JOB_OPENING) => {
  return {
    value: parseInt(JOB_OPENING[0]),
    label: JOB_OPENING[0],
  };
});

const jobValidityOptions = Object.values(SUPPORTED_JOB_VALIDITY_PERIOD).map(
  (validity) => {
    return {
      value: validity,
      label: validity,
    };
  }
);

/**
 * Yup Validations
 */

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Job Title is required")
    .max(200, "Title must be at most 200 characters long"),
  description: Yup.string().required("Job Description is required"),
  designation: Yup.string().required("Job Category is required"),
  expireAfter: Yup.string().required("Job validity is required"),
  companyDescription: Yup.string().required("Company Description is required"),
  company: Yup.string().required("Company is required"),
  jobType: Yup.string().required("Job Type is required"),
  totalOpening: Yup.number().required("Total opening is required"),
  minimumExperience: Yup.number()
    .min(0, "Minimum experience must be a non-negative number")
    .max(
      Yup.ref("maximumExperience"),
      "Minimum experience must be less than maximum experience"
    )
    .required("Minimum Experience is required"),
  maximumExperience: Yup.number()
    .min(
      Yup.ref("minimumExperience"),
      "Maximum experience must be greater than minimum experience"
    )
    .max(31, "Maximum experience must be at most 31 years")
    .required("Maximum Experience is required"),
  skills: Yup.array()
    .of(Yup.string())
    .min(1, "Please specify atleast one Key Skill"),
  location: Yup.array()
    .of(
      Yup.object().shape({
        city: Yup.string().required("Please specify work city"),
        pincode: Yup.string().required("Please specify work pincode"),
      })
    )
    .required("Work location is required")
    .min(1, "Please specify atleast one address"),
  industry: Yup.string().required("Industry is required"),
  label: Yup.string().required("Salary label is required"),
  minimumSalary: Yup.number().required("Minimum Salary is required"),
  maximumSalary: Yup.number().required("Maximum Salary is required"),
  hideSalary: Yup.boolean(),
  reqUg: Yup.boolean(),
  ugDetails: Yup.array().when("reqUg", {
    is: false,
    then: () =>
      Yup.array()
        .of(
          Yup.string().required(
            "Please specify at least one under graduation qualification"
          )
        )
        .min(1, "Please specify at least one under graduation qualification"),
    otherwise: () => Yup.array().notRequired(), // If reqUg is true, ugDetails can be empty or absent
  }),
  pgDetails: Yup.array().of(Yup.string()).optional(),
  ppgDetails: Yup.array().of(Yup.string()).optional(),
});

/**
 * Initial Values
 *
 */
const initialValues = {
  title: "",
  description: "",
  designation: "",
  expireAfter: "",
  employmentType: "",
  jobType: "",
  totalOpening: "",
  minimumExperience: "",
  maximumExperience: "",
  skills: "",
  industry: "",
  label: "",
  minimumSalary: "",
  maximumSalary: "",
  hideSalary: false,
  location: [
    {
      city: "",
      pincode: "",
    },
  ],
  company: "",
  companyDescription: "",
  reqUg: false,
  ugDetails: [],
  pgDetails: [],
  ppgDetails: [],
};

const Index = () => {

  const [isPageLoading, setIsPageLoading] = useOutletContext();

  const navigate = useNavigate();

  const [errorMessage, setError] = useError();

  // Search Params
  const [searchParams] = useSearchParams();

  // Get post id
  const postId = searchParams.get("postId");

  // Mutations
  const [rcUpdateSinglePost, { isLoading: isRcUpdateSinglePostLoading }] =
    useRcUpdateSingleJobPostMutation();
  const [rcGetSinglePostTrigger] = useLazyRcGetSingleJobPostQuery();
  const [
    rcDeleteEntityUnderPost,
    { isLoading: isRcDeleteEntityUnderPostLoading },
  ] = useRcDeleteEntityUnderPostMutation();

  // post state management
  const [postDataToEdit, setPostDataToEdit] = useState(initialValues);

  // Modify state to manage multiple skills
  const [skillDetails, setSkillDetails] = useState([]);

  // Modify state to manage multiple education
  const [educationDetails, setEducationDetails] = useState({
    ug: "",
    pg: "",
    ppg: "",
  });

  const [graduationNotRequired, setGraduationNotRequired] = useState(false);

  const handleGraduationNotRequiredChange = (event, handleChange) => {
    setGraduationNotRequired(event.target.checked);
    handleChange(event); // This is to handle the Formik field value change
  };

  // Modify state to manage multiple city and pincode fields
  const [addressDetails, setAddressDetails] = useState([]);

  // Populate post data to states
  useEffect(() => {
    if (postId) {
      const getSinglePost = async (postId) => {

        setIsPageLoading(true);

        const response = await rcGetSinglePostTrigger(postId);
        const postData = { ...response.data };

        // Delete
        // delete postData.postId;
        delete postData.addedBy;
        delete postData.updatedBy;
        delete postData.isActive;
        delete postData.isDeleted;
        delete postData.isFeatured;
        delete postData.postDate;
        delete postData.updatedAt;
        delete postData.viewCount;
        delete postData.totalApplicants;
        delete postData.expireAfterDate;
        delete postData.jdUrl;

        let {
          skills,
          education,
          salaryDetails,
          location,
          companyDescription,
          description,
          ...restData
        } = postData;

        // Re-build skills
        const skillsArray = skills.split(",");

        // Re-build educational details
        const reqUg = education?.reqUg || false;
        const ugArray = education?.ug?.split(",") || [];
        const pgArray = education?.pg?.split(",") || [];
        const ppgArray = education?.ppg?.split(",") || [];

        // Re-build salary details
        const salary = {
          label: salaryDetails.label,
          hideSalary: salaryDetails.hideSalary,
          minimumSalary: salaryDetails.minimum,
          maximumSalary: salaryDetails.maximum,
        };

        // Re-build location
        if (!location.length) {
          location = [
            {
              locatinId: "-1",
              city: "",
              pincode: "",
            },
          ];
        }

        // Re-build description
        if (!description) {
          description = "";
        }

        // Re-build company description
        if (!companyDescription) {
          companyDescription = "";
        }

        setAddressDetails(location);

        setSkillDetails(skillsArray);

        setGraduationNotRequired(reqUg);

        setEducationDetails({
          ug: ugArray,
          pg: pgArray,
          ppg: ppgArray,
        });

        setPostDataToEdit({
          ...restData,
          ...salary,
          location,
          skills: skillsArray,
          companyDescription,
          description,
          reqUg,
          ugDetails: ugArray,
          pgDetails: pgArray,
          ppgDetails: ppgArray,
        });

        setIsPageLoading(false);

      };

      getSinglePost(postId);
    }
  }, [postId]);

  // Populate education field options
  const [triggerSeSuggestEntity] = useLazySeSuggestEntityQuery();
  const [specialisationUnderEdType, setSpecialisationUnderEdType] = useState({
    ug: [],
    pg: [],
    ppg: [],
  });

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

        return options;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const renderValuesEdType = async () => {

      const edTypeEntries = Object.keys(EDUCATION_TYPES);

      const spcUnderEd = {
        ug: [],
        pg: [],
        ppg: [],
      };
      
      edTypeEntries.forEach(async edType => {
        spcUnderEd[edType] = await getSpecialisationUnderEdType(edType);
      });
      
      setSpecialisationUnderEdType(spcUnderEd);
    };

    renderValuesEdType();
  }, []);

  /**
   * Handle update job post
   */
  const handleUpdateJobPost = async (values) => {
    try {
      const {
        skills,
        label,
        hideSalary,
        minimumSalary,
        maximumSalary,
        ugDetails,
        pgDetails,
        ppgDetails,
        reqUg,
        ...restData
      } = values;

      // Re-build skills
      const skillsString = skills.join(",");

      // Re-build total opening
      const totalOpening = parseInt(values.totalOpening);

      // Re-build salary
      const salaryDetails = {
        label,
        hideSalary: hideSalary,
        minimum: minimumSalary,
        maximum: maximumSalary,
      };

      // Re-build education
      const education = {
        reqUg: graduationNotRequired,
      };

      if (!graduationNotRequired) {
        education.ug = ugDetails.join(",");
      }

      if (!graduationNotRequired && pgDetails.length) {
        education.pg = pgDetails.join(",");
      }

      if (!graduationNotRequired && ppgDetails.length) {
        education.ppg = ppgDetails.join(",");
      }

      const dataToUpdate = {
        ...restData,
        totalOpening,
        salaryDetails,
        skills: skillsString,
        education,
        location: addressDetails,
      };

      const response = await rcUpdateSinglePost(dataToUpdate).unwrap();

      if (response.data) {
        //? navigate("/recruit/dashboard/jobs");
        navigate("/recruit/dashboard/jobs");
      }
    } catch (error) {
      const editPostErrorMessage = error.data.message;
      setError(editPostErrorMessage);

      console.error("error", error);
    }
  };

  /**
   * Handle delete entity under job post
   */
  const handleDeleteEntity = async (model, entityId) => {
    try {
      // Update profile
      const response = await rcDeleteEntityUnderPost({
        postId,
        entity: model,
        entityId,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="position-relative">
      <h2 className="main-title">Edit Job</h2>

      <div className="bg-white card-box border-20">
        <h4 className="dash-title-three">Job Details</h4>
        <Formik
          enableReinitialize={true}
          initialValues={postDataToEdit}
          validationSchema={validationSchema}
          onSubmit={handleUpdateJobPost}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <Form id="edit-post-job-id" onSubmit={handleSubmit}>
              <Field name="title">
                {({ field }) => (
                  <FormControl
                    mb="30px"
                    isInvalid={errors.title && touched.title}
                    isRequired
                  >
                    <FormLabel htmlFor="title">Job Title</FormLabel>
                    <Input
                      {...field}
                      required={false}
                      id="title"
                      placeholder="Enter job title"
                    />
                    <FormErrorMessage position="absolute">
                      {errors.title}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <div className="mb-30">
                <Field name="description">
                  {({ field }) => (
                    <FormControl
                      mb="30px"
                      isInvalid={errors.description && touched.description}
                      isRequired
                    >
                      <FormLabel htmlFor="description">
                        Job Description
                      </FormLabel>
                      <Editor
                        editorState={values.description}
                        handleChange={(value) => {
                          handleChange({
                            target: {
                              name: "description",
                              value: value,
                            },
                          });
                        }}
                      />
                      <FormErrorMessage position="absolute">
                        {errors.description}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </div>
              <div className="row align-items-end">
                <div className="col-md-6 mb-30">
                  {values.designation && (
                    <Field name="designation">
                      {({ field }) => (
                        <FormControl
                          isInvalid={errors.designation && touched.designation}
                          isRequired
                        >
                          <FormLabel htmlFor="designation">
                            Designation
                          </FormLabel>
                          <AsyncSelectWithFetch
                            placeholder="Enter job role"
                            taxonomy="designation"
                            selectedInput={values.designation}
                            // openMenuOnClick={false}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                boxShadow:
                                  errors.designation && touched.designation
                                    ? "0 0 0 1px #E53E3E !important"
                                    : "",
                                height: 42,
                              }),
                            }}
                            onChange={(selectedOption) => {
                              // Formik expects the selected value to be passed to the handleChange function
                              handleChange({
                                target: {
                                  name: "designation",
                                  value: selectedOption.label,
                                },
                              });
                            }}
                          />
                          <FormErrorMessage position="absolute">
                            {errors.designation}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  )}
                </div>
                <div className="col-md-6 mb-30">
                  {postDataToEdit.employmentType && (
                    <Field name="employmentType">
                      {({ field }) => (
                        <FormControl
                          isInvalid={errors.employmentType && touched.employmentType}
                          isRequired
                        >
                          <FormLabel htmlFor="employmentType">Employment Type</FormLabel>
                          <JBSelect
                            placeholder="Select employment type"
                            value={employmentTypeOptions.filter(
                              (employmentType) => values.employmentType === employmentType.value
                            )}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                boxShadow:
                                  errors.employmentType && touched.employmentType
                                    ? "0 0 0 1px #E53E3E !important"
                                    : "",
                              }),
                            }}
                            onChange={(selectedOption) => {
                              // Formik expects the selected value to be passed to the handleChange function
                              handleChange({
                                target: {
                                  name: "employmentType",
                                  value: selectedOption.value,
                                },
                              });
                            }}
                            options={employmentTypeOptions}
                          />
                          <FormErrorMessage position="absolute">
                            {errors.employmentType}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  )}
                </div>
                <div className="col-md-6">
                  {postDataToEdit.jobType && (
                    <Field name="jobType">
                      {({ field }) => (
                        <FormControl
                          isInvalid={errors.jobType && touched.jobType}
                          isRequired
                        >
                          <FormLabel htmlFor="jobType">Job Type</FormLabel>
                          <JBSelect
                            placeholder="Select job type"
                            value={jobTypeOptions.filter(
                              (jobType) => values.jobType === jobType.value
                            )}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                boxShadow:
                                  errors.jobType && touched.jobType
                                    ? "0 0 0 1px #E53E3E !important"
                                    : "",
                              }),
                            }}
                            onChange={(selectedOption) => {
                              // Formik expects the selected value to be passed to the handleChange function
                              handleChange({
                                target: {
                                  name: "jobType",
                                  value: selectedOption.value,
                                },
                              });
                            }}
                            options={jobTypeOptions}
                          />
                          <FormErrorMessage position="absolute">
                            {errors.jobType}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  )}
                </div>
                <div className="col-md-4">
                  {postDataToEdit.expireAfter && (
                    <Field name="expireAfter">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={errors.expireAfter && touched.expireAfter}
                          isRequired
                        >
                          <FormLabel htmlFor="expireAfter">
                            Job Validity
                          </FormLabel>
                          <JBSelect
                            placeholder="Select job valid period"
                            selectedInput={values.expireAfter}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                boxShadow:
                                  errors.expireAfter && touched.expireAfter
                                    ? "0 0 0 1px #E53E3E !important"
                                    : "",
                              }),
                            }}
                            value={
                              values.expireAfter && [
                                {
                                  value: values.expireAfter,
                                  label: values.expireAfter,
                                },
                              ]
                            }
                            onChange={(selectedOption) => {
                              // Formik expects the selected value to be passed to the handleChange function
                              handleChange({
                                target: {
                                  name: "expireAfter",
                                  value: selectedOption.value,
                                },
                              });
                            }}
                            options={jobValidityOptions}
                          />
                          <FormErrorMessage position="absolute">
                            {errors.expireAfter}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  )}
                </div>
              </div>
              <h4 className="dash-title-three pt-50 lg-pt-30">
                Skills & Experience
              </h4>
              <div className="mb-30">
                <Field name="skills">
                  {({ field }) => (
                    <>
                      <FormControl
                        isInvalid={errors.skills && touched.skills}
                        isRequired
                      >
                        <FormLabel htmlFor="skills">Key skills</FormLabel>
                        <AsyncSelectWithFetch
                          placeholder="Add skills"
                          taxonomy="skill"
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              boxShadow:
                                errors.skills && touched.skills
                                  ? "0 0 0 1px #E53E3E !important"
                                  : "",
                              height: 42,
                            }),
                          }}
                          onChange={(selectedOption, { action }) => {
                            // Formik expects the selected value to be passed to the handleChange function
                            if (!skillDetails.includes(selectedOption.label)) {
                              setSkillDetails([
                                ...skillDetails,
                                selectedOption.label,
                              ]);
                              handleChange({
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
                        <FormErrorMessage position="absolute">
                          {errors.skills}
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
                                        skillDetails.filter((s) => s !== skill);

                                      setSkillDetails(filteredSkills);
                                      handleChange({
                                        target: {
                                          name: "skills",
                                          value: filteredSkills,
                                        },
                                      });
                                    }}
                                    type="button"
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
              <div className="row align-items-end mb-30">
                <div className="col-md-6">
                  {postDataToEdit.industry && (
                    <Field name="industry">
                      {({ field }) => (
                        <FormControl
                          isInvalid={errors.industry && touched.industry}
                          isRequired
                        >
                          <FormLabel htmlFor="industry">Industry</FormLabel>
                          <AsyncSelectWithFetch
                            placeholder="Enter job industry"
                            taxonomy="industry"
                            selectedInput={postDataToEdit.industry}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                boxShadow:
                                  errors.industry && touched.industry
                                    ? "0 0 0 1px #E53E3E !important"
                                    : "",
                                height: 42,
                              }),
                            }}
                            onChange={(selectedOption) => {
                              // Formik expects the selected value to be passed to the handleChange function
                              handleChange({
                                target: {
                                  name: "industry",
                                  value: selectedOption.label,
                                },
                              });
                            }}
                          />
                          <FormErrorMessage position="absolute">
                            {errors.industry}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  )}
                </div>
                <div className="col-md-6">
                  {postDataToEdit.totalOpening && (
                    <Field name="totalOpening">
                      {({ field }) => (
                        <FormControl
                          isInvalid={
                            errors.totalOpening && touched.totalOpening
                          }
                          isRequired
                        >
                          <FormLabel htmlFor="totalOpening">
                            Total Openings
                          </FormLabel>
                          <JBSelect
                            options={jobOpeningOptions}
                            placeholder="Select total openings"
                            onChange={(selectedOption) => {
                              // Formik expects the selected value to be passed to the handleChange function
                              handleChange({
                                target: {
                                  name: "totalOpening",
                                  value: selectedOption.value,
                                },
                              });
                            }}
                            value={jobOpeningOptions.filter(
                              (jobOpening) =>
                                values.totalOpening === jobOpening.value
                            )}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                boxShadow:
                                  errors.totalOpening && touched.totalOpening
                                    ? "0 0 0 1px #E53E3E !important"
                                    : "",
                              }),
                            }}
                          />
                          <FormErrorMessage position="absolute">
                            {errors.totalOpening}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  )}
                </div>
              </div>
              <div className="row align-items-end">
                <div className="col-md-6">
                  {postDataToEdit.minimumExperience >= 0 && (
                    <Field name="minimumExperience">
                      {({ field }) => (
                        <FormControl
                          mb="30px"
                          isInvalid={
                            errors.minimumExperience &&
                            touched.minimumExperience
                          }
                          isRequired
                        >
                          <FormLabel htmlFor="minimumExperience">
                            Minimum Experience
                          </FormLabel>
                          <JBSelect
                            options={supportedExperienceYearsOptions}
                            placeholder="Select minimum experience"
                            onChange={(selectedOption) => {
                              // Formik expects the selected value to be passed to the handleChange function
                              handleChange({
                                target: {
                                  name: "minimumExperience",
                                  value: selectedOption.value,
                                },
                              });
                            }}
                            value={supportedExperienceYearsOptions.filter(
                              (experienceYear) =>
                                values.minimumExperience ===
                                experienceYear.value
                            )}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                boxShadow:
                                  errors.minimumExperience &&
                                  touched.minimumExperience
                                    ? "0 0 0 1px #E53E3E !important"
                                    : "",
                              }),
                            }}
                          />
                          <FormErrorMessage position="absolute">
                            {errors.minimumExperience}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  )}
                </div>
                <div className="col-md-6">
                  {postDataToEdit.maximumExperience >= 0 && (
                    <Field name="maximumExperience">
                      {({ field }) => (
                        <FormControl
                          mb="30px"
                          isInvalid={
                            errors.maximumExperience &&
                            touched.maximumExperience
                          }
                          isRequired
                        >
                          <FormLabel htmlFor="maximumExperience">
                            Maximum Experience
                          </FormLabel>
                          <JBSelect
                            options={supportedExperienceYearsOptions.filter(
                              (experienceYears) =>
                                experienceYears.value > values.minimumExperience
                            )}
                            placeholder="Select maximum experience"
                            onChange={(selectedOption) => {
                              // Formik expects the selected value to be passed to the handleChange function
                              handleChange({
                                target: {
                                  name: "maximumExperience",
                                  value: selectedOption.value,
                                },
                              });
                            }}
                            value={supportedExperienceYearsOptions.filter(
                              (experienceYear) =>
                                values.maximumExperience ===
                                experienceYear.value
                            )}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                boxShadow:
                                  errors.maximumExperience &&
                                  touched.maximumExperience
                                    ? "0 0 0 1px #E53E3E !important"
                                    : "",
                              }),
                            }}
                          />
                          <FormErrorMessage position="absolute">
                            {errors.maximumExperience}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  )}
                </div>
              </div>
              <h4 className="dash-title-three pt-50 lg-pt-30">
                Education Details
              </h4>
              <div className="mb-30">
                {postDataToEdit?.reqUg !== null &&
                  postDataToEdit?.reqUg !== undefined && (
                    <Field name="reqUg">
                      {({ field, form }) => (
                        <FormControl
                          mb="30px"
                          isInvalid={errors.reqUg && touched.reqUg}
                          isRequired
                        >
                          <Checkbox
                            {...field}
                            isChecked={values.reqUg}
                            required={false}
                            onChange={(event) =>
                              handleGraduationNotRequiredChange(
                                event,
                                form.handleChange
                              )
                            }
                          >
                            Graduation not required
                          </Checkbox>
                          <FormErrorMessage position="absolute">
                            {errors.reqUg}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  )}
              </div>
              {!graduationNotRequired && (
                <>
                  <div className="mb-30">
                    <Field name="ugDetails">
                      {({ field }) => (
                        <>
                          <FormControl
                            isInvalid={errors.ugDetails && touched.ugDetails}
                            isRequired
                          >
                            <FormLabel htmlFor="ugDetails">
                              Under Graduation
                            </FormLabel>
                            <AsyncSelectWithFetch
                              controlShouldRenderValue={false}
                              placeholder="Add under graduation qualification"
                              taxonomy="specialisation"
                              defaultOptions={specialisationUnderEdType.ug}
                              isCreatable={specialisationUnderEdType.ug?.length}
                              styles={{
                                control: (baseStyles, state) => ({
                                  ...baseStyles,
                                  boxShadow:
                                    errors.ugDetails && touched.ugDetails
                                      ? "0 0 0 1px #E53E3E !important"
                                      : "",
                                  height: 42,
                                }),
                              }}
                              onChange={(selectedOption, { action }) => {
                                // Formik expects the selected value to be passed to the handleChange function
                                if (
                                  !educationDetails.ug.includes(
                                    selectedOption.label
                                  )
                                ) {
                                  setEducationDetails({
                                    ...educationDetails,
                                    ug: [
                                      ...educationDetails.ug,
                                      selectedOption.label,
                                    ],
                                  });
                                  handleChange({
                                    target: {
                                      name: "ugDetails",
                                      value: [
                                        ...educationDetails.ug,
                                        selectedOption.label,
                                      ],
                                    },
                                  });
                                }
                              }}
                            />
                            <FormErrorMessage position="absolute">
                              {errors.ugDetails}
                            </FormErrorMessage>
                          </FormControl>
                          {educationDetails.ug.length > 0 && (
                            <div className="dash-input-wrapper">
                              <div className="skills-wrapper px-0">
                                <ul className="style-none d-flex flex-wrap align-items-center">
                                  {educationDetails.ug.map((ug) => (
                                    <li className="is_tag" key={ug}>
                                      <button
                                        onClick={() => {
                                          const filteredUGDetails =
                                            educationDetails.ug.filter(
                                              (s) => s !== ug
                                            );

                                          setEducationDetails({
                                            ...educationDetails,
                                            ug: filteredUGDetails,
                                          });
                                          handleChange({
                                            target: {
                                              name: "ugDetails",
                                              value: filteredUGDetails,
                                            },
                                          });
                                        }}
                                        type="button"
                                      >
                                        {ug} <i className="bi bi-x"></i>
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
                  <div className="mb-30">
                    <Field name="pgDetails">
                      {({ field }) => (
                        <>
                          <FormControl
                            isInvalid={errors.pgDetails && touched.pgDetails}
                          >
                            <FormLabel htmlFor="pgDetails">
                              Post Graduation
                            </FormLabel>
                            <AsyncSelectWithFetch
                              controlShouldRenderValue={false}
                              placeholder="Add post graduation qualification"
                              taxonomy="education"
                              defaultOptions={specialisationUnderEdType.pg}
                              isCreatable={specialisationUnderEdType.pg?.length}
                              styles={{
                                control: (baseStyles, state) => ({
                                  ...baseStyles,
                                  boxShadow:
                                    errors.pgDetails && touched.pgDetails
                                      ? "0 0 0 1px #E53E3E !important"
                                      : "",
                                  height: 42,
                                }),
                              }}
                              onChange={(selectedOption, { action }) => {
                                // Formik expects the selected value to be passed to the handleChange function
                                if (
                                  !educationDetails.pg.includes(
                                    selectedOption.label
                                  )
                                ) {
                                  setEducationDetails({
                                    ...educationDetails,
                                    pg: [
                                      ...educationDetails.pg,
                                      selectedOption.label,
                                    ],
                                  });
                                  handleChange({
                                    target: {
                                      name: "pgDetails",
                                      value: [
                                        ...educationDetails.pg,
                                        selectedOption.label,
                                      ],
                                    },
                                  });
                                }
                              }}
                            />
                            <FormErrorMessage position="absolute">
                              {errors.pgDetails}
                            </FormErrorMessage>
                          </FormControl>
                          {educationDetails.pg.length > 0 && (
                            <div className="dash-input-wrapper">
                              <div className="skills-wrapper px-0">
                                <ul className="style-none d-flex flex-wrap align-items-center">
                                  {educationDetails.pg.map((pg) => (
                                    <li className="is_tag" key={pg}>
                                      <button
                                        onClick={() => {
                                          const filteredPGDetails =
                                            educationDetails.pg.filter(
                                              (s) => s !== pg
                                            );

                                          setEducationDetails({
                                            ...educationDetails,
                                            pg: filteredPGDetails,
                                          });
                                          handleChange({
                                            target: {
                                              name: "pgDetails",
                                              value: filteredPGDetails,
                                            },
                                          });
                                        }}
                                        type="button"
                                      >
                                        {pg} <i className="bi bi-x"></i>
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
                  <div className="mb-30">
                    <Field name="ppgDetails">
                      {({ field }) => (
                        <>
                          <FormControl
                            isInvalid={errors.ppgDetails && touched.ppgDetails}
                          >
                            <FormLabel htmlFor="ppgDetails">
                              Doctoral/Ph.D
                            </FormLabel>
                            <AsyncSelectWithFetch
                              controlShouldRenderValue={false}
                              placeholder="Add doctoral/ph.d qualification"
                              taxonomy="education"
                              defaultOptions={specialisationUnderEdType.ppg}
                              isCreatable={
                                specialisationUnderEdType.ppg?.length
                              }
                              styles={{
                                control: (baseStyles, state) => ({
                                  ...baseStyles,
                                  boxShadow:
                                    errors.ppgDetails && touched.ppgDetails
                                      ? "0 0 0 1px #E53E3E !important"
                                      : "",
                                  height: 42,
                                }),
                              }}
                              onChange={(selectedOption, { action }) => {
                                // Formik expects the selected value to be passed to the handleChange function
                                if (
                                  !educationDetails.ppg.includes(
                                    selectedOption.label
                                  )
                                ) {
                                  setEducationDetails({
                                    ...educationDetails,
                                    ppg: [
                                      ...educationDetails.ppg,
                                      selectedOption.label,
                                    ],
                                  });
                                  handleChange({
                                    target: {
                                      name: "ppgDetails",
                                      value: [
                                        ...educationDetails.ppg,
                                        selectedOption.label,
                                      ],
                                    },
                                  });
                                }
                              }}
                            />
                            <FormErrorMessage position="absolute">
                              {errors.ppgDetails}
                            </FormErrorMessage>
                          </FormControl>
                          {educationDetails.ppg.length > 0 && (
                            <div className="dash-input-wrapper">
                              <div className="skills-wrapper px-0">
                                <ul className="style-none d-flex flex-wrap align-items-center">
                                  {educationDetails.ppg.map((ppg) => (
                                    <li className="is_tag" key={ppg}>
                                      <button
                                        onClick={() => {
                                          const filteredPPGDetails =
                                            educationDetails.ppg.filter(
                                              (s) => s !== ppg
                                            );

                                          setEducationDetails({
                                            ...educationDetails,
                                            ppg: filteredPPGDetails,
                                          });
                                          handleChange({
                                            target: {
                                              name: "ppgDetails",
                                              value: filteredPPGDetails,
                                            },
                                          });
                                        }}
                                        type="button"
                                      >
                                        {ppg} <i className="bi bi-x"></i>
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
                </>
              )}
              <h4 className="dash-title-three pt-10">Salary Details</h4>
              <div className="row align-items-end">
                <div className="col-md-6">
                  <Field name="label">
                    {({ field }) => (
                      <FormControl
                        mb="30px"
                        isInvalid={errors.label && touched.label}
                        isRequired
                      >
                        <FormLabel htmlFor="label">Salary Label</FormLabel>
                        <Input
                          {...field}
                          required={false}
                          placeholder="Enter salary label"
                          onChange={handleChange}
                          style={{
                            height: 42,
                          }}
                        />
                        <FormErrorMessage position="absolute">
                          {errors.label}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </div>
                <div className="col-md-6">
                  <div className="row align-items-end">
                    <div className="col-md-6">
                      <Field name="minimumSalary">
                        {({ field }) => (
                          <FormControl
                            mb="30px"
                            isInvalid={
                              errors.minimumSalary && touched.minimumSalary
                            }
                            isRequired
                          >
                            <FormLabel htmlFor="minimumSalary">
                              Minimum Salary
                            </FormLabel>
                            <Input
                              {...field}
                              required={false}
                              type="number"
                              placeholder="Enter minimum salary"
                              onChange={handleChange}
                              style={{
                                height: 42,
                              }}
                            />
                            <FormErrorMessage position="absolute">
                              {errors.minimumSalary}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </div>
                    <div className="col-md-6">
                      <Field name="maximumSalary">
                        {({ field }) => (
                          <FormControl
                            mb="30px"
                            isInvalid={
                              errors.maximumSalary && touched.maximumSalary
                            }
                            isRequired
                          >
                            <FormLabel htmlFor="maximumSalary">
                              Maximum Salary
                            </FormLabel>
                            <Input
                              {...field}
                              required={false}
                              type="number"
                              placeholder="Enter maximum salary"
                              onChange={handleChange}
                              style={{
                                height: 42,
                              }}
                            />
                            <FormErrorMessage position="absolute">
                              {errors.maximumSalary}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  {postDataToEdit?.hideSalary !== null &&
                    postDataToEdit?.hideSalary !== undefined && (
                      <Field name="hideSalary">
                        {({ field }) => (
                          <FormControl
                            mb="30px"
                            isInvalid={errors.hideSalary && touched.hideSalary}
                            isRequired
                          >
                            <Checkbox
                              {...field}
                              isChecked={values.hideSalary}
                              required={false}
                            >
                              Hide salary details from candidate
                            </Checkbox>
                            <FormErrorMessage position="absolute">
                              {errors.hideSalary}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    )}
                </div>
              </div>
              <div
                id="rp-address-collector"
                className="d-flex align-items-center justify-content-between"
              >
                <h4 className="dash-title-three pt-10">Address & Location</h4>
                {addressDetails.length <= 10 && (
                  <Button
                    colorScheme="blue"
                    variant="ghost"
                    fontWeight={500}
                    onClick={() =>
                      setAddressDetails([
                        ...addressDetails,
                        { locationId: "-1", city: "", pincode: "" },
                      ])
                    } // Add new city and pincode fields
                  >
                    Add More
                  </Button>
                )}
              </div>
              <FieldArray name="location">
                {(arrayHelpers) => (
                  <>
                    {/* Map over the addressDetails state to render dynamic city and pincode fields */}
                    {addressDetails.length &&
                      addressDetails.map((address, index) => (
                        <div
                          key={index}
                          className="row align-items-end mb-3 position-relative"
                        >
                          <div className="col-md-6">
                            <Field name={`location[${index}].city`}>
                              {({ field, form }) => (
                                <FormControl
                                  isInvalid={
                                    errors.location &&
                                    errors.location[index] &&
                                    touched.location &&
                                    touched.location[index] &&
                                    touched.location[index]?.city
                                  }
                                  isRequired
                                >
                                  <FormLabel
                                    htmlFor={`location[${index}].city`}
                                  >
                                    City
                                  </FormLabel>
                                  <AsyncSelectWithFetch
                                    id={index}
                                    inputId={index}
                                    placeholder="Enter work city"
                                    taxonomy="city"
                                    selectedInput={addressDetails[index].city}
                                    styles={{
                                      control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        boxShadow:
                                          errors.industry && touched.industry
                                            ? "0 0 0 1px #E53E3E !important"
                                            : "",
                                        height: 42,
                                      }),
                                    }}
                                    onChange={(selectedOption) => {
                                      const newAddressDetails = [
                                        ...addressDetails,
                                      ];

                                      newAddressDetails[index] = {
                                        city: selectedOption.label,
                                        pincode: addressDetails[index].pincode,
                                      };

                                      setAddressDetails(newAddressDetails);
                                    }}
                                  />
                                  <FormErrorMessage position="absolute">
                                    <ErrorMessage
                                      name={`location[${index}].city`}
                                    />
                                  </FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                          </div>
                          <div className="col-md-6">
                            <Field name={`location[${index}].pincode`}>
                              {({ field }) => (
                                <FormControl
                                  isInvalid={
                                    errors.location &&
                                    errors.location[index] &&
                                    touched.location &&
                                    touched.location[index] &&
                                    touched.location[index]?.pincode
                                  }
                                  isRequired
                                >
                                  <FormLabel
                                    htmlFor={`location[${index}].pincode`}
                                  >
                                    Pincode
                                  </FormLabel>
                                  <AsyncSelectWithFetch
                                    placeholder="Enter work pincode"
                                    taxonomy="pincode"
                                    selectedInput={
                                      addressDetails[index].pincode
                                    }
                                    styles={{
                                      control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        boxShadow:
                                          errors.industry && touched.industry
                                            ? "0 0 0 1px #E53E3E !important"
                                            : "",
                                        height: 42,
                                      }),
                                    }}
                                    onChange={(selectedOption) => {
                                      const newAddressDetails = [
                                        ...addressDetails,
                                      ];

                                      newAddressDetails[index] = {
                                        city: addressDetails[index].city,
                                        pincode: selectedOption.label,
                                      };

                                      setAddressDetails(newAddressDetails);
                                    }}
                                  />
                                  <FormErrorMessage position="absolute">
                                    <ErrorMessage
                                      name={`location[${index}].pincode`}
                                    />
                                  </FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                          </div>
                          {addressDetails.length > 1 && (
                            <CloseButton
                              color="red"
                              onClick={() => {
                                setAddressDetails((prevDetails) =>
                                  prevDetails.filter((_, idx) => idx !== index)
                                );
                                // setFieldValue("location", newLocation);

                                // if (address.locationId !== -1) {
                                //   handleDeleteEntity(
                                //     "location",
                                //     address.locationId
                                //   );
                                // }
                              }}
                              position="absolute"
                              right="-5"
                              bottom="2"
                            />
                          )}
                        </div>
                      ))}
                  </>
                )}
              </FieldArray>
              <h4 className="dash-title-three">Company Details</h4>
              <div className="mb-30">
                {postDataToEdit.company && (
                  <Field name="company">
                    {({ field }) => (
                      <FormControl
                        isInvalid={errors.company && touched.company}
                        isRequired
                      >
                        <FormLabel htmlFor="company">Company</FormLabel>
                        <AsyncSelectWithFetch
                          placeholder="Enter company"
                          taxonomy="company"
                          selectedInput={postDataToEdit.company}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              boxShadow:
                                errors.company && touched.company
                                  ? "0 0 0 1px #E53E3E !important"
                                  : "",
                              height: 42,
                            }),
                          }}
                          onChange={(selectedOption) => {
                            // Formik expects the selected value to be passed to the handleChange function
                            handleChange({
                              target: {
                                name: "company",
                                value: selectedOption.label,
                              },
                            });
                          }}
                        />
                        <FormErrorMessage position="absolute">
                          {errors.company}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                )}
              </div>
              <Field name="companyDescription">
                {({ field }) => (
                  <FormControl
                    mb="30px"
                    isInvalid={
                      errors.companyDescription && touched.companyDescription
                    }
                    isRequired
                  >
                    <FormLabel htmlFor="companyDescription">
                      Company Description
                    </FormLabel>
                    <Editor
                      editorState={values.companyDescription}
                      handleChange={(value) => {
                        setFieldValue("companyDescription", value); // Use setFieldValue to update the field value
                      }}
                    />
                    <FormErrorMessage position="absolute">
                      {errors.companyDescription}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Form>
          )}
        </Formik>
        <AlertErrorComponent errorMessage={errorMessage} setError={setError} />
      </div>

      <div className="button-group d-inline-flex align-items-center mt-30">
        <Button
          type="submit"
          className="dash-btn-two tran3s me-3"
          form="edit-post-job-id"
          isLoading={isRcUpdateSinglePostLoading}
        >
          Save
        </Button>
        <NavLink
          to={APP_ROUTES.RecruiterMyJobs}
          className="dash-cancel-btn tran3s"
        >
          Cancel
        </NavLink>
      </div>
    </div>
  );
};

export default Index;
