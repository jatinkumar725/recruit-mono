
/**
 *bulkInsertUser.js
 */

const response = require('../../utils/response');
const makeCheckUniqueFieldsInDatabase = require('../../utils/checkUniqueFieldsInDatabase');

/**
 * @description : create multiple records  in database.
 * @param {Object} dataToCreate : data for creating documents.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : created Users. {status, message, data}
 */

const bulkInsertUser = ({ userDb, userEntity, createValidation }) => async (dataToCreate, req, res) => {

  // Validate each user data
  for (const newUser of dataToCreate) {
    const validateRequest = await createValidation(newUser);
    if (!validateRequest.isValid) {
      return response.validationError({ message: validateRequest.message });
    }
  }

  let userEntities = dataToCreate.map(item => userEntity(item));

  let checkUniqueFieldsInDatabase = makeCheckUniqueFieldsInDatabase(userDb);
  let checkUniqueFields = await checkUniqueFieldsInDatabase(['email'], dataToCreate, 'BULK_INSERT');

  if (checkUniqueFields.isDuplicate) {
    return response.validationError({ message: `${checkUniqueFields.value} already exists.Unique ${checkUniqueFields.field} are allowed.` });
  }

  let createdUsers = await userDb.create(userEntities);
  return response.success({ data: { count: createdUsers.length || 0 } });
};
module.exports = bulkInsertUser;