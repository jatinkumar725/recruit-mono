const express = require('express');
const router = express.Router();
const { auth } = require('../../../middleware');
const authController = require('../../../controller/seeker-client/v1/authentication');
const { PLATFORM } =  require('../../../constants/authConstant');  
router.route('/register').post(authController.register);
router.route('/login').post(authController.authentication);
router.route('/forgot-password').post(authController.forgotPassword);
router.route('/validate-otp').post(authController.validateResetPasswordOtp);
router.route('/reset-password').put(authController.resetPassword);
router.route('/logout').post(auth(PLATFORM.SEEKER_CLIENT),authController.logout);
router.route('/verifyEmail').post(auth(PLATFORM.SEEKER_CLIENT),authController.verifyEmail);
router.route('/requestVerifyEmail').post(auth(PLATFORM.SEEKER_CLIENT),authController.requestVerifyEmail);
router.route('/login/google').get((req,res)=>{
  req.session.platform = 'client';
  // res.redirect(`http://localhost:${process.env.PORT}/auth/google`);
  // Construct the redirect URL
  const redirectUrl = `http://localhost:${process.env.PORT}/auth/google`;

  // Send a response to the client to trigger the redirect
  res.status(200).json({ redirectUrl });

});
module.exports = router;