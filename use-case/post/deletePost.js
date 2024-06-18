
/**
 *deletePost.js
 */
 
const makeGetDependencyCount = require('./deleteDependent').getDependencyCount;
const makeDeleteWithDependency = require('./deleteDependent').deleteWithDependency;
const response = require('../../utils/response');
    
/**
 * @description : delete record from database.
 * @param {Object} params : request body including query.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : deleted Post. {status, message, data}
 */
const deletePost = ({
  postDb,
}) => async (params,req,res) => {
  let {
    query,isWarning 
  } = params;
  let deletedPost = {};
  if (isWarning) {
    const getDependencyCount = makeGetDependencyCount({
      postDb,
    });
    return await getDependencyCount(query);
  } else {
    const deleteWithDependency = makeDeleteWithDependency({
      postDb,
    });
    return await deleteWithDependency(query);
  }
};

module.exports = deletePost;