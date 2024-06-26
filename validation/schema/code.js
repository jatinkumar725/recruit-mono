const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('../commonFilterValidation');

const createSchema = joi.object({
  userId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  code: joi.string().allow(null).allow(''),
  model_type: joi.string().allow(null).allow(''),
  codeExpirationTime: joi.date().options({ convert: true }).allow(null).allow(''),
  isCodeExpired: joi.boolean().default(false),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
}).unknown(true);

const updateSchema = joi.object({
  userId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  code: joi.string().allow(null).allow(''),
  model_type: joi.string().allow(null).allow(''),
  codeExpirationTime: joi.date().options({ convert: true }).allow(null).allow(''),
  isCodeExpired: joi.boolean().default(false),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}
).unknown(true);

let keys = ['query', 'where'];
let filterValidationSchema = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      userId: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      code: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      model_type: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      codeExpirationTime: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      isCodeExpired: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
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