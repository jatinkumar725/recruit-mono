const express = require('express');
const router = express.Router();
const userController = require('../../../controller/seeker-client/v1/user');
const {
  auth,
} = require('../../../middleware');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.route('/client/cloud-aggregator-sk/v1/user/me').get(auth(PLATFORM.SEEKER_CLIENT),userController.getLoggedInUserInfo);
router.route('/client/cloud-aggregator-sk/v1/user/change-password').put(auth(PLATFORM.SEEKER_CLIENT),userController.changePassword);
router.route('/client/cloud-aggregator-sk/v1/user/change-email').put(auth(PLATFORM.SEEKER_CLIENT),userController.changeEmailAddress);
router.route('/client/cloud-aggregator-sk/v1/user/update-profile').put(auth(PLATFORM.SEEKER_CLIENT),userController.updateProfile);
router.route('/client/cloud-aggregator-sk/v1/user/self/profiles/:entity/:entityId').post(auth(PLATFORM.SEEKER_CLIENT),userController.deleteProfileEntity);
router.route('/client/cloud-aggregator-sk/v1/user/self/profiles').post(auth(PLATFORM.SEEKER_CLIENT),userController.updateOnlineProfile);
router.route('/client/cloud-aggregator-sk/v1/user/self/profiles/:ogId').post(auth(PLATFORM.SEEKER_CLIENT),userController.deleteOnlineProfile);
router.route('/client/cloud-aggregator-sk/v1/user/self/projects').post(auth(PLATFORM.SEEKER_CLIENT),userController.updateProject);
router.route('/client/cloud-aggregator-sk/v1/user/self/projects/:projectId').post(auth(PLATFORM.SEEKER_CLIENT),userController.deleteProject);
router.route('/client/cloud-aggregator-sk/v1/user/delete/me').delete(auth(PLATFORM.SEEKER_CLIENT),userController.deleteLoggedUser);
router.route('/client/cloud-aggregator-sk/v1/user/dashboard').get(auth(PLATFORM.SEEKER_CLIENT),userController.getSeekerDashboardDetails);
module.exports = router;