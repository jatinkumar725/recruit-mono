/**
 * partialUpdateTermRelationship.js
 */

const response = require('../../utils/response');

/**
 * @description : partially update record with data by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {obj} : updated TermRelationship. {status, message, data}
 */
const partialUpdateTermRelationship = ({ termRelationshipDb }) => async (params, req, res) => {
  const termRelationship = await termRelationshipDb.updateOne(params.query, params.dataToUpdate);
  if (!termRelationship) {
    return response.recordNotFound();
  }
  return response.success({ data: termRelationship });
};
module.exports = partialUpdateTermRelationship;