
/**
 *bulkInsertPost.js
 */

const postEntity = require('../../entities/post');
const response = require('../../utils/response');
const makeCheckUniqueFieldsInDatabase = require('../../utils/checkUniqueFieldsInDatabase');

/**
 * @description : create multiple records  in database.
 * @param {Object} dataToCreate : data for creating documents.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : created Posts. {status, message, data}
 */

const bulkInsertPost = ({ postDb, createValidation }) => async (dataToCreate,req,res) => {

  // Validate each post data
  for (const newPost of dataToCreate) {
    const validateRequest = await createValidation(newPost);
    if (!validateRequest.isValid) {
      return response.validationError({ message: validateRequest.message });
    }
  }

  let postEntities = dataToCreate.map(item => postEntity(item));

  let createdPost = await postDb.create(postEntities);
  return response.success({ data:{ count:createdPost.length || 0 } });
};
module.exports = bulkInsertPost;