/**
 *addUser.js
 */

 const response = require('../../utils/response');
/**
 * @description : create new record of user in database.
 * @param {Object} dataToCreate : data for create new document.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : response of create. {status, message, data}
 */
const addUser = ({
  userDb,userEntity,createValidation 
}) => async (dataToCreate,req,res) => {
  const validateRequest = await createValidation(dataToCreate);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let user = userEntity(dataToCreate);
  user = await userDb.create(user);
  return response.success({ data:user });
};
module.exports = addUser;