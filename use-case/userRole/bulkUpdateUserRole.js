/**
 *bulkUpdateUserRole.js
 */

const response = require('../../utils/response');

/**
 * @description : update multiple records of userRole with data by filter.
 * @param {Object} params : request body including query and data.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : response of bulkUpdate. {status, message, data}
 */
const bulkUpdateUserRole = ({ userRoleDb }) => async ({ query, dataToUpdate, isCountOnly },req,res) => {
  const updatedUserRole = await userRoleDb.updateMany(query, dataToUpdate, isCountOnly);
  return response.success({ data:{ count:updatedUserRole } });
};
module.exports = bulkUpdateUserRole;