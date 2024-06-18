/**
 * loginUser.js
 * @description :: middleware that verifies JWT token of user
 */

const jwt = require("jsonwebtoken");
const response = require("../utils/response");
const { PLATFORM, JWT_TYPES } = require("../constants/authConstant");
const seekerSecret = require("../constants/authConstant").JWT[JWT_TYPES.Access].SEEKER_SECRET;
const recruiterSecret = require("../constants/authConstant").JWT[JWT_TYPES.Access].RECRUITER_SECRET;
const adminSecret = require("../constants/authConstant").JWT[JWT_TYPES.Access].System_User;
const authenticateJWT = (platform) => (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const accessToken = authHeader.split(" ")[1];
    let secret = "";
    if (platform == PLATFORM.SEEKER_CLIENT) {
      secret = seekerSecret;
    } else if (platform == PLATFORM.RECRUITER_CLIENT) {
      secret = recruiterSecret;
    } else if (platform == PLATFORM.SYSTEM_USER) {
      secret = adminSecret;
    }
    jwt.verify(accessToken, secret, (error, user) => {
      if (error) {
        response.unAuthorized();
      }
      req.user = user;
      next();
    });
  } else {
    response.unAuthorized();
  }
};
module.exports = authenticateJWT;
