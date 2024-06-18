const joi = require('joi');
const {
    options, isCountOnly, populate, select
} = require('../commonFilterValidation');

const createSchema = joi.object({
    ogId: joi.string().optional(),
    name: joi.string().required(),
    url: joi.string().required(),
});

const updateSchema = joi.object({
    ogId: joi.string().required(),
    name: joi.string().required(),
    url: joi.string().required(),
});

const keys = ['query', 'where'];
const filterValidationSchema = joi.object({
    options: options,
    ...Object.fromEntries(
        keys.map(key => [key, joi.object({
            ogId: joi.alternatives().try(joi.array().items(), joi.string(), joi.object()),
            name: joi.alternatives().try(joi.array().items(), joi.string(), joi.object()),
            url: joi.alternatives().try(joi.array().items(), joi.string(), joi.object()),
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
