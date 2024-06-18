const express = require('express');
const router = express.Router();
const savedSeekerController = require('../../../controller/recruiter-client/v1/savedSeeker');
const {
    auth,checkRolePermission,
  } = require('../../../middleware');
const { PLATFORM } =  require('../../../constants/authConstant'); 

// Applications
router.route('/client/cloud-aggregator-rec/v1/skprofile/:profileId/list').post(auth(PLATFORM.RECRUITER_CLIENT), savedSeekerController.getSavedSeekers);
router.route('/client/cloud-aggregator-rec/v1/skprofile/save').post(auth(PLATFORM.RECRUITER_CLIENT), savedSeekerController.saveSeeker);
router.route('/client/cloud-aggregator-rec/v1/skprofile/delete/:savedSeekerId').delete(auth(PLATFORM.RECRUITER_CLIENT), savedSeekerController.deleteSavedSeeker);
module.exports = router;