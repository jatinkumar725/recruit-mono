/**
 * suggester.js 
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
const suggester = ({
  termDb, termTaxonomyDb, filterTermValidation, filterTermTaxonomyValidation
}) => async (params, req, res) => {
  try {

    let {
      query, options, method, isCountOnly
    } = params;

    let termResult;
    if (isCountOnly) {
      // Count total records
      const totalRecords = await termTaxonomyDb.count(query);
      termResult = { totalRecords };
    } else {
      // Search for terms
      const { taxonomy, limit = DEFAULT_TERM_SEARCH_RESULTS, fields } = options;

      let taxonomyLowerCase = taxonomy.toLowerCase();

      if ( ! TAXONOMY[taxonomyLowerCase] ) {
        return response.badRequest({ message: 'Invalid category' });
      }

      if ( limit > MAX_TERM_SEARCH_RESULTS ) {
        return response.badRequest({ message: 'Maximum limit exceeded' });
      }

      const fieldsArray = fields.split(',') || [];

      const termQuery = {
        $or: [ 
          { name: { $regex: `^${query}`, $options: 'i' } }, 
          { name: { $regex: `${query}`, $options: 'i' } }
        ], 
        isActive: true,
        isDeleted: false
      };

      // Perform search terms based on text
      const foundTerms = await termDb.findMany(termQuery);
            
      // Now filter terms based on taxonomy
      const foundTermTaxonomies = await termTaxonomyDb.findMany({ $and: [ { termId: { $in: foundTerms.map(term => term.termId) } }, { taxonomy: taxonomyLowerCase } ] });

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

module.exports = suggester;