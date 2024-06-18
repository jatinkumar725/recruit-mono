/**
 * getTerm.js
 */

const response = require('../../utils/response');
const TaxonomyObject = require('../../objects/taxonomy');

/**
 * @description : find record from database by id;
 * @param {Object} params : request body including option and query.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : found Term. {status, message, data}
 */
const getTerm = ({
  termDb, termTaxonomyDb, filterTermValidation, filterTermTaxonomyValidation
}) => async (params, req, res) => {
  let {
    query, options
  } = params;

  /**
   * Term
   */

  // Term validation
  const validateTermRequest = await filterTermValidation(options);
  if (!validateTermRequest.isValid) {
    return response.validationError({ message: `Invalid values in parameters, ${validateTermRequest.message}` });
  }

  // Get term
  let foundTerm = await termDb.findOne(query, options);
  if (!foundTerm) {
    return response.recordNotFound();
  }
  
  /**
   * Term Taxonomy
   */

  // Term taxonomy validation
  const validateTermTaxonomyRequest = await filterTermTaxonomyValidation(options);
  if (!validateTermTaxonomyRequest.isValid) {
    return response.validationError({ message: `Invalid values in parameters, ${validateTermTaxonomyRequest.message}` });
  }

  // Get term taxonomy
  let foundTermTaxonomy = await termTaxonomyDb.findOne(query, options);
  if (!foundTermTaxonomy) {
    return response.recordNotFound();
  }

  const taxonomyInstance = new TaxonomyObject(foundTerm, foundTermTaxonomy);
  const termResult = taxonomyInstance.mergeSingleTerm();
  
  return response.success({ data: termResult });
};
module.exports = getTerm;