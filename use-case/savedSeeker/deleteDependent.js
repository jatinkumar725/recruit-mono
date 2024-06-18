const response = require('../../utils/response');

const getDependencyCount = ({
  savedSeekerDb, recruiterDb
}) => async (filter) => {
  let savedSeeker = await savedSeekerDb.findOne(filter);
  if (savedSeeker) {

    const termRelationshipCnt = await recruiterDb.count({ id: filter.recruiterId });

    let result = {
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
  savedSeekerDb, recruiterDb
}) => async (filter) => {
  let term = await savedSeekerDb.findMany(filter);
  if (term.length) {
    let termIds = term.map((obj) => obj.termId);

    /**
     * Term Taxonomy
     * 
     */

    // Get Term Taxonomy(s) before delete
    const termTaxonomyFilter = { '$or': [{ termId: { '$in': termIds } }] };
    const termTaxonomy = await recruiterDb.findMany(termTaxonomyFilter);

    // Get Term Taxonomy(s) Ids before delete
    const termTaxonomyIds = termTaxonomy.map((obj) => obj.termTaxonomyId);

    // Delete Term Taxonomy(s)
    const termTaxonomyCnt = await recruiterDb.deleteMany(termTaxonomyFilter);

    /**
     * Term Relationship
     * 
     */

    // Get Term Relationship(s) before delete
    const termRelationshipFilter = { '$or': [{ termTaxonomyId: { '$in': termTaxonomyIds } }] };
    const termRelationship = await termRelationshipDb.findMany(termRelationshipFilter);

    // Delete Term Relationship(s)
    const termRelationshipCnt = await termRelationshipDb.count(termRelationshipFilter);

    // Delete Term(s)
    let deletedTerm = await savedSeekerDb.deleteMany(filter);

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
  savedSeekerDb, recruiterDb, termRelationshipDb
}) => async (filter, updateBody) => {
  let term = await savedSeekerDb.findMany(filter);
  if (term.length) {
    let termIds = term.map((obj) => obj.termId);

    /**
     * Term Taxonomy
     * 
     */

    // Get Term Taxonomy(s) before delete
    const termTaxonomyFilter = { '$or': [{ termId: { '$in': termIds } }] };
    const termTaxonomy = await recruiterDb.findMany(termTaxonomyFilter);

    // Get Term Taxonomy(s) Ids before delete
    const termTaxonomyIds = termTaxonomy.map((obj) => obj.termTaxonomyId);

    // Delete Term Taxonomy(s)
    const updatedTermTaxonomyCnt = await recruiterDb.updateMany(termTaxonomyFilter, updateBody);

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
    let updatedTerm = await savedSeekerDb.updateMany(filter, updateBody);

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
