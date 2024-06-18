const express = require('express');
const router = express.Router();
const fileUploadController = require('../../../controller/recruiter-client/v1/fileUpload');
const responseHandler = require('../../../utils/response/responseHandler');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const {
    auth,
  } = require('../../../middleware');
// Profile
router.route('/client/cloud-aggregator-rec/v1/:profileId/profile').post(auth(PLATFORM.RECRUITER_CLIENT), fileUploadController.uploadLogo);
router.route('/client/cloud-aggregator-rec/v1/:profileId/profile').get(auth(PLATFORM.RECRUITER_CLIENT), fileUploadController.getUploadedLogo);
router.route('/client/cloud-aggregator-rec/v1/:profileId/profile').delete(auth(PLATFORM.RECRUITER_CLIENT), fileUploadController.deleteUploadedLogo);

// Kyc
router.route('/client/cloud-aggregator-rec/v1/:profileId/docs').post(auth(PLATFORM.RECRUITER_CLIENT), fileUploadController.uploadDocs);

module.exports = router;
