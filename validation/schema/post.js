const joi = require('joi');
const {
  options, isCountOnly, populate, select
} = require('../commonFilterValidation');

const createSchema = joi.object({
  title: joi.string().required().max(200).message("Job title allowed maximum 200 characters."),
  description: joi.string().required(),
  shortDescription: joi.string().max(250).message("Short description allowed maximum 250 characters."),
  employmentType: joi.number().required(),
  jobType: joi.number().required(),
  totalOpening: joi.number().required(),
  salaryDetails: joi.object({
    label: joi.string().required(),
    minimum: joi.number().required(),
    maximum: joi.number().required(),
    hideSalary: joi.boolean().optional(),
  }),
  minimumExperience: joi.number().required(),
  maximumExperience: joi.number().required(),
  isFeatured: joi.boolean().optional(),
  views: joi.number().optional(),
  designation: joi.string().required(),
  industry: joi.string().required(),
  skills: joi.string().required(),
  location: joi.array().items(joi.object({
    locationId: joi.string().optional(),
    city: joi.string().required(),
    pincode: joi.string().required(), // number
  })),
  company: joi.string().required(),
  companyDescription: joi.string().required(),
  // education: joi.array().items(joi.object({
  //   educationId: joi.string().optional(),
  //   education: joi.string().required(),
  // })),
  // postDate: joi.string().required(),
  addedBy: joi.string().required(),
  // updatedBy: joi.string(),
  expireAfter: joi.string().required(),
  createdAt: joi.date().optional(),
  updatedAt: joi.date().optional(),
  isActive: joi.boolean().optional(),
  isDeleted: joi.boolean().optional(),
  education: {
    reqUg: joi.boolean().required(),
    ug: joi.when('reqUg', {
      is: false,
      then: joi.string().required().messages({
        'any.required': 'Under Graduation details are required.',
      }),
      otherwise: joi.boolean().optional(),
    }),
    pg: joi.string().allow('').optional(),
    ppg: joi.string().allow('').optional(),
  }
});

const updateSchema = joi.object({
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  title: joi.string().optional().max(200).message("Job title allowed maximum 200 characters."),
  description: joi.string().optional(),
  shortDescription: joi.string().max(250).message("Short description allowed maximum 250 characters."),
  employmentType: joi.number().optional(),
  jobType: joi.number().optional(),
  totalOpening: joi.number().optional(),
  salaryDetails: joi.object({
    label: joi.string().optional(),
    minimum: joi.number().optional(),
    maximum: joi.number().optional(),
    hideSalary: joi.boolean().optional(),
  }),
  minimumExperience: joi.number().optional(),
  maximumExperience: joi.number().optional(),
  isFeatured: joi.boolean().optional(),
  views: joi.number().optional(),
  designation: joi.string().optional(),
  industry: joi.string().optional(),
  skills: joi.string().optional(),
  location: joi.array().items(joi.object({
    locationId: joi.string().optional(),
    city: joi.string().optional(),
    pincode: joi.string().optional(),
  })),
  company: joi.string().optional(),
  companyDescription: joi.string().optional(),
  // education: joi.array().items(joi.object({
  //   educationId: joi.string().optional(),
  //   education: joi.string().optional(),
  // })),
  // postDate: joi.string().optional(),
  expireAfter: joi.string().optional(),
  updatedBy: joi.string(),
  updatedAt: joi.date().optional(),
  isActive: joi.boolean().optional(),
  isDeleted: joi.boolean().optional(),
  education: {
    reqUg: joi.boolean().required(),
    ug: joi.when('reqUg', {
      is: false,
      then: joi.string().required().messages({
        'any.required': 'Under Graduation details are required.',
      }),
      otherwise: joi.string().optional(),
    }),

    pg: joi.string().allow('').optional(),
    ppg: joi.string().allow('').optional(),
  }
});

let keys = ['query', 'where'];
let filterValidationSchema = joi.object({
  options: joi.object(),
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      title: joi.alternatives().try(joi.string(), joi.object()),
      description: joi.alternatives().try(joi.string(), joi.object()),
      company: joi.alternatives().try(joi.string(), joi.object()),
      companyDescription: joi.alternatives().try(joi.string(), joi.object()),
      employmentType: joi.alternatives().try(joi.number(), joi.object()),
      jobType: joi.alternatives().try(joi.number(), joi.object()),
      views: joi.alternatives().try(joi.number(), joi.object()),
      totalOpening: joi.alternatives().try(joi.number(), joi.object()),
      industry: joi.alternatives().try(joi.string(), joi.object()),
      skills: joi.alternatives().try(joi.string(), joi.object()),
      designation: joi.alternatives().try(joi.string(), joi.object()),
      location: joi.alternatives().try(joi.array(), joi.object()),
      // education: joi.alternatives().try(joi.number(), joi.object()),
      minimumExperience: joi.alternatives().try(joi.number(), joi.object()),
      maximumExperience: joi.alternatives().try(joi.number(), joi.object()),
      salaryDetails: joi.alternatives().try(joi.object()),
      expireAfter: joi.alternatives().try(joi.string()),
      addedBy: joi.alternatives().try(joi.string(), joi.object()),
      updatedBy: joi.alternatives().try(joi.string(), joi.object()),
      postDate: joi.alternatives().try(joi.string(), joi.object()),
      isActive: joi.alternatives().try(joi.array().items(), joi.boolean(), joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(), joi.boolean(), joi.object()),
      id: joi.alternatives().try(joi.any(), joi.object()),
      _id: joi.alternatives().try(joi.array().items(), joi.string().regex(/^[0-9a-fA-F]{24}$/), joi.object())
    })])
  ),
  isCountOnly: joi.boolean(),
  populate: joi.array().items(joi.object()),
  select: joi.any()
});

module.exports = {
  createSchema,
  updateSchema,
  filterValidationSchema
};