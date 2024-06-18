const express = require('express');
const router = express.Router();
const fileUploadController = require('../../../controller/seeker-client/v1/fileUpload');
const responseHandler = require('../../../utils/response/responseHandler');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const {
    auth,checkRolePermission,
  } = require('../../../middleware');
  
router.route('/client/cloud-aggregator-sk/v1/:profileId/profile').post(auth(PLATFORM.SEEKER_CLIENT), checkRolePermission, fileUploadController.uploadProfile);
router.route('/client/cloud-aggregator-sk/v1/:profileId/resume').post(auth(PLATFORM.SEEKER_CLIENT), checkRolePermission, fileUploadController.uploadResume);

router.route('/client/cloud-aggregator-sk/v1/:profileId/profile').get(auth(PLATFORM.SEEKER_CLIENT), checkRolePermission, fileUploadController.getUploadedProfile);
router.route('/client/cloud-aggregator-sk/v1/:profileId/resume').get(auth(PLATFORM.SEEKER_CLIENT), checkRolePermission, fileUploadController.getUploadedResume);

router.route('/client/cloud-aggregator-sk/v1/:profileId/profile').delete(auth(PLATFORM.SEEKER_CLIENT), checkRolePermission, fileUploadController.deleteUploadedProfile);
router.route('/client/cloud-aggregator-sk/v1/:profileId/resume').delete(auth(PLATFORM.SEEKER_CLIENT), checkRolePermission, fileUploadController.deleteUploadedResume);

module.exports = router;
