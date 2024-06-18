/**
 * updateTerm.js
 */

const termEntity = require('../../entities/term');
const termTaxonomyEntity = require('../../entities/termTaxonomy');
const response = require('../../utils/response');
const { rp_parse_args } = require('../../utils/common');
const TaxonomyObject = require('../../objects/taxonomy');

/**
 * @description : update record with data by id.
 * @param {Object} params : request body including query and data.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : updated Term. {status, message, data}
 */
const updateTerm = ({
  termDb, termTaxonomyDb, updateValidation
}) => async (params, req, res) => {
  let {
    dataToUpdate, query
  } = params;

  try {
    // Defaults
    const defaults = {
      parentId: 0,
    };

    const args = rp_parse_args(dataToUpdate, defaults);

    // Validate request data
    const validateRequest = await updateValidation(args);
    if (!validateRequest.isValid) {
      return response.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
    }

    // Get term Id
    const termId = query.termId;

    // Check if term exists
    let term = await termDb.findOne(query);
    if (!term) {
      return response.recordNotFound();
    }

    // Check if term taxonomy exists
    let termTaxonomy = await termTaxonomyDb.findOne(query);
    if (!termTaxonomy) {
      return response.recordNotFound();
    }

    // Check if term parent exists
    if (args.parentId > 0) {

      // Cannot be parent of itself
      if (termId == args.parentId) {
        return response.validationError({ message: "Cannot be parent of itself." });
      }

      const parentTerm = await termDb.findOne({ termId: args.parentId });
      if (!parentTerm) {
        return response.recordNotFound({ message: 'Invalid parentId' });
      }

    } else {

      args.parentId = 0;

    }

    // Update term data
    term = termEntity(args);
    term = await termDb.updateOne(query, term);

    // Update term taxonomy data
    termTaxonomy = termTaxonomyEntity({ parentId: args.parentId });
    termTaxonomy = await termTaxonomyDb.updateOne(query, termTaxonomy);

    // const taxonomyInstance = new TaxonomyObject(term, termTaxonomy);
    // const termResult = taxonomyInstance.mergeSingleTerm();

    // return response.success({ data: termResult });

    return response.success({ data: term });

  } catch (error) {
    console.error("Error updating term:", error);
    return response.internalServerError({ message: "Failed to update term." });
  }
};

module.exports = updateTerm;