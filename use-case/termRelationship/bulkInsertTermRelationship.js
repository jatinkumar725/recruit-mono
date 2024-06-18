
/**
 * bulkInsertTermRelationship.js
 */

const termRelationshipEntity = require('../../entities/termRelationship');
const response = require('../../utils/response');

/**
 * @description : create multiple records  in database.
 * @param {Object} dataToCreate : data for creating documents.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : created TermRelationship(s). {status, message, data}
 */

const bulkInsertTermRelationship = ({ termRelationshipDb }) => async (dataToCreate, req, res) => {
  let termRelationshipEntities = dataToCreate.map(item => termRelationshipEntity(item));
  let createdTermRelationship = await termRelationshipDb.create(termRelationshipEntities);
  return response.success({ data: { count: createdTermRelationship.length || 0 } });
};
module.exports = bulkInsertTermRelationship;