/**
 * partialUpdateTerm.js
 */

const response = require('../../utils/response');

/**
 * @description : partially update record with data by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {obj} : updated Term. {status, message, data}
 */
const partialUpdateTerm = ({ termDb }) => async (params, req, res) => {
  const term = await termDb.updateOne(params.query, params.dataToUpdate);
  if (!term) {
    return response.recordNotFound();
  }
  return response.success({ data: term });
};
module.exports = partialUpdateTerm;