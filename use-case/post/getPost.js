/**
 *getPost.js
 */

const { CLIENT, ROUTES } = require('../../constants/routeConstant');
const { pluckList } = require('../../utils/objects');
const response = require('../../utils/response');

/**
 * @description : find record from database by id;
 * @param {Object} params : request body including option and query.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : found Post. {status, message, data}
 */
const getPost = ({
  postDb, filterValidation
}) => async (params, req, res) => {
  let {
    query, options, serverStaticUrl = true
  } = params;
  const validateRequest = await filterValidation(options);
  if (!validateRequest.isValid) {
    return response.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
  }
  let foundPost = await postDb.findOne(query, options);
  foundPost = await foundPost.populate('addedBy');

  if (!foundPost) {
    return response.recordNotFound();
  }
  
  return response.success({ data: foundPost });
};
module.exports = getPost;