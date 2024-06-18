/**
 * updatePost.js
 */

const postEntity = require('../../entities/post');
const response = require('../../utils/response');

/**
 * @description : update record with data by id.
 * @param {Object} params : request body including query and data.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : updated Post. {status, message, data}
 */
const updatePost = ({
  postDb, updateValidation
}) => async (params, req, res) => {
  let {
    dataToUpdate, query
  } = params;
  const validateRequest = await updateValidation(dataToUpdate);
  if (!validateRequest.isValid) {
    return response.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
  }
  let post = postEntity(dataToUpdate);
  post = await postDb.updateOne(query, post);
  if (!post) {
    return response.recordNotFound();
  }
  return response.success({ data: post });
};
module.exports = updatePost;