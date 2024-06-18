/**
 * auth.js
 * @description :: middleware that checks authentication and authorization of user
 */

const {
  JWT,
  JWT_TYPES,
  AUTH_STRATEGY_TYPE,
  LOGIN_ACCESS,
  PLATFORM,
  SITE_COOKIES,
} = require("../constants/authConstant");
const generateToken = require("../utils/generateToken");
const responseHandler = require("../utils/response/responseHandler");
const { unAuthorized } = require("../utils/response");
const dayjs = require("dayjs");
const { cookieExtractor } = require("../utils/cookieExtractor");

const regenerateAccessToken = async (userTokensDb, refreshToken, user, cookieName, res, reject) => {
  try {

    // Regenerate access token
    const newAccessToken = await generateToken(user, JWT_TYPES.Access, JWT[JWT_TYPES.Access][user.userType]);

    await userTokensDb.updateOne({
      refreshToken,
      userId: user.id
    }, {
      accessToken: newAccessToken,
    });

    // Set the '*_at' cookie with the new access token
    res.cookie(cookieName, newAccessToken, SITE_COOKIES[cookieName + 'at']);

  } catch (error) {
    reject('Access token not granted');
  }
};

const verifyCallback =
  (userTokensDb, req, res, resolve, reject, platform, bypass) =>
    async (error, user, info) => {

      // Cookie prefix
      const cookieName = user.userType === 2 ? 'rpc_' : 'rp_';

      // 17 Apr, 2024: Adding new parameter bypass it helps for routes that needs to check if user is logged or not, it only not return 401 with bypass if user is not found ( i.e user is not logged in ), for other scenrios like token expired and all, to handle them create continous call of login with route /reAuth ( reLogin ) 
      if (!user && bypass) {
        resolve();
      }

      if (!user) {
        return reject("Unauthorized User");
      }

      // Attach user to request body
      req.user = user;

      // Get refresh token
      const searchTokenFormat = { userId: user.id };
      if (req.headers.authorization) {
        searchTokenFormat.accessToken = req.headers.authorization.replace("Bearer ", "");
      } else {
        searchTokenFormat.refreshToken = cookieExtractor(req, cookieName + 'rt');
      }

      const userToken = await userTokensDb.findOne(searchTokenFormat);

      if (!user.isActive) {
        return reject("User account is deactivated");
      }

      if (!userToken) {
        return reject("Token not found");
      }

      // Check if refresh token expired
      const expirationTime = dayjs(userToken.tokenExpirationTime);
      const currentTime = dayjs();

      if (userToken.isTokenExpired || expirationTime <= currentTime) {
        return reject("Token is Expired");
      }

      if (user.userType) {
        let allowedPlatforms = LOGIN_ACCESS[user.userType]
          ? LOGIN_ACCESS[user.userType]
          : [];
        if (!allowedPlatforms.includes(platform)) {
          return reject("Unauthorized user");
        }
      }

      if (info === 'Access token expired') {
        // Regenerate token if expired
        await regenerateAccessToken(userTokensDb, userToken, user, cookieName, res, reject);
      }

      resolve();
    };

const auth =
  ({ passport, userTokensDb }) =>
    (platform, bypass = false) =>
      async (req, res, next) => {
        if (Object.values(PLATFORM).includes(platform)) {
          return new Promise((resolve, reject) => {
            passport.authenticate(
              AUTH_STRATEGY_TYPE[platform],
              { session: false },
              verifyCallback(userTokensDb, req, res, resolve, reject, platform, bypass)
            )(req, res, next);
          })
            .then(() => next())
            .catch((error) => {
              console.log(error);
              responseHandler(res, unAuthorized());
            });
        }
      };

module.exports = auth;