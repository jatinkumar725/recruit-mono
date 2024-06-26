
const response = require('../../utils/response');
const responseStatus = require('../../utils/response/responseStatus');
const makeSendResetPasswordNotification = require('../common/sendResetPasswordNotification');

/**
 * @description : send email or sms to user with OTP on forgot password
 * @param {Object} params : request body.
 * @return {Object} : response for forgotPassword {status, message, data}
 */ 
const forgotPassword = ({
  userDb,userAuthSettingsDb  
}) => async (params) => {
  if (!params.email) {
    return response.badRequest({ message : 'Insufficient request parameters! email is required' });
  }
  let where = { email: params.email };
  where.isActive = true;where.isDeleted = false;    params.email = params.email.toString().toLowerCase();
  let user = await userDb.findOne(where);
  if (user) {
    let sendResetPasswordNotification = makeSendResetPasswordNotification({
      userDb,
      userAuthSettingsDb
    });
    let notificationResponse = await sendResetPasswordNotification(user);
    if (notificationResponse.status == responseStatus.success) {
      let {
        resultOfEmail, resultOfSMS
      } = notificationResponse.data;
      if (resultOfEmail && resultOfSMS) {
        return response.success({ message :'OTP successfully send.' });
      } else if (resultOfEmail && !resultOfSMS) {
        return response.success({ message : 'Reset link send successfully to your email.' });
      } else if (!resultOfEmail && resultOfSMS) {
        return response.success({ message : 'OTP successfully send to your mobile number.' });
      } else {
        return response.failure({ message :'OTP can not be sent due to some issue try again later' });success;
      }
    } else {
      return response.failure();
    }
  } else {
    return response.recordNotFound({
      message: 'Account with this email address not exists'
    });
  }
    
};
module.exports = forgotPassword;