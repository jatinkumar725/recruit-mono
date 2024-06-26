module.exports = (userTokens) => {

  let newUserTokens = { 
    userId: userTokens.userId,
    refreshToken: userTokens.refreshToken,
    accessToken: userTokens.accessToken,
    model_type: userTokens.model_type,
    tokenExpirationTime: userTokens.tokenExpirationTime,
    isTokenExpired: userTokens.isTokenExpired,
    isActive: userTokens.isActive,
    addedBy: userTokens.addedBy,
    updatedBy: userTokens.updatedBy,
    createdAt: userTokens.createdAt,
    updatedAt: userTokens.updatedAt,
    isDeleted: userTokens.isDeleted,
  };

  // remove undefined values
  Object.keys(newUserTokens).forEach(key => newUserTokens[key] === undefined && delete newUserTokens[key]);

  // To validate Entity uncomment this block
  /*
   * const validate = (newUserTokens) => {
   *   if (!newUserTokens.field) {
   *       throw new Error("this field is required");
   *   }
   * }
   * validate(newUserTokens) 
   */

  return Object.freeze(newUserTokens);
};
