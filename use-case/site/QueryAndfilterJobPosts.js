/**
 * QueryAndfilterJobPosts.js 
 */

const response = require('../../utils/response');
const TaxonomyObject = require('../../objects/taxonomy');
const { TAXONOMY, MAX_TERM_SEARCH_RESULTS, DEFAULT_TERM_SEARCH_RESULTS } = require('../../constants/termConstant');

const QueryAndfilterJobPosts = ({
    postDb,
    termDb,
    termTaxonomyDb,
    termRelationshipDb, 
    filterValidation
}) => async (dataToFilter, req, res) => {
  try {

    let {
        params, options
    } = dataToFilter;

    // Query post by keyword in title and designation
    const textQuery = {
        title: params.keyword,
        desgination: params.keyword,
    };

    const queryCm = await postDb.paginate(textQuery, options);

    // Query with special pages like fresher - experience contain 0, city ( delhi, mumbai, pincodes of delhi ), by department, designation, role  in this apply some filter already case sort filter
    // return post filter with details

    return response.success({ data: queryCm });
  } catch (error) {
    return response.internalServerError({ message: error.message });
  }
};

module.exports = QueryAndfilterJobPosts;