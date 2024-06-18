const express = require('express');
const router = express.Router();
const userController = require('../../../../controller/seeker-client/v1/user');
const {
  auth,
} = require('../../../../middleware');
const { PLATFORM } =  require('../../../../constants/authConstant'); 

router.route('/client/cloud-aggregator-sk/v1/user/me').get(auth(PLATFORM.SEEKER_CLIENT),userController.getLoggedInUserInfo);
router.route('/client/cloud-aggregator-sk/v1/user/change-password').put(auth(PLATFORM.SEEKER_CLIENT),userController.changePassword);
router.route('/client/cloud-aggregator-sk/v1/user/update-profile').put(auth(PLATFORM.SEEKER_CLIENT),userController.updateProfile);
router.route('/client/cloud-aggregator-sk/v1/user/delete/me').delete(auth(PLATFORM.SEEKER_CLIENT),userController.deleteLoggedUser);
module.exports = router;