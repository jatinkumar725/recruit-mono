/**
 *partialUpdateUser.js
 */

const response = require('../../utils/response');

/**
 * @description : partially update record with data by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {obj} : updated User. {status, message, data}
 */
const partialUpdateUser = ({ userDb }) => async (params,req,res) => {
  let { dataToUpdate, query } = params;
  const user = await userDb.updateOne(query,dataToUpdate);
  if (!user){
    return response.recordNotFound();
  }
  return response.success({ data: user });
};
module.exports = partialUpdateUser;