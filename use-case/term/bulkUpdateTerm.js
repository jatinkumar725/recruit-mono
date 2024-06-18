// TODO: This function needs to improve more...

/**
 * bulkUpdateTerm.js
 */

const termEntity = require('../../entities/term');
const termTaxonomyEntity = require('../../entities/termTaxonomy');
const response = require('../../utils/response');
const { rp_parse_args } = require('../../utils/common');

/**
 * @description : update multiple records of term with data by filter.
 * @param {Object} params : request body including query and data.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : response of bulkUpdate. {status, message, data}
 */
const bulkUpdateTerm = ({ 
  termDb, termTaxonomyDb
 }) => async (params, req, res) => {
  let {
    query, dataToUpdate, isCountOnly
  } = params;

  try {

    // Defaults
    const defaults = {
      parentId: 0,
    };

    // Name cannot be empty
    if ( '' === dataToUpdate.name ) {
      return response.validationError({ message: `Name cannot be empty.` });
    }

    const updatedTerm = await termDb.updateMany(query, dataToUpdate, isCountOnly);

    // Update parentId in termTaxonomyDb
    // await termTaxonomyDb.updateMany(query, { parentId: dataToUpdate.parentId });
    await termTaxonomyDb.updateMany(query, dataToUpdate, isCountOnly);

    return response.success({ data: { count: updatedTerm } });
  } catch (error) {
    console.error("Error updating terms in bulk:", error);
    return response.internalError({ message: "Failed to update terms in bulk." });
  }
};
module.exports = bulkUpdateTerm;