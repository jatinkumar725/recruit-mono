const response = require('../../utils/response');

/**
 * @description : logout user
 * @param {Object} user : user information.
 * @param {String} token : access token.
 * @return {Object} : response for logout {status, message, data}
 */
const logout = ({ userTokensDb }) => async (user, token, req, res) => {
  try {
    let userToken = await userTokensDb.findOne({
      accessToken: token,
      userId: user.id
    });
  
    if (!userToken) {
      return response.badRequest();
    }
  
    let updatedDocument = { isTokenExpired: true };
    await userTokensDb.updateOne({ _id: userToken.id }, updatedDocument);
  
    // Clear rp_at and rp_rt cookies
    const cookiePrefix = user.userType === 2 ? 'rpc_' : 'rp_';
    
    res.clearCookie(cookiePrefix+'at');
    res.clearCookie(cookiePrefix+'rt');

    return response.success({ message: 'Logged out Successfully' });
  } catch (error) {
    console.log('error', error)
  }
};

module.exports = logout;