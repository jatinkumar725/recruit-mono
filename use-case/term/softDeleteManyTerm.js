/**
 * softDeleteManyTerm.js
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
const softDeleteManyTerm = ({
  termDb, termTaxonomyDb, termRelationshipDb
}) => async (params, req, res) => {
  let {
    query, dataToUpdate, isWarning
  } = params;
  let updatedTerm = {};
  if (isWarning) {
    const getDependencyCount = makeGetDependencyCount({
      termDb,
      termTaxonomyDb,
      termRelationshipDb
    });
    return await getDependencyCount(query);
  } else {
    const softDeleteWithDependency = makeSoftDeleteWithDependency({
      termDb,
      termTaxonomyDb,
      termRelationshipDb
    });
    return await softDeleteWithDependency(query, dataToUpdate);
  }
};
module.exports = softDeleteManyTerm;
