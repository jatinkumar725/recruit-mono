const response = require('../../utils/response');

const getDependencyCount = ({
  termTaxonomyDb, termRelationshipDb
}) => async (filter) => {

  try {

    // Step 1: Retrieve existing term relationships for the post
    const oldTermRelationships = await termRelationshipDb.findMany(filter, ['termTaxonomyId']);
    const termsToRemove = oldTermRelationships.map(rel => rel.termTaxonomyId);

    // Step 2: Delete the term relationships from the database
    const termRelationshipCnt = await termRelationshipDb.count({ objectId, termTaxonomyId: { $in: termsToRemove } });

    // Step 3: Update term counts
    const termTaxonomyCnt = await termTaxonomyDb.count({ termTaxonomyId: { $in: termsToRemove } });

    let result = {
      termTaxonomy: termTaxonomyCnt,
      termRelationship: termRelationshipCnt
    };

    return response.success({
      message: 'No. of Dependency found',
      data: result
    });

  } catch (error) {

    console.error(error);
    return response.internalServerError({ message: "An error occurred while updating term relationships." });

  }

};

const deleteWithDependency = ({
  termTaxonomyDb, termRelationshipDb
}) => async (filter) => {

  try {

    // Step 1: Retrieve existing term relationships for the post
    const oldTermRelationships = await termRelationshipDb.findMany(filter, ['termTaxonomyId']);
    const termsToRemove = oldTermRelationships.map(rel => rel.termTaxonomyId);

    // Step 2: Delete the term relationships from the database
    await termRelationshipDb.deleteMany({ ...filter });
    // await termRelationshipDb.deleteMany({ ...filter, termTaxonomyId: { $in: termsToRemove } });

    // Step 3: Update term counts
    const updatedTermCounts = await termTaxonomyDb.updateMany({
        termTaxonomyId: { $in: termsToRemove },
        count: { $gt: 0 } // Only update documents where count is greater than 0
      },
      {
        $inc: { count: -1 } // Decrement count by 1
    });

    return response.success({ message: "Term relationships updated successfully." });

  } catch (error) {

    console.error(error);
    return response.internalServerError({ message: "An error occurred while updating term relationships." });

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