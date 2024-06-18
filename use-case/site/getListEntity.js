/**
 * getListEntity.js 
 */

const response = require('../../utils/response');
const TaxonomyObject = require('../../objects/taxonomy');
const { TAXONOMY, MAX_TERM_SEARCH_RESULTS, DEFAULT_TERM_SEARCH_RESULTS } = require('../../constants/termConstant');
/**
 * @description Find all records from the database based on query and options.
 * @param {Object} params Request parameters including options and query.
 * @param {Object} req The req object represents the HTTP request.
 * @param {Object} res The res object represents HTTP response.
 * @return {Object} Found Term(s). {status, message, data}
 */
const getListEntity = ({
  termDb, termTaxonomyDb, filterTermValidation, filterTermTaxonomyValidation
}) => async (params, req, res) => {
  try {

    let {
      query, options, isCountOnly
    } = params;

    let termResult;
    if (isCountOnly) {
      // Count total records
      const totalRecords = await termTaxonomyDb.count(query);
      termResult = { totalRecords };
    } else {

      // Get parent termId by name
      const parentTerm = await termDb.findOne(query, [ 'termId' ]);

      if (!parentTerm) {
        return response.badRequest({ message: 'Invalid parent term' });
      }

      // Search for terms
      const { taxonomy, limit = DEFAULT_TERM_SEARCH_RESULTS, fields } = options;

      let taxonomyLowerCase = taxonomy.toLowerCase();

      if ( ! TAXONOMY[taxonomyLowerCase] ) {
        return response.badRequest({ message: 'Invalid category' });
      }

      if ( limit > MAX_TERM_SEARCH_RESULTS ) {
        return response.badRequest({ message: 'Maximum limit exceeded' });
      }

      const fieldsArray = [ 'termId', 'name' ];
            
      // Now filter terms based on taxonomy
      const foundTermTaxonomies = await termTaxonomyDb.findMany({ $and: [ { parentId: parentTerm.termId }, { taxonomy: taxonomyLowerCase } ] });

      // Perform search terms based on text
      const foundTerms = await termDb.findMany({ termId: { $in: foundTermTaxonomies.map(term => term.termId) } });

      const taxonomyInstance = new TaxonomyObject(
        { data: foundTerms }, 
        { data: foundTermTaxonomies, }
      );
      termResult = taxonomyInstance.merge( fieldsArray );
      termResult = {
        data: termResult.data.slice(0, limit),
      }

    }

    return response.success({ data: termResult });
  } catch (error) {
    return response.internalServerError({ message: error.message });
  }
};

module.exports = getListEntity;