const authConstant = require('../../../../constants/authConstant');
const {
  JWT,
  JWT_TYPES,
  SITE_COOKIES,
  USER_QUERY_TYPES
} = require("../../../../constants/authConstant");
const response = require('../../../../utils/response');
const responseHandler = require('../../../../utils/response/responseHandler');
const TermRelationship = require('../../../../objects/relationship');
const mergeObjects = require('../../../../utils/mergeObjects');
const filterObjectFromArray = require('../../../../utils/filterObjectFromArray');

const register = (registerUsecase, updateTermRelationshipUsecase) => async (req, res) => {
  try {
    req.body.userType = authConstant.USER_TYPES.Recruiter;

    let result = await registerUsecase(req.body, ['email', 'mobile']);

    if (result.data) {

      // Create an instance of TermRelationship
      const termRelationship = new TermRelationship();
      const { termData: reqTermData, restData: reqRestData } = termRelationship.separateTerms(req.body);
      const { termData: resultTermData, restData: resultRestData } = termRelationship.separateTerms(result.data);

      const mergedTermData = mergeObjects(reqTermData, resultTermData);

      if (Object.keys(mergedTermData).length) {

        const res1 = await updateTermRelationshipUsecase({
          objectId: result.data.userId,
          model_type: 'Recruiter',
          termsData: mergedTermData
        });

      }

      // Setting cookie
      res.cookie(
        'rpc_at',
        result.data.accessToken,
        SITE_COOKIES.rpc_at
      );

      res.cookie(
        'rpc_rt',
        result.data.refreshToken,
        SITE_COOKIES.rpc_rt
      );

      // Set response data for client to level 1
      const filteredUserData = filterObjectFromArray(resultRestData, USER_QUERY_TYPES[authConstant.USER_TYPES.Recruiter][1]);
      result.data = filteredUserData;

    }

    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const forgotPassword = (forgotPasswordUsecase) => async (req, res) => {
  try {
    let result = await forgotPasswordUsecase(req.body);
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const validateResetPasswordOtp = (validateResetPasswordOtpUsecase) => async (req, res) => {
  try {
    let result = await validateResetPasswordOtpUsecase(req.body);
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const resetPassword = (resetPasswordUsecase) => async (req, res) => {
  try {
    let result = await resetPasswordUsecase(req.body);
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const authentication = (authenticationUsecase) => async (req, res) => {
  try {
    let result = await authenticationUsecase(req.body, authConstant.PLATFORM.RECRUITER_CLIENT);

    if (result.data) {

      // Setting cookie
      res.cookie(
        'rpc_at',
        result.data.accessToken,
        SITE_COOKIES.rpc_at
      );

      res.cookie(
        'rpc_rt',
        result.data.refreshToken,
        SITE_COOKIES.rpc_rt
      );

      delete result.data.accessToken;
      delete result.data.refreshToken;

    }

    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const logout = (logoutUsecase) => async (req, res) => {
  try {
    let user = req.user;
    let accessToken = req.headers.authorization.replace('Bearer ', '');
    let result = await logoutUsecase(user, accessToken, req, res);
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const verifyEmail = (verifyEmailUsecase) => async (req, res) => {
  try {
    let user = req.user;
    let hash = req.body.hash;
    let result = await verifyEmailUsecase(user, hash, req, res);
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const requestVerifyEmail = (sendEmailVerificationNotification) => async (req, res) => {
  try {
    let user = req.user;
    let result = await sendEmailVerificationNotification(user);
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

module.exports = {
  register,
  forgotPassword,
  validateResetPasswordOtp,
  resetPassword,
  authentication,
  logout,
  verifyEmail,
  requestVerifyEmail,
};