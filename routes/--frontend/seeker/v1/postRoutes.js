const express = require('express');
const router = express.Router();
const appliedPostController = require('../../../controller/seeker-client/v1/applyPost');
const {
    auth,checkRolePermission,
  } = require('../../../middleware');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.route('/client/cloud-aggregator-rec/v1/post/apply').post(auth(PLATFORM.SEEKER_CLIENT), checkRolePermission, appliedPostController.applyToPost);
router.route('/client/cloud-aggregator-rec/v1/post/apply/list').post(auth(PLATFORM.SEEKER_CLIENT), checkRolePermission, appliedPostController.findAllAppliedPost);

module.exports = router;