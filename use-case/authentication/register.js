const response = require('../../utils/response');
const responseStatus = require('../../utils/response/responseStatus');
const {
  JWT,
  JWT_TYPES,
  MODEL_TYPE,
  ACCOUNT_VERIFICATION,
  USER_QUERY_TYPES,
  // USER_QUERY_TYPE
} = require("../../constants/authConstant");
const sendPasswordBySMS = require('../common/sendPasswordBySMS');
const sendPasswordByEmail = require('../common/sendPasswordByEmail');
const sendEmailVerificationNotification = require('../common/sendEmailVerificationNotification');
const makeCheckUniqueFieldsInDatabase = require('../../utils/checkUniqueFieldsInDatabase');
const generateToken = require("../../utils/generateToken");
const dayjs = require("dayjs");
const filterObjectFromArray = require("../../utils/filterObjectFromArray");

/**
 * @description : user registration 
 * @param {Object} params : request for register
 * @return {Object} : response for register {status, message, data}
 */
const register = ({
  userDb,
  userTokensDb,
  roleDb,
  userRoleDb,
  codeDb,
  userEntity,
  createValidation,
}) => async (params, uniqueFields = ['email']) => {
  let isEmptyPassword = false;
  if (!params.password) {
    isEmptyPassword = true;
    params.password = Math.random().toString(36).slice(2);
  }

  let validateSchema = await createValidation(params);
  if (!validateSchema.isValid) {
    return response.validationError({ message: validateSchema.message });
  }

  let newUser = userEntity(params);
  
  let checkUniqueFieldsInDatabase = makeCheckUniqueFieldsInDatabase(userDb);
  let checkUniqueFields = await checkUniqueFieldsInDatabase(uniqueFields, newUser, 'REGISTER');
  
  if (checkUniqueFields.isDuplicate) {
    return response.validationError({ message: `${checkUniqueFields.value} already exists.Unique ${checkUniqueFields.field} are allowed.` });
  }

  const result = await userDb.create(newUser);

  if (isEmptyPassword && params.mobile) {
    await sendPasswordBySMS({
      mobile: params.mobile,
      password: params.password
    });
  }
  if (isEmptyPassword && params.email) {
    await sendPasswordByEmail({
      email: params.email,
      password: params.password
    });
  }

  // Generate tokens
  const accessToken = await generateToken(result, JWT_TYPES.Access, JWT[JWT_TYPES.Access][result.userType]);
  const refreshToken = await generateToken(result, JWT_TYPES.Refresh, JWT[JWT_TYPES.Refresh][result.userType]);

  const refreshExpire = dayjs().add(JWT[JWT_TYPES.Refresh].EXPIRES_IN, "second").toISOString();
  await userTokensDb.create({
    userId: result.id,
    model_type: MODEL_TYPE[result.userType],
    accessToken,
    refreshToken,
    tokenExpirationTime: refreshExpire,
  });
  
  // Add user role
  const role = await roleDb.findOne({ name: MODEL_TYPE[newUser.userType] });
  await userRoleDb.create({
    userId: result._id,
    roleId: role._id,
    model_type: MODEL_TYPE[newUser.userType],
  });

  // Send Email verification mail
  if (ACCOUNT_VERIFICATION[newUser.userType]?.email) {
    const makeSendEmailVerificationNotification = sendEmailVerificationNotification({ codeDb });
    await makeSendEmailVerificationNotification(result);
  }

  // Need to filter field with level 1, if required
  // ? Move this logic to controller
  // TODO: Do in seeker register
  // const userData = result.toJSON();
  const jsonResultData = result.toJSON();
  const userData = filterObjectFromArray(jsonResultData, USER_QUERY_TYPES[newUser.userType][1]);
  
  return response.success({ 
    data:  {
      ...userData,
      accessToken,
      refreshToken,
    }
  });

};

module.exports = register;