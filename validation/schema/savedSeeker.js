const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('../commonFilterValidation');

const createSchema = joi.object({
  seekerId: joi.string().required(),
  recruiterId: joi.string().required(),
  savedDate: joi.date().iso(),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
});

const updateSchema = joi.object({
  seekerId: joi.string(),
  recruiterId: joi.string(),
  savedDate: joi.date().iso(),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
});

const keys = ['query', 'where'];
const filterValidationSchema = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      seekerId: joi.alternatives().try(joi.array().items(), joi.string(), joi.object()),
      sId: joi.alternatives().try(joi.array().items(), joi.string(), joi.object()),
      recruiterId: joi.alternatives().try(joi.string(), joi.number()),
      savedDate: joi.alternatives().try(joi.array().items(), joi.date().iso(), joi.object()),
      isActive: joi.alternatives().try(joi.array().items(), joi.boolean(), joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(), joi.boolean(), joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(), joi.string().regex(/^[0-9a-fA-F]{24}$/), joi.object())
    })])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
});

module.exports = {
  createSchema,
  updateSchema,
  filterValidationSchema
};
