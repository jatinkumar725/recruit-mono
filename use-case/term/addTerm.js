/**
 * addTerm.js
 */
const { TAXONOMY } = require('../../constants/termConstant');
const termEntity = require('../../entities/term');
const termTaxonomyEntity = require('../../entities/termTaxonomy');
const response = require('../../utils/response');
const TaxonomyObject = require('../../objects/taxonomy');

/**
 * @description : create new record of term in database.
 * @param {Object} dataToCreate : data for create new document.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : response of create. {status, message, data}
 */
const addTerm = ({
  termDb, termTaxonomyDb, createValidation
}) => async (dataToCreate, req, res) => {
  try {
    const validateRequest = await createValidation(dataToCreate);
    if (!validateRequest.isValid) {
      return response.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
    }

    /**
     * Term
     */

    // Add Term
    let term = termEntity(dataToCreate);
    term = await termDb.create(term);


    /**
     * Term Taxonomy
     */

    // Set data to create for term taxonomy
    let taxonomyToAttach = dataToCreate.taxonomy?.toLowerCase();
    taxonomyToAttach = TAXONOMY[taxonomyToAttach]?.name;

    const dataToCreateForTermTaxonomy = {
      termId: term.termId,
      taxonomy: taxonomyToAttach,
    };

    // Add term taxonomy
    let termTaxonomy = termTaxonomyEntity(dataToCreateForTermTaxonomy);
    termTaxonomy = await termTaxonomyDb.create(termTaxonomy);

    // ? Uncomment If needed in future
    // const taxonomyInstance = new TaxonomyObject(term, termTaxonomy);
    // const termResult = taxonomyInstance.mergeSingleTerm();

    // return response.success({ data: termResult });

    return response.success({ data: term });
  } catch (error) {
    console.log(error)
    return response.internalServerError({ message: error.message });
  }
};

module.exports = addTerm;