
/**
 * deleteTerm.js
 */

const makeGetDependencyCount = require('./deleteDependent').getDependencyCount;
const makeDeleteWithDependency = require('./deleteDependent').deleteWithDependency;
const response = require('../../utils/response');

/**
 * @description : delete record from database.
 * @param {Object} params : request body including query.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : deleted Term. {status, message, data}
 */
const deleteTerm = ({
  termDb, termTaxonomyDb, termRelationshipDb
}) => async (params, req, res) => {
  let {
    query, isWarning
  } = params;
  let deletedTerm = {};
  if (isWarning) {
    const getDependencyCount = makeGetDependencyCount({
      termDb,
      termTaxonomyDb,
      termRelationshipDb
    });
    return await getDependencyCount(query);
  } else {
    const deleteWithDependency = makeDeleteWithDependency({
      termDb,
      termTaxonomyDb,
      termRelationshipDb
    });
    return await deleteWithDependency(query);
  }
};

module.exports = deleteTerm;