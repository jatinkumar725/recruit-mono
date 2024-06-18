const joi = require('joi');
const {
    options, isCountOnly, populate, select
} = require('../commonFilterValidation');

const createSchema = joi.object({
    termId: joi.number(),
    name: joi.alternatives().try(
        joi.string().required(),
        joi.number().required()
    ),
    alias: joi.string(),
    termGroup: joi.number(),
    isActive: joi.boolean(),
    isDeleted: joi.boolean()
}).unknown(true);

const updateSchema = joi.object({
    termId: joi.number(),
    name: joi.string(),
    alias: joi.string(),
    isActive: joi.boolean(),
    isDeleted: joi.boolean(),
    _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
let filterValidationSchema = joi.object({
    options: options,
    ...Object.fromEntries(
        keys.map(key => [key, joi.object({
            termId: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
            name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
            alias: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
            isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
            isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
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