const { EDUCATION_TYPES } = require('../../../constants/termConstant');
const response = require('../../../utils/response');
const responseHandler = require('../../../utils/response/responseHandler');

const getListEntity = (getListEntityUsecase) => async (req, res) => {
  try {
    const { 
      category,
      limit,
      isCountOnly 
    } = req.query;

    const { type } = req.params;
    
    if ( ! type ) {
      return responseHandler(res, response.badRequest({ message: 'Invalid request parameter - type is required' }));
    }

    if ( ! category ) {
      return responseHandler(res, response.badRequest({ message: 'Invalid request parameter - category is required' }));
    }

    const query = {
      name: EDUCATION_TYPES[type],
    };

    const result = await getListEntityUsecase({ query, options: { taxonomy: category, limit }, isCountOnly }, req, res);
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

module.exports = {
  getListEntity,
};