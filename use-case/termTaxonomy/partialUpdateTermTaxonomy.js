/**
 * partialUpdateTermTaxonomy.js
 */

const response = require('../../utils/response');

/**
 * @description : partially update record with data by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {obj} : updated TermTaxonomy. {status, message, data}
 */
const partialUpdateTermTaxonomy = ({ termTaxonomyDb }) => async (params, req, res) => {
  const termTaxonomy = await termTaxonomyDb.updateOne(params.query, params.dataToUpdate);
  if (!termTaxonomy) {
    return response.recordNotFound();
  }
  return response.success({ data: termTaxonomy });
};
module.exports = partialUpdateTermTaxonomy;