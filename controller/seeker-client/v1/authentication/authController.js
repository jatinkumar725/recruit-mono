const authConstant = require('../../../../constants/authConstant');
const { JWT, JWT_TYPES, SITE_COOKIES } = require('../../../../constants/authConstant');
const response = require('../../../../utils/response');  
const responseHandler = require('../../../../utils/response/responseHandler'); 
const TermRelationship = require('../../../../objects/relationship');

const register = (registerUsecase, addTermRelationshipUsecase) => async (req,res) => {
  try {
    req.body.userType = authConstant.USER_TYPES.Seeker;

    // Create an instance of TermRelationship
    const termRelationship = new TermRelationship();
    const { termData, restData } = termRelationship.separateTerms(req.body);

    let result = await registerUsecase(restData);

    if ( result.data ) {

      if ( Object.keys(termData).length ) {

        /**
         * Add term relationship
         */
        const flattenTermData = termData.flat();
  
        for ( const term of flattenTermData ) {
          const resultRelationship = await addTermRelationshipUsecase({
            ...term,
            objectId: result.data.userId,
            model_type: 'Seeker',
          });
        }

      }

      // Setting cookie
      res.cookie(
        'rp_at', 
        result.data.accessToken, 
        SITE_COOKIES.rp_at
      );
      
      res.cookie(
        'rp_rt', 
        result.data.refreshToken, 
        SITE_COOKIES.rp_rt
      );

      delete result.data.accessToken;
      delete result.data.refreshToken;
    }

    return responseHandler(res,result);
  } catch (error) {
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const forgotPassword = (forgotPasswordUsecase) => async (req,res) => {
  try {
    let result = await forgotPasswordUsecase(req.body);
    return responseHandler(res,result);
  } catch (error) {
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const validateResetPasswordOtp = (validateResetPasswordOtpUsecase) => async (req,res) => {
  try {
    let result = await validateResetPasswordOtpUsecase(req.body);
    return responseHandler(res,result);
  } catch (error) {
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const resetPassword = (resetPasswordUsecase) => async (req,res) => {
  try {
    let result = await resetPasswordUsecase(req.body);
    return responseHandler(res,result);
  } catch (error) {
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const authentication = (authenticationUsecase) => async (req,res)=>{
  try {
    let result = await authenticationUsecase(req.body, authConstant.PLATFORM.SEEKER_CLIENT);

    if ( result.data ) {

      // Setting cookie
      res.cookie(
        'rp_at', 
        result.data.accessToken, 
        SITE_COOKIES.rp_at
      );
      
      res.cookie(
        'rp_rt', 
        result.data.refreshToken, 
        SITE_COOKIES.rp_rt
      );
  
      delete result.data.accessToken;
      delete result.data.refreshToken;

    }

    return responseHandler(res,result);
  } catch (error) {
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const logout = (logoutUsecase) => async (req,res) => {
  try {
    let user = req.user;
    let accessToken = req.headers.authorization.replace('Bearer ', '');
    let result = await logoutUsecase(user, accessToken,req,res);
    return responseHandler(res,result);
  } catch (error) {
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const verifyEmail = (verifyEmailUsecase) => async (req,res) => {
  try {
    let user = req.user;
    let hash = req.body.hash;
    let result = await verifyEmailUsecase(user, hash,req,res);
    return responseHandler(res,result);
  } catch (error) {
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const requestVerifyEmail = (sendEmailVerificationNotification) => async (req,res) => {
  try {
    let user = req.user;
    let result = await sendEmailVerificationNotification(user);
    return responseHandler(res,result);
  } catch (error) {
    return responseHandler(res,response.internalServerError({ message:error.message }));
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
  requestVerifyEmail
};