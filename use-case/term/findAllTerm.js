/**
 * findAllTerm.js
 */

const response = require('../../utils/response');
const TaxonomyObject = require('../../objects/taxonomy');

/**
 * @description : find all records from database based on query and options.
 * @param {Object} params : request body including option and query.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : found Term(s). {status, message, data}
 */
const findAllTerm = ({
  termDb, termTaxonomyDb, filterTermValidation, filterTermTaxonomyValidation
}) => async (params, req, res) => {

  let {
    query, options, isCountOnly
  } = params;

  /**
   * Term Taxonomy
   */

  // Term taxonomy validation
  const validateRequest = await filterTermTaxonomyValidation(options);
  if (!validateRequest.isValid) {
    return response.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
  }

  // Get term taxonomy(s)
  if (isCountOnly) {
    let totalRecords = await termTaxonomyDb.count(query);
    return response.success({ data: { totalRecords } });
  } else {

    // Term
    let foundTerm = await termDb.paginate(query, options);
    if (!foundTerm) {
      return response.recordNotFound();
    }

    // Term Taxonomy
    let foundTermTaxonomy = await termTaxonomyDb.paginate(query, options);
    if (!foundTermTaxonomy) {
      return response.recordNotFound();
    }

    const taxonomyInstance = new TaxonomyObject(foundTerm, foundTermTaxonomy);
    const termResult = taxonomyInstance.merge();

    return response.success({ data: termResult });
  }

};
module.exports = findAllTerm;