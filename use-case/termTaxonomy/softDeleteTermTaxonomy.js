/**
 * softDeleteTermTaxonomy.js
 */

const makeGetDependencyCount = require('./deleteDependent').getDependencyCount;
const makeSoftDeleteWithDependency = require('./deleteDependent').softDeleteWithDependency;
const response = require('../../utils/response');

/**
 * @description : soft delete record from database by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response..
 * @return {Object} : deactivated TermTaxonomy. {status, message, data}
 */
const softDeleteTermTaxonomy = ({
  termTaxonomyDb, pincodeDb
}) => async (params, req, res) => {
  let {
    query, dataToUpdate, isWarning
  } = params;
  let updatedTermTaxonomy = {};
  if (isWarning) {
    const getDependencyCount = makeGetDependencyCount({
      termTaxonomyDb,
      pincodeDb
    });
    return await getDependencyCount(query);
  } else {
    const softDeleteWithDependency = makeSoftDeleteWithDependency({
      termTaxonomyDb,
      pincodeDb
    });
    return await softDeleteWithDependency(query, dataToUpdate);
  }
};
module.exports = softDeleteTermTaxonomy;