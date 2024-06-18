/**
 * addTermTaxonomy.js
 */

const termTaxonomyEntity = require('../../entities/termTaxonomy');
const response = require('../../utils/response');
/**
 * @description : create new record of termTaxonomy in database.
 * @param {Object} dataToCreate : data for create new document.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : response of create. {status, message, data}
 */
const addTermTaxonomy = ({
  termTaxonomyDb, createValidation
}) => async (dataToCreate, req, res) => {
  const validateRequest = await createValidation(dataToCreate);
  if (!validateRequest.isValid) {
    return response.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
  }
  let termTaxonomy = termTaxonomyEntity(dataToCreate);
  termTaxonomy = await termTaxonomyDb.create(termTaxonomy);
  return response.success({ data: termTaxonomy });
};
module.exports = addTermTaxonomy;