const joi = require('joi');
const {
    options, isCountOnly, populate, select
} = require('../commonFilterValidation');

const createSchema = joi.object({
    termTaxonomyId: joi.number(),
    termId: joi.number(),
    taxonomy: joi.string().required(),
    parentId: joi.number(),
    count: joi.number(),
    isActive: joi.boolean(),
    isDeleted: joi.boolean()
});

const updateSchema = joi.object({
    parentId: joi.number(),
    count: joi.number(),
    isActive: joi.boolean(),
    isDeleted: joi.boolean(),
    _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
});

let keys = ['query', 'where'];
let filterValidationSchema = joi.object({
    options: options,
    ...Object.fromEntries(
        keys.map(key => [key, joi.object({
            termTaxonomyId: joi.alternatives().try(joi.array().items(), joi.number(), joi.object()),
            termId: joi.alternatives().try(joi.array().items(), joi.number(), joi.object()),
            taxonomy: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
            parentId: joi.alternatives().try(joi.array().items(), joi.number(), joi.object()),
            count: joi.alternatives().try(joi.array().items(), joi.number(), joi.object()),
            isActive: joi.alternatives().try(joi.array().items(), joi.boolean(), joi.object()),
            isDeleted: joi.alternatives().try(joi.array().items(), joi.boolean(), joi.object()),
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