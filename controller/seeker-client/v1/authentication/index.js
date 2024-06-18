const seekerDb = require('../../../../data-access/seekerDb');
const userTokensDb = require('../../../../data-access/userTokensDb');
const codeDb = require('../../../../data-access/codeDb');
const userRoleDb = require('../../../../data-access/userRoleDb');
const routeRoleDb = require('../../../../data-access/routeRoleDb');
const roleDb = require('../../../../data-access/roleDb');

const seekerEntity = require('../../../../entities/seeker');
const seekerSchema = require('../../../../validation/schema/seeker');
const createValidation = require('../../../../validation')(seekerSchema.createSchema);

const registerUsecase = require('../../../../use-case/authentication/register')({
  userDb: seekerDb,
  userTokensDb,
  userRoleDb,
  roleDb,
  codeDb,
  userEntity: seekerEntity,
  createValidation,
});
const forgotPasswordUsecase = require('../../../../use-case/authentication/forgotPassword')({ userDb: seekerDb, });
const resetPasswordUsecase = require('../../../../use-case/authentication/resetPassword')({ userDb: seekerDb, });
const validateResetPasswordOtpUsecase = require('../../../../use-case/authentication/validateResetPasswordOtp')({ userDb: seekerDb, });
const logoutUsecase = require('../../../../use-case/authentication/logout')({ userTokensDb });
const authenticationUsecase = require('../../../../use-case/authentication/authentication')({
  userDb: seekerDb,
  userTokensDb,
  userRoleDb,
  routeRoleDb
});
const verifyEmailUsecase = require('../../../../use-case/authentication/verifyEmail')({ userDb: seekerDb, codeDb });

const sendEmailVerificationNotification = require('../../../../use-case/common/sendEmailVerificationNotification')({ codeDb });

/**
 * Term relationship
 */
const termRelationshipDb = require('../../../../data-access/termRelationshipDb');
const termTaxonomyDb = require('../../../../data-access/termTaxonomyDb');

// Term Relationship Schema
const termRelationshipSchema = require('../../../../validation/schema/termRelationship');

// Term Relationship Validation
const createTermRelationshipValidation = require('../../../../validation')(termRelationshipSchema.createSchema);

const addTermRelationshipUsecase = require('../../../../use-case/termRelationship/addTermRelationship')({
  termTaxonomyDb, 
  termRelationshipDb, 
  createValidation: createTermRelationshipValidation
});

const authController = require('./authController');

const register = authController.register(registerUsecase, addTermRelationshipUsecase);
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