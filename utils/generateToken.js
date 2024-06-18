const jwt = require('jsonwebtoken');
const { JWT } = require('../constants/authConstant');

async function generateToken(user, tokenType, secret) {
  return jwt.sign({
    userId: user.userId,
    rp_username: user.username,
    userType: user.userType,
    tokenType,
  }, secret, { expiresIn: JWT[tokenType].EXPIRES_IN });
}

module.exports = generateToken;
