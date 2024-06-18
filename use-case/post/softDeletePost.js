/**
 *softDeletePost.js
 */

const makeGetDependencyCount = require('./deleteDependent').getDependencyCount;
const makeSoftDeleteWithDependency = require('./deleteDependent').softDeleteWithDependency;
const response = require('../../utils/response');

/**
 * @description : soft delete record from database by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response..
 * @return {Object} : deactivated Post. {status, message, data}
 */
const softDeletePost = ({
  postDb,
}) => async (params,req,res) => {
  let {
    query, dataToUpdate,isWarning 
  } = params;
  let updatedPost = {};
  if (isWarning) {
    const getDependencyCount = makeGetDependencyCount({
      postDb,
    });
    return await getDependencyCount(query);
  } else {
    const softDeleteWithDependency = makeSoftDeleteWithDependency({
      postDb,
    });
    return await softDeleteWithDependency(query, dataToUpdate);
  }
};
module.exports = softDeletePost;