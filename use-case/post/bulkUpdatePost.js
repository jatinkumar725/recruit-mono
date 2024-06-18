/**
 * bulkUpdatePost.js
 */

const response = require('../../utils/response');

/**
 * @description : update multiple records of post with data by filter.
 * @param {Object} params : request body including query and data.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : response of bulkUpdate. {status, message, data}
 */
const bulkUpdatePost = ({ postDb, updateValidation }) => async ({ query, dataToUpdate, isCountOnly },req,res) => {

  const updatedPost = await postDb.updateMany(query, dataToUpdate, isCountOnly);
  return response.success({ data:{ count:updatedPost } });
};
module.exports = bulkUpdatePost;