/**
 * updateTermTaxonomy.js
 */

const termTaxonomyEntity = require('../../entities/termTaxonomy');
const response = require('../../utils/response');

/**
 * @description : update record with data by id.
 * @param {Object} params : request body including query and data.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : updated TermTaxonomy. {status, message, data}
 */
const updateTermTaxonomy = ({
  termTaxonomyDb, updateValidation
}) => async (params, req, res) => {
  let {
    dataToUpdate, query
  } = params;
  const validateRequest = await updateValidation(dataToUpdate);
  if (!validateRequest.isValid) {
    return response.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
  }
  let termTaxonomy = termTaxonomyEntity(dataToUpdate);
  termTaxonomy = await termTaxonomyDb.updateOne(query, termTaxonomy);
  if (!termTaxonomy) {
    return response.recordNotFound();
  }
  return response.success({ data: termTaxonomy });
};
module.exports = updateTermTaxonomy;