/**
 * bulkUpdateTermRelationship.js
 */

const response = require('../../utils/response');

/**
 * @description : update multiple records of termRelationship with data by filter.
 * @param {Object} params : request body including query and data.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : response of bulkUpdate. {status, message, data}
 */
const bulkUpdateTermRelationship = ({ termRelationshipDb }) => async ({ query, dataToUpdate, isCountOnly }, req, res) => {
  const updatedTermRelationship = await termRelationshipDb.updateMany(query, dataToUpdate, isCountOnly);
  return response.success({ data: { count: updatedTermRelationship } });
};
module.exports = bulkUpdateTermRelationship;