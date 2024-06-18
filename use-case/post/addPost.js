/**
 *addPost.js
 */

const postEntity = require('../../entities/post');
const response = require('../../utils/response');
/**
 * @description : create new record of post in database.
 * @param {Object} dataToCreate : data for create new document.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : response of create. {status, message, data}
 */
const addPost = ({
  postDb,createValidation 
}) => async (dataToCreate,req,res) => {
  const validateRequest = await createValidation(dataToCreate);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let post = postEntity(dataToCreate);
  post = await postDb.create(post);
  return response.success({ data:post });
};
module.exports = addPost;