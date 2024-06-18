const express = require('express');
const router = express.Router();
const postRouteController = require('../../controller/admin/post');
const {
  auth,checkRolePermission,
} = require('../../middleware');
const { PLATFORM } =  require('../../constants/authConstant'); 

router.route('/admin/api/v1/post/orphans/list').post(auth(PLATFORM.SYSTEM_USER),checkRolePermission,postRouteController.findAllOrphanPost);
router.route('/admin/api/v1/post/deleteOrphan/:postId').delete(auth(PLATFORM.SYSTEM_USER),checkRolePermission,postRouteController.deleteOrphanPost);

module.exports = router;