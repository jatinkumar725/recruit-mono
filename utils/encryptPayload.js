const jwt = require('jsonwebtoken');
const { JWT } = require('../constants/authConstant');

function encryptPayload(payload) {
  return jwt.sign(payload, JWT[3].CODE, { expiresIn: JWT[3].EXPIRES_IN });
}

module.exports = encryptPayload;
