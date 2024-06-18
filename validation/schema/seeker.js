const joi = require('joi');
const {
  options, isCountOnly, populate, select
} = require('../commonFilterValidation');
const validateIndianMobile = require('../mobileValidation');

const authConstantDefault = require('../../constants/authConstant');
const convertObjectToEnum = require('../../utils/convertObjectToEnum');

const createSchema = joi.object({
  password: joi.string().min(6).required(),
  email: joi.string().email({ tlds: { allow: true } }).required(),
  name: joi.string().required(),
  mobile: joi.string().regex(validateIndianMobile()).message('Please provide valid mobile number').optional(),
  headline: joi.string().max(250).optional(),
  overview: joi.string().max(1000).optional(),
  noticePeriod: joi.string().optional(),
  currentSalary: joi.string().optional(),
  experience: joi.object({
    year: joi.string().required(),
    month: joi.string().required(),
  }).optional(),
  gender: joi.string().optional(),
  birthDate: joi.string().optional(),
  maritalStatus: joi.string().optional(),
  religion: joi.string().optional(),
  onlineProfiles: joi.array().items(joi.object({
    name: joi.string().required(),
    url: joi.string().required()
  })).optional(),
  projects: joi.array().items(joi.object({
    url: joi.string().required(),
    name: joi.string().required(),
    imageURL: joi.string(),
  })).optional(),
  skills: joi.string(),
  location: joi.array().items(joi.object({
    locationId: joi.string().optional(),
    address: joi.string(),
    city: joi.string(),
    pincode: joi.string(),
  })),
  education: joi.array().items(joi.object({
    educationId: joi.string().optional(),
    educationType: joi.string(),
    specialisation: joi.string(),
    examBoard: joi.string(),
    institute: joi.string(),
    startYear: joi.number(),
    endYear: joi.number().greater(joi.ref('startYear')),
    description: joi.string().max(1000).optional(),
  })),
  employment: joi.array().items(joi.object({
    employmentId: joi.string().optional(),
    isYourCurrentCompany: joi.boolean().default(false),
    company: joi.string(),
    designation: joi.string(),
    // startYear: joi.number(),
    // endYear: joi.when('isYourCurrentCompany', {
    //   is: false,
    //   then: joi.number().greater(joi.ref('startYear')),
    //   otherwise: joi.number().greater(joi.ref('startYear'))
    // }),
    startDate: joi.string().required(),
    endDate: joi.string().optional(),
    skills: joi.string(),
    description: joi.string().max(1000).optional(),
  })),
  userType: joi.number().valid(1).required(),
  industry: joi.string().optional(),
  designation: joi.string().optional(),
  expectedCtc: joi.string().optional(),
  prefEmploymentType: joi.array().items(joi.string()),
  prefJobType: joi.array().items(joi.string()),
  prefLocation: joi.array().items(joi.object({
    locationId: joi.string().optional(),
    city: joi.string(),
  })),
  userType: joi.number().valid(1).required(),
  userType: joi.number().valid(1).required(),
  createdAt: joi.date().optional(),
  updatedAt: joi.date().optional(),
  addedBy: joi.forbidden().optional(),
  updatedBy: joi.forbidden().optional(),
  model_type: joi.string().valid('Recruiter', 'System_User').optional(),
  isActive: joi.boolean().optional(),
  isDeleted: joi.boolean().optional(),
  isPrimaryEmailVerified: joi.boolean().optional(),
  isPrimaryMobileNoVerified: joi.boolean().optional(),
  resetPasswordLink: joi.object({
    code: joi.string().optional(),
    expireTime: joi.date().optional()
  }).optional(),
  loginRetryLimit: joi.number().optional(),
  loginReactiveTime: joi.date().optional(),
  ssoAuth: joi.object({
    googleId: joi.string().optional()
  }).optional()
});

const updateSchema = joi.object({
  email: joi.string().allow(null).allow(''),
  name: joi.string().allow(null).allow(''),
  isActive: joi.boolean(),
  permanentAddress: joi.array().items(joi.object()),
  headline: joi.string().max(250).optional(),
  overview: joi.string().max(1000).optional(),
  noticePeriod: joi.string().optional(),
  currentSalary: joi.string().optional(),
  experience: joi.object({
    year: joi.string().required(),
    month: joi.string().required(),
  }).optional(),
  gender: joi.string().optional(),
  birthDate: joi.string().optional(),
  maritalStatus: joi.string().optional(),
  religion: joi.string().optional(),
  onlineProfiles: joi.array().items(joi.object({
    name: joi.string().required(),
    url: joi.string().required()
  })).optional(),
  projects: joi.array().items(joi.object({
    url: joi.string().required(),
    name: joi.string().required(),
    imageURL: joi.string(),
  })).optional(),
  skills: joi.string(),
  location: joi.array().items(joi.object({
    locationId: joi.string().optional(),
    address: joi.string().required(),
    city: joi.string().required(),
    pincode: joi.string().required(),
  })),
  education: joi.array().items(joi.object({
    educationId: joi.string().optional(),
    educationType: joi.string(),
    specialisation: joi.string(),
    examBoard: joi.string(),
    institute: joi.string(),
    startYear: joi.number().required(),
    endYear: joi.number().greater(joi.ref('startYear')).required(),
    description: joi.string().max(1000).optional(),
  })),
  employment: joi.array().items(joi.object({
    employmentId: joi.string().optional(),
    isYourCurrentCompany: joi.boolean().default(true),
    company: joi.string().required(),
    designation: joi.string().required(),
    startDate: joi.string().required(),
    endDate: joi.string().optional(),
    // endYear: joi.when('isYourCurrentCompany', {
    //   is: false,
    //   then: joi.number().greater(joi.ref('startYear')).required(),
    //   otherwise: joi.number().greater(joi.ref('startYear')).optional()
    // }),
    skills: joi.string().allow("").required(),
    description: joi.string().max(1000).optional(),
  })),
  industry: joi.string().optional(),
  designation: joi.string().optional(),
  expectedCtc: joi.string().optional(),
  prefEmploymentType: joi.array().items(joi.string()),
  prefJobType: joi.array().items(joi.string()),
  prefLocation: joi.array().items(joi.object({
    locationId: joi.string().optional(),
    city: joi.string(),
  })),
  mobile: joi.string().regex(validateIndianMobile()).message('Please provide valid mobile number').optional(),
  isDeleted: joi.boolean(),
  resetPasswordLink: joi.object({
    code: joi.string(),
    expireTime: joi.date().options({ convert: true })
  }),
  ssoAuth: joi.object({ googleId: joi.string() }),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
});

let keys = ['query', 'where'];
let filterValidationSchema = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      username: joi.alternatives().try(joi.array().items(), joi.string(), joi.object()),
      email: joi.alternatives().try(joi.array().items(), joi.string(), joi.object()),
      name: joi.alternatives().try(joi.array().items(), joi.string(), joi.object()),
      isActive: joi.alternatives().try(joi.array().items(), joi.boolean(), joi.object()),
      mobile: joi.alternatives().try(joi.array().items(), joi.string(), joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(), joi.boolean(), joi.object()),
      ssoAuth: joi.alternatives().try(joi.array().items(), joi.string(), joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(), joi.string().regex(/^[0-9a-fA-F]{24}$/), joi.object())
    }
    ).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select

}).unknown(true);

module.exports = {
  createSchema,
  updateSchema,
  filterValidationSchema
};