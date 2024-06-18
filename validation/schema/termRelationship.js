const joi = require('joi');
const {
    options, isCountOnly, populate, select
} = require('../commonFilterValidation');

const createSchema = joi.object({
    objectId: joi.number().required(),
    termTaxonomyId: joi.number().required(),
    model_type: joi.string().valid('Recruiter', 'System_User', 'Seeker', 'Post').required(),
    termOrder: joi.number().default(0),
    objectGroup: joi.alternatives().try(joi.string(),joi.number()),
    isActive: joi.boolean(),
    isDeleted: joi.boolean()
});

const updateSchema = joi.object({
    objectId: joi.number(),
    termTaxonomyId: joi.number(),
    termOrder: joi.number(),
    objectGroup: joi.alternatives().try(joi.string(),joi.number()),
    isActive: joi.boolean(),
    isDeleted: joi.boolean(),
    _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
});

let keys = ['query', 'where'];
let filterValidationSchema = joi.object({
    options: options,
    ...Object.fromEntries(
        keys.map(key => [key, joi.object({
            objectId: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
            termTaxonomyId: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
            termOrder: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
            objectGroup: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
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