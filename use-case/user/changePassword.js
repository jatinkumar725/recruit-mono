/**
 *changePassword.js
 */
const bcrypt = require('bcrypt');

const response = require('../../utils/response');

/**
 * @description : change password.
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : response of change password. {status, message, data}
 */
const changePassword = ({ userDb, userTokensDb }) => async (params) => {

  if (!params.newPassword || !params.username || !params.oldPassword) {
    return response.validationError({ message: 'Please provide username and new password and old password' });
  }

  let password = params.newPassword;
  let oldPassword = params.oldPassword;

  if (password === oldPassword) {
    return response.validationError({ message: 'You have previously used this password' });
  }

  let user = await userDb.findOne({ username: params.username });
  if (!user) {
    return response.badRequest({ message: "We couldn't find an account belongs to this email address" }); // User not found
  }
  let isPasswordMatch = await user.isPasswordMatch(oldPassword);
  if (!isPasswordMatch) {
    return response.badRequest({ message: 'Incorrect old password' });
  }
  password = await bcrypt.hash(password, 8);
  let updatedUser = userDb.updateOne({ _id: user.id }, { 'password': password });

  // Delete all other sessions, except current one
  let sessions = await userTokensDb.deleteMany({ userId: user.id, accessToken: { $ne: params.accessToken } } );

  if (updatedUser) {
    return response.success({ message: 'Password changed successfully' });
  }
  return response.badRequest({ message: 'Password not updated' });
};

module.exports = changePassword;