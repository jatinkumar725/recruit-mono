/**
 * getSavedSeeker.js
 */

const response = require('../../utils/response');

/**
 * @description : find all records from database based on query and options.
 * @param {Object} params : request body including option and query.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : found User(s). {status, message, data}
 */
const getSavedSeeker = ({
    savedSeekerDb, filterValidation
}) => async (params, req, res) => {

    const validateRequest = await filterValidation(params);
    if (!validateRequest.isValid) {
        return response.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
    }

    let {
        query, options,
    } = params;
    let foundUser = await savedSeekerDb.findOne(query, options);
    if (!foundUser) {
        return response.recordNotFound();
    }
    return response.success({ data: foundUser });

};
module.exports = getSavedSeeker;