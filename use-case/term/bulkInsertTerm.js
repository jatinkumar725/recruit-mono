/**
 * bulkInsertTerm.js
 */
const { TAXONOMY } = require('../../constants/termConstant');
const termEntity = require('../../entities/term');
const termTaxonomyEntity = require('../../entities/termTaxonomy');
const response = require('../../utils/response');

/**
 * @description : create multiple records in the database.
 * @param {Object} dataToCreate : data for creating documents.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : created Terms. {status, message, data}
 */

const bulkInsertTerm = ({
  termDb,
  termTaxonomyDb,
  createValidation
}) => async (dataToCreate, req, res) => {

  // Validate each term data
  for (const newTerm of dataToCreate) {
    const validateRequest = await createValidation(newTerm);
    if (!validateRequest.isValid) {
      return response.validationError({ message: validateRequest.message });
    }
  }

  /**
   * Term
   */

  // Add Term
  let termEntities = dataToCreate.map(item => termEntity(item));
  let createdTerms = await termDb.create(termEntities);

  /**
   * Term Taxonomy
   */

  // Set data to create for term taxonomy
  let termTaxonomyEntities = createdTerms.map(term => {

    const dataTerm = dataToCreate.find(dataTerm => dataTerm.name === term.name);

    if (dataTerm) {
      const taxonomyToAttach = TAXONOMY[dataTerm.taxonomy?.toLowerCase()]?.name;

      const dataToCreateForTermTaxonomy = {
        termId: term.termId,
        taxonomy: taxonomyToAttach
      };

      // Term Taxonomy Entity
      const termTaxonomy = termTaxonomyEntity(dataToCreateForTermTaxonomy);

      return termTaxonomy;
    } else {
      throw new Error(`No matching term found for ${term.name}`);
    }

  });

  let createdTermTaxonomies = await termTaxonomyDb.create(termTaxonomyEntities);

  return response.success({ data: { count: createdTerms.length || 0 } });
};
module.exports = bulkInsertTerm;