const response = require('../../../utils/response');
const responseHandler = require('../../../utils/response/responseHandler');

const findAllTerm = (findAllTermUsecase) => async (req, res) => {
  try {
    let { 
      query, 
      method,
      category,
      returnFields,
      limit,
      isCountOnly 
    } = req.query;

    if ( ! method ) {
      return responseHandler(res, response.badRequest({ message: 'Invalid request parameter - method is required' }));
    }

    if ( ! query && method === "search" ) {
      return responseHandler(res, response.badRequest({ message: 'Invalid request parameter - query is required' }));
    }
    
    if ( ! category ) {
      return responseHandler(res, response.badRequest({ message: 'Invalid request parameter - category is required' }));
    }

    if ( method === "pre" ) {
      query = "";
    }

    const result = await findAllTermUsecase({ query, options: { taxonomy: category, limit, fields: returnFields }, method, isCountOnly }, req, res);
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

module.exports = {
  findAllTerm,
};