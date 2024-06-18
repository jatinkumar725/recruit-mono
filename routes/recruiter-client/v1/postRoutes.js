const express = require('express');
const router = express.Router();
const postController = require('../../../controller/recruiter-client/v1/post');
const {
    auth,checkRolePermission,
  } = require('../../../middleware');
const { PLATFORM } =  require('../../../constants/authConstant'); 

// Applications
router.route('/client/cloud-aggregator-rec/v1/post/applications/list').post(auth(PLATFORM.RECRUITER_CLIENT), postController.getApplicationsOfJobPost);
router.route('/client/cloud-aggregator-rec/v1/post/applications/:applicationId/status').post(auth(PLATFORM.RECRUITER_CLIENT), postController.markShortlistRejectApplicationOfJobPost);
router.route('/client/cloud-aggregator-rec/v1/post/applications/:applicationId/attachments').get(auth(PLATFORM.RECRUITER_CLIENT), postController.getApplicationAttachments);
router.route('/client/cloud-aggregator-rec/v1/post/applications/:applicationId/read').put(auth(PLATFORM.RECRUITER_CLIENT), postController.markReadToApplicationOfJobPost);

// General post routes
router.route('/client/cloud-aggregator-rec/v1/post/add').post(auth(PLATFORM.RECRUITER_CLIENT), checkRolePermission, postController.addPost);
router.route('/client/cloud-aggregator-rec/v1/post/addBulk').post(auth(PLATFORM.RECRUITER_CLIENT), checkRolePermission, postController.bulkInsertPost);
router.route('/client/cloud-aggregator-rec/v1/post/:postId').get(auth(PLATFORM.RECRUITER_CLIENT), checkRolePermission, postController.getUserPost);
router.route('/client/cloud-aggregator-rec/v1/post/list').post(auth(PLATFORM.RECRUITER_CLIENT), checkRolePermission, postController.findAllPost);
router.route('/client/cloud-aggregator-rec/v1/post/count').post(auth(PLATFORM.RECRUITER_CLIENT), checkRolePermission, postController.getPostCount);
router.route('/client/cloud-aggregator-rec/v1/post/update/:postId').put(auth(PLATFORM.RECRUITER_CLIENT), checkRolePermission, postController.updatePost); 
router.route('/client/cloud-aggregator-rec/v1/post/delete/:postId').delete(auth(PLATFORM.RECRUITER_CLIENT), checkRolePermission, postController.deleteLoggedUserPost);
router.route('/client/cloud-aggregator-rec/v1/post/partial-update/:postId').put(auth(PLATFORM.RECRUITER_CLIENT), checkRolePermission, postController.partialUpdatePost);   
router.route('/client/cloud-aggregator-rec/v1/post/updateBulk').put(auth(PLATFORM.RECRUITER_CLIENT), checkRolePermission, postController.bulkUpdatePost); 
router.route('/client/cloud-aggregator-rec/v1/post/:postId/:entity/:entityId').post(auth(PLATFORM.RECRUITER_CLIENT), postController.deletePostEntity);

module.exports = router;