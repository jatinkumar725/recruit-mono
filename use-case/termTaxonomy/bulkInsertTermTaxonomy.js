
/**
 * bulkInsertTermTaxonomy.js
 */

const termTaxonomyEntity = require('../../entities/termTaxonomy');
const response = require('../../utils/response');

/**
 * @description : create multiple records  in database.
 * @param {Object} dataToCreate : data for creating documents.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : created TermTaxonomy(s). {status, message, data}
 */

const bulkInsertTermTaxonomy = ({ termTaxonomyDb }) => async (dataToCreate, req, res) => {
  let termTaxonomyEntities = dataToCreate.map(item => termTaxonomyEntity(item));
  let createdTermTaxonomy = await termTaxonomyDb.create(termTaxonomyEntities);
  return response.success({ data: { count: createdTermTaxonomy.length || 0 } });
};
module.exports = bulkInsertTermTaxonomy;