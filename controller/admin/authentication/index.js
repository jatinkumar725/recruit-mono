const systemUserDb = require('../../../data-access/systemUserDb');
const userTokensDb = require('../../../data-access/userTokensDb');
const codeDb = require('../../../data-access/codeDb');
const systemUserEntity = require('../../../entities/systemUser');

const systemUserSchema = require('../../../validation/schema/systemUser');
const createValidation = require('../../../validation')(systemUserSchema.createSchema);

const userRoleDb = require('../../../data-access/userRoleDb');
const routeRoleDb = require('../../../data-access/routeRoleDb');
const roleDb = require('../../../data-access/roleDb');

const authController = require('./authController');

const registerUsecase = require('../../../use-case/authentication/register')({
  userDb: systemUserDb,
  userTokensDb,
  roleDb,
  userRoleDb,
  codeDb,
  userEntity: systemUserEntity,
  createValidation,
});
const forgotPasswordUsecase = require('../../../use-case/authentication/forgotPassword')({ userDb: systemUserDb, });
const resetPasswordUsecase = require('../../../use-case/authentication/resetPassword')({ userDb: systemUserDb, });
const validateResetPasswordOtpUsecase = require('../../../use-case/authentication/validateResetPasswordOtp')({ userDb: systemUserDb, });
const logoutUsecase = require('../../../use-case/authentication/logout')({ userTokensDb });
const authenticationUsecase = require('../../../use-case/authentication/authentication')({
  userDb: systemUserDb,
  userTokensDb,
  userRoleDb,
  routeRoleDb
});
const verifyEmailUsecase = require('../../../use-case/authentication/verifyEmail')({ userDb: systemUserDb, codeDb });

const register = authController.register(registerUsecase);
const forgotPassword = authController.forgotPassword(forgotPasswordUsecase);
const resetPassword = authController.resetPassword(resetPasswordUsecase);
const validateResetPasswordOtp = authController.validateResetPasswordOtp(validateResetPasswordOtpUsecase);
const logout = authController.logout(logoutUsecase);
const authentication = authController.authentication(authenticationUsecase);
const verifyEmail = authController.verifyEmail(verifyEmailUsecase);

module.exports = {
  register,
  forgotPassword,
  resetPassword,
  validateResetPasswordOtp,
  logout,
  authentication,
  verifyEmail,
};