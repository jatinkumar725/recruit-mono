const recruiterDb = require('../../../../data-access/recruiterDb');
const recruiterEntity = require('../../../../entities/recruiter');
const userTokensDb = require('../../../../data-access/userTokensDb');
const codeDb = require('../../../../data-access/codeDb');

const recruiterSchema = require('../../../../validation/schema/recruiter');
const createValidation = require('../../../../validation')(recruiterSchema.createSchema);

const roleDb = require('../../../../data-access/roleDb');
const userRoleDb  = require('../../../../data-access/userRoleDb');
const routeRoleDb = require('../../../../data-access/routeRoleDb');

const authController = require('./authController');

const registerUsecase = require('../../../../use-case/authentication/register')({ 
  userDb: recruiterDb, 
  userTokensDb,
  roleDb,
  userRoleDb,
  codeDb,
  userEntity: recruiterEntity,
  createValidation, 
});
const forgotPasswordUsecase = require('../../../../use-case/authentication/forgotPassword')({ userDb: recruiterDb });
const resetPasswordUsecase = require('../../../../use-case/authentication/resetPassword')({ userDb: recruiterDb });
const validateResetPasswordOtpUsecase = require('../../../../use-case/authentication/validateResetPasswordOtp')({ userDb: recruiterDb });
const logoutUsecase = require('../../../../use-case/authentication/logout')({ userTokensDb });
const authenticationUsecase = require('../../../../use-case/authentication/authentication')({
  userDb: recruiterDb,
  userTokensDb,
  userRoleDb,
  routeRoleDb
});
const verifyEmailUsecase = require('../../../../use-case/authentication/verifyEmail')({ userDb: recruiterDb, codeDb });
const sendEmailVerificationNotification = require('../../../../use-case/common/sendEmailVerificationNotification')({ codeDb });

/**
 * Term relationship
 */
const termDb = require('../../../../data-access/termDb');
const termRelationshipDb = require('../../../../data-access/termRelationshipDb');
const termTaxonomyDb = require('../../../../data-access/termTaxonomyDb');

// Term Relationship Schema
const termRelationshipSchema = require('../../../../validation/schema/termRelationship');

// Term Relationship Validation
const createTermRelationshipValidation = require('../../../../validation')(termRelationshipSchema.createSchema);

// Term Schema
const termSchema = require('../../../../validation/schema/term');

// Term Validation
const createTermValidation = require('../../../../validation')(termSchema.createSchema);

const updateTermRelationshipUsecase = require('../../../../use-case/termRelationship/updateTermRelationship')({
  termDb,
  termTaxonomyDb, 
  termRelationshipDb, 
  createValidation: createTermRelationshipValidation,
  createTermValidation
});

const register = authController.register(registerUsecase, updateTermRelationshipUsecase);
const forgotPassword = authController.forgotPassword(forgotPasswordUsecase);
const resetPassword = authController.resetPassword(resetPasswordUsecase);
const validateResetPasswordOtp = authController.validateResetPasswordOtp(validateResetPasswordOtpUsecase);
const logout = authController.logout(logoutUsecase);
const authentication = authController.authentication(authenticationUsecase);
const verifyEmail = authController.verifyEmail(verifyEmailUsecase);
const requestVerifyEmail = authController.requestVerifyEmail(sendEmailVerificationNotification);

module.exports = {
  register,
  forgotPassword,
  resetPassword,
  validateResetPasswordOtp,
  logout,
  authentication,
  verifyEmail,
  requestVerifyEmail,
};