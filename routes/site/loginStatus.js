const express = require('express');
const router = express.Router();
const loginStatusController = require('../../controller/site/loginStatus');
const {
    auth,
} = require('../../middleware');
const { PLATFORM } = require('../../constants/authConstant');

router.route('/client/central-auth-service/v1/login-status').get(auth(PLATFORM.SEEKER_CLIENT, true), loginStatusController.checkLoginStatus);

module.exports = router;