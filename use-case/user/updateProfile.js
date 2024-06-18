/**
 * updateProfile.js
 */

const response = require('../../utils/response');

const updateProfile = ({
  userDb, userEntity, updateValidation
}) => async (params) => {
  let {
    userId, profileData, options
  } = params;
  if (userId && profileData) {
    delete profileData.createdAt;
    delete profileData.updatedAt;
    delete profileData.id;
    const validateRequest = await updateValidation(profileData);
    if (!validateRequest.isValid) {
      return response.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
    }
    let user = userEntity(profileData);
    let updatedUser = await userDb.updateOne({ userId: userId }, user, options);
    
    return response.success({ data: updatedUser });
  }
  return response.badRequest();
};

module.exports = updateProfile;