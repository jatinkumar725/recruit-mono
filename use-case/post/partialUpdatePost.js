/**
 *partialUpdatePost.js
 */

const response = require('../../utils/response');

/**
 * @description : partially update record with data by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {obj} : updated Post. {status, message, data}
 */
const partialUpdatePost = ({ postDb }) => async (params,req,res) => {

  const { query, dataToUpdate, options = {} } = params;

  const post = await postDb.updateOne(query,dataToUpdate,options);
  if (!post){
    return response.recordNotFound();
  }
  return response.success({ data:post });
};
module.exports = partialUpdatePost;