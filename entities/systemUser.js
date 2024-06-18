module.exports = (systemUser) => {

  let newSystemUser = { 
    username: systemUser.username,
    password: systemUser.password,
    email: systemUser.email,
    name: systemUser.name,
    isActive: systemUser.isActive,
    createdAt: systemUser.createdAt,
    updatedAt: systemUser.updatedAt,
    addedBy: systemUser.addedBy,
    updatedBy: systemUser.updatedBy,
    permanentAddress: systemUser.permanentAddress,
    userType: systemUser.userType,
    mobile: systemUser.mobile,
    isDeleted: systemUser.isDeleted,
    resetPasswordLink: systemUser.resetPasswordLink,
    loginRetryLimit: systemUser.loginRetryLimit,
    loginReactiveTime: systemUser.loginReactiveTime,
  };

  // remove undefined values
  Object.keys(newSystemUser).forEach(key => newSystemUser[key] === undefined && delete newSystemUser[key]);

  // To validate Entity uncomment this block
  /*
   * const validate = (newSystemUser) => {
   *   if (!newSystemUser.field) {
   *       throw new Error("this field is required");
   *   }
   * }
   * validate(newSystemUser) 
   */

  return Object.freeze(newSystemUser);
};
