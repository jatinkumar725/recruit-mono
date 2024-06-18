const authConstant = require('../../../constants/authConstant');
const { JWT, JWT_TYPES, SITE_COOKIES } = require('../../../constants/authConstant');
const response = require('../../../utils/response');  
const responseHandler = require('../../../utils/response/responseHandler'); 

const register = (registerUsecase) => async (req,res) => {
  try {
    req.body.userType = authConstant.USER_TYPES.System_User;
    let result = await registerUsecase(req.body);

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
    let result = await authenticationUsecase(req.body, authConstant.PLATFORM.SYSTEM_USER);

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

module.exports = {
  register,
  forgotPassword,
  validateResetPasswordOtp,
  resetPassword,
  authentication,
  logout,
  verifyEmail
};