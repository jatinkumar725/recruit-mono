const express = require('express');
const router = express.Router();
const userController = require('../../../controller/recruiter-client/v1/user');
const {
  auth,checkRolePermission,
} = require('../../../middleware');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.route('/client/cloud-aggregator-rec/v1/user/add/seeker').post(auth(PLATFORM.RECRUITER_CLIENT),checkRolePermission,userController.addSeeker);
router.route('/client/cloud-aggregator-rec/v1/user/search/seeker').post(auth(PLATFORM.RECRUITER_CLIENT),checkRolePermission,userController.findAllSeeker);
router.route('/client/cloud-aggregator-rec/v1/user/addBulk/seeker').post(auth(PLATFORM.RECRUITER_CLIENT),checkRolePermission,userController.bulkInsertSeeker);
router.route('/client/cloud-aggregator-rec/v1/user/search/seeker/:seekerId').post(auth(PLATFORM.RECRUITER_CLIENT),checkRolePermission,userController.getSeeker);
router.route('/client/cloud-aggregator-rec/v1/user/search/seeker/:profileId/resume').get(auth(PLATFORM.RECRUITER_CLIENT),checkRolePermission,userController.getSeekerResume);

router.route('/client/cloud-aggregator-rec/v1/user/dashboard').get(auth(PLATFORM.RECRUITER_CLIENT),userController.getRecruiterDashboardDetails);
router.route('/client/cloud-aggregator-rec/v1/user/me').get(auth(PLATFORM.RECRUITER_CLIENT),userController.getLoggedInUserInfo);
router.route('/client/cloud-aggregator-rec/v1/user/change-password').put(auth(PLATFORM.RECRUITER_CLIENT),userController.changePassword);
router.route('/client/cloud-aggregator-rec/v1/user/update-profile').put(auth(PLATFORM.RECRUITER_CLIENT),userController.updateProfile);
router.route('/client/cloud-aggregator-rec/v1/user/delete/me').delete(auth(PLATFORM.RECRUITER_CLIENT),userController.deleteLoggedUser);
module.exports = router;