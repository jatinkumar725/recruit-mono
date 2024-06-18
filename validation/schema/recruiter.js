const joi = require('joi');
const {
  options, isCountOnly, populate, select
} = require('../commonFilterValidation');
const authConstantDefault = require('../../constants/authConstant');
const validateIndianMobile = require('../mobileValidation');

const { USER_TYPES } = require('../../constants/authConstant');
const convertObjectToEnum = require('../../utils/convertObjectToEnum');

const createSchema = joi.object({
  password: joi.string().optional(),
  email: joi.string().email({ tlds: { allow: true } }).required(),
  mobile: joi.string().regex(validateIndianMobile()).required(),
  name: joi.string().required(),
  company: joi.string().required(),
  companySize: joi.number().required(),
  industry: joi.string().required(),
  roleAtCompany: joi.string().required(),
  location: joi.array().items(joi.object({
    locationId: joi.string(),
    address: joi.string(),
    city: joi.string(),
    pincode: joi.string(),
  })),
  userType: joi.number().valid(2).required(),
  // isActive: joi.boolean(),
  // isDeleted: joi.boolean(),
  isKYCDocsUploaded: joi.boolean(),
  isProfileVerified: joi.boolean(),
  // totalSavedCandidates: joi.boolean(),
  resetPasswordLink: joi.object({
    code: joi.string(),
    expireTime: joi.date().options({ convert: true })
  }),
});

const updateSchema = joi.object({
  name: joi.string(),
  roleAtCompany: joi.string(),
  company: joi.string(),
  companySize: joi.number().optional(),
  industry: joi.string().optional(),
  location: joi.array().items(joi.object({
    locationId: joi.string(),
    address: joi.string(),
    city: joi.string(),
    pincode: joi.string(),
  })),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  isKYCDocsUploaded: joi.boolean(),
  isProfileVerified: joi.boolean(),
  // totalSavedCandidates: joi.boolean(),
  resetPasswordLink: joi.object({
    code: joi.string(),
    expireTime: joi.date().options({ convert: true })
  }),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
});

let keys = ['query', 'where'];
let filterValidationSchema = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      username: joi.alternatives().try(joi.array().items(), joi.string(), joi.object()),
      password: joi.alternatives().try(joi.array().items(), joi.string(), joi.object()),
      email: joi.alternatives().try(joi.array().items(), joi.string(), joi.object()),
      name: joi.alternatives().try(joi.array().items(), joi.string(), joi.object()),
      roleAtCompany: joi.string().allow(null).allow(''),
      companySize: joi.number().allow(null).allow(''),
      company: joi.string().allow(null).allow(''),
      industry: joi.string().allow(null).allow(''),
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