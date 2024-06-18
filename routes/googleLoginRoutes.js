const express = require('express');
const router = express.Router();
const passport = require('passport');

const seekerDb = require('../data-access/seekerDb');
const userTokensDb = require('../data-access/userTokensDb');

const googleLogin = require('../use-case/authentication/googleLogin');
const response = require('../utils/response');
const responseHandler = require('../utils/response/responseHandler');
const { JWT, JWT_TYPES, SITE_COOKIES } = require('../constants/authConstant');
const encryptPayload = require('../utils/encryptPayload');

router.get('/auth/google/error', (req, res) => {
  responseHandler(res, response.badRequest({ message: 'Login Failed' }));
});

router.get('/auth/google', passport.authenticate('google', {
  // successRedirect: process.env.CLIENT_GOOGLE_SUCCESS_REDIRECT,
  scope: ['profile', 'email'],
  session: false
}));

router.get('/auth/google/callback',
  (req, res, next) => {
    passport.authenticate('google', { failureRedirect: '/auth/google/error' }, async (error, user, info) => {
      if (error) {
        return responseHandler(res, response.internalServerError({ message: error.message }));
      }
      if (user) {
        try {

          const makeGoogleLogin = googleLogin({ userDb: seekerDb, userTokensDb });

          let result = await makeGoogleLogin(user.email, req.session.platform);

          if (result.data) {
            // Setting cookie
            res.cookie(
              'rp_at',
              result.data.accessToken,
              SITE_COOKIES.rp_at
            );

            res.cookie(
              'rp_rt',
              result.data.refreshToken,
              SITE_COOKIES.rp_rt
            );

            delete result.data.accessToken;
            delete result.data.refreshToken;

            const encryptData = encryptPayload(result.data);

            return res.redirect(`${process.env.CLIENT_GOOGLE_SUCCESS_REDIRECT}?__data=${encryptData}`);
          }

          // return responseHandler(res, result);
        } catch (error) {
          return responseHandler(res, response.internalServerError({ message: error.message }));
        }
      }
    })(req, res, next);
  });

module.exports = router;