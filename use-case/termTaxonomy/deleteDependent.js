const response = require('../../utils/response');

const getDependencyCount = ({
  termDb, termTaxonomyDb, termRelationshipDb
}) => async (filter) => {
  let term = await termDb.findMany(filter);
  if (term.length) {

    let termIds = term.map((obj) => obj.termId);

    // Term Taxonomy
    const termTaxonomyFilter = { '$or': [{ termId: { '$in': termIds } }] };
    const termTaxonomy = await termTaxonomyDb.findMany(termTaxonomyFilter);
    const termTaxonomyCnt = termTaxonomy.length;
    const termTaxonomyIds = termTaxonomy.map((obj) => obj.termTaxonomyId);

    // Term Relationship
    const termRelationshipFilter = { '$or': [{ termTaxonomyId: { '$in': termTaxonomyIds } }] };
    const termRelationshipCnt = await termRelationshipDb.count(termRelationshipFilter);

    let result = {
      termTaxonomy: termTaxonomyCnt,
      termRelationship: termRelationshipCnt
    };

    return response.success({
      message: 'No. of Dependency found',
      data: result
    });
  } else {
    return response.success({
      message: 'No. of Dependency found',
      data: { term: 0 }
    });
  }
};

const deleteWithDependency = ({
  termDb, termTaxonomyDb, termRelationshipDb
}) => async (filter) => {
  let term = await termDb.findMany(filter);
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
    const deletedTermTaxonomy = await termTaxonomyDb.deleteMany(termTaxonomyFilter);
    const termTaxonomyCnt = deletedTermTaxonomy.deletedCount;

    /**
     * Term Relationship
     * 
     */

    // Get Term Relationship(s) before delete
    const termRelationshipFilter = { '$or': [{ termTaxonomyId: { '$in': termTaxonomyIds } }] };
    const termRelationship = await termRelationshipDb.findMany(termRelationshipFilter);

    // Delete Term Relationship(s)
    const deletedTermRelationship = await termRelationshipDb.count(termRelationshipFilter);
    const termRelationshipCnt = deletedTermRelationship.deletedCount;

    // Delete Term(s)
    let deletedTerm = await termDb.deleteMany(filter);

    let result = {
      termTaxonomy: termTaxonomyCnt,
      termRelationship: termRelationshipCnt,
    };

    return response.success({
      message: 'No. of Dependency deleted',
      data: result
    });
  } else {
    return response.success({
      message: 'No. of Dependency deleted',
      data: { term: 0 }
    });
  }
};

const softDeleteWithDependency = ({
  termDb, termTaxonomyDb, termRelationshipDb
}) => async (filter, updateBody) => {
  let term = await termDb.findMany(filter);
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
    const updatedTermTaxonomyCnt = await termTaxonomyDb.updateMany(termTaxonomyFilter, updateBody);

    /**
     * Term Relationship
     * 
     */

    // Get Term Relationship(s) before delete
    const termRelationshipFilter = { '$or': [{ termTaxonomyId: { '$in': termTaxonomyIds } }] };
    const termRelationship = await termRelationshipDb.findMany(termRelationshipFilter);

    // Delete Term Relationship(s)
    const updatedTermRelationshipCnt = await termRelationshipDb.count(termRelationshipFilter);
s
    // Delete Term(s)
    let updatedTerm = await termDb.updateMany(filter, updateBody);

    let result = { 
      termTaxonomy: updatedTermTaxonomyCnt, 
      termRelationship: updatedTermRelationshipCnt,
    };

    return response.success({
      message: 'No. of Dependency deleted',
      data: result
    });
  } else {
    return response.success({
      message: 'No. of Dependency deleted',
      data: { term: 0 }
    });
  }
};
module.exports = {
  getDependencyCount,
  deleteWithDependency,
  softDeleteWithDependency
};