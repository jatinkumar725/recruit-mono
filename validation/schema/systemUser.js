const joi = require('joi');
const {
  options, isCountOnly, populate, select
} = require('../commonFilterValidation');
const authConstantDefault = require('../../constants/authConstant');

const convertObjectToEnum = require('../../utils/convertObjectToEnum');

const createSchema = joi.object({
  password: joi.string().optional(),
  email: joi.string().email({ tlds: { allow: true } }).required(),
  name: joi.string().optional(),
  isActive: joi.boolean().optional(),
  createdAt: joi.date().optional(),
  updatedAt: joi.date().optional(),
  addedBy: joi.forbidden().optional(),
  updatedBy: joi.forbidden().optional(),
  model_type: joi.string().valid('Recruiter', 'System_User').optional(),
  permanentAddress: joi.array().items(joi.object({
    pincode: joi.string().optional(),
    address1: joi.string().optional(),
    address2: joi.string().optional(),
    landmark: joi.string().optional(),
    city: joi.string().optional(),
    isDefault: joi.boolean().optional(),
    state: joi.string().optional(),
    addressType: joi.string().optional(),
    addressNo: joi.number().optional()
  })).optional(),
  userType: joi.number().valid(3).required(),
  mobile: joi.string().optional(),
  isDeleted: joi.boolean().optional(),
  resetPasswordLink: joi.object({
    code: joi.string().optional(),
    expireTime: joi.date().optional()
  }).optional(),
  loginRetryLimit: joi.number().optional(),
  loginReactiveTime: joi.date().optional(),
});

const updateSchema = joi.object({
  username: joi.string().allow(null).allow(''),
  password: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  name: joi.string().allow(null).allow(''),
  isActive: joi.boolean(),
  shippingAddress: joi.array().items(joi.object()),
  wishlist: joi.array().items(joi.object()),
  userType: joi.number().allow(0),
  mobile: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  resetPasswordLink: joi.object({
    code: joi.string(),
    expireTime: joi.date().options({ convert: true })
  }),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}
).unknown(true);

const keys = ['query', 'where'];
const filterValidationSchema = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      username: joi.alternatives().try(joi.array().items(), joi.string(), joi.object()),
      password: joi.alternatives().try(joi.array().items(), joi.string(), joi.object()),
      email: joi.alternatives().try(joi.array().items(), joi.string(), joi.object()),
      name: joi.alternatives().try(joi.array().items(), joi.string(), joi.object()),
      isActive: joi.alternatives().try(joi.array().items(), joi.boolean(), joi.object()),
      mobile: joi.alternatives().try(joi.array().items(), joi.string(), joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(), joi.boolean(), joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(), joi.string().regex(/^[0-9a-fA-F]{24}$/), joi.object())
    }).unknown(true),])
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