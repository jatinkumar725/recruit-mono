/**
 * getApplicationAttachments.js
 */

const response = require('../../utils/response');

/**
 * @description : find record from database by id;
 * @param {Object} params : request body including option and query.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : found Post. {status, message, data}
 */
const getApplicationAttachments = ({
  appliedPostDb, userDb, filterValidation
}) => async (params, req, res) => {
  let {
    query, options
  } = params;
  const validateRequest = await filterValidation(options);
  if (!validateRequest.isValid) {
    return response.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
  }

  // Get application
  const applicationDetails = await appliedPostDb.findOne(query);
  if (!applicationDetails) {
    return response.badRequest({ message: 'Invalid application requested' })
  }

  // Get resume of applicant 
  const uplodedResume = uploadDb.findOne('')

  let foundAppliedPost = await appliedPostDb.findMany(query, options);
  if (!foundAppliedPost) {
    return response.recordNotFound();
  }
  return response.success({ data: foundAppliedPost });
};
module.exports = getApplicationAttachments;