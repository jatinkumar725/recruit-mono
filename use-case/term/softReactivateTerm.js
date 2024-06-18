/**
 * softReactivateTerm.js
 */

const makeGetDependencyCount = require('./deleteDependent').getDependencyCount;
const makeSoftDeleteWithDependency = require('./deleteDependent').softDeleteWithDependency;
const response = require('../../utils/response');

/**
 * @description : soft reactivate record from database by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response..
 * @return {Object} : deactivated Term`. {status, message, data}
 */
const softReactivateTerm = ({
  termDb, termTaxonomyDb, termRelationshipDb
}) => async (params, req, res) => {
  let {
    query, dataToUpdate
  } = params;

  let term = await termDb.findMany(query);
  if (term.length) {
    let termIds = term.map((obj) => obj.termId);

    /**
     * Term Taxonomy
     * 
     */

    // Get Term Taxonomy(s) before delete
    const termTaxonomyFilter = { '$or': [{ termId: { '$in': termIds } }] };
    const termTaxonomy = await termTaxonomyDb.findMany(termTaxonomyFilter);

    // Get Term Taxonomy(s) Ids before delete
    const termTaxonomyIds = termTaxonomy.map((obj) => obj.termTaxonomyId);

    // Delete Term Taxonomy(s)
    const updatedTermTaxonomyCnt = await termTaxonomyDb.updateMany(termTaxonomyFilter, dataToUpdate);

    /**
     * Term Relationship
     * 
     */

    // Get Term Relationship(s) before delete
    const termRelationshipFilter = { '$or': [{ termTaxonomyId: { '$in': termTaxonomyIds } }] };
    const termRelationship = await termRelationshipDb.findMany(termRelationshipFilter);

    // Delete Term Relationship(s)
    const updatedTermRelationshipCnt = await termRelationshipDb.count(termRelationshipFilter);

    // Delete Term(s)
    let updatedTerm = await termDb.updateMany(filter, dataToUpdate);

    let result = { 
      termTaxonomy: updatedTermTaxonomyCnt, 
      termRelationship: updatedTermRelationshipCnt,
    };

    return response.success({
      message: 'No. of Dependency reactivated',
      data: result
    });
  }
  
};
module.exports = softReactivateTerm;