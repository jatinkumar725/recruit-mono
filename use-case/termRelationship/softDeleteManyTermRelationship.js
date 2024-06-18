/**
 * softDeleteManyTermRelationship.js
 */

const makeGetDependencyCount = require('./deleteDependent').getDependencyCount;
const makeSoftDeleteWithDependency = require('./deleteDependent').softDeleteWithDependency;
const response = require('../../utils/response');

/**
 * @description : soft delete multiple records from database by ids;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : number of deactivated documents. {status, message, data}
 */
const softDeleteManyTermRelationship = ({
  termRelationshipDb, pincodeDb
}) => async (params, req, res) => {
  let {
    query, dataToUpdate, isWarning
  } = params;
  let updatedTermRelationship = {};
  if (isWarning) {
    const getDependencyCount = makeGetDependencyCount({
      termRelationshipDb,
      pincodeDb
    });
    return await getDependencyCount(query);
  } else {
    const softDeleteWithDependency = makeSoftDeleteWithDependency({
      termRelationshipDb,
      pincodeDb
    });
    return await softDeleteWithDependency(query, dataToUpdate);
  }
};
module.exports = softDeleteManyTermRelationship;
