const express = require('express');
const router = express.Router();
const userRoleController = require('../../controller/admin/userRole');
const {
  auth,checkRolePermission,
} = require('../../middleware');
const { PLATFORM } =  require('../../constants/authConstant'); 

router.route('/admin/api/v1/userrole/create').post(auth(PLATFORM.SYSTEM_USER),checkRolePermission,userRoleController.addUserRole);
router.route('/admin/api/v1/userrole/addBulk').post(auth(PLATFORM.SYSTEM_USER),checkRolePermission,userRoleController.bulkInsertUserRole);
router.route('/admin/api/v1/userrole/list').post(auth(PLATFORM.SYSTEM_USER),checkRolePermission,userRoleController.findAllUserRole);
router.route('/admin/api/v1/userrole/count').post(auth(PLATFORM.SYSTEM_USER),checkRolePermission,userRoleController.getUserRoleCount);
router.route('/admin/api/v1/userrole/updateBulk').put(auth(PLATFORM.SYSTEM_USER),checkRolePermission,userRoleController.bulkUpdateUserRole); 
router.route('/admin/api/v1/userrole/softDeleteMany').put(auth(PLATFORM.SYSTEM_USER),checkRolePermission,userRoleController.softDeleteManyUserRole);
router.route('/admin/api/v1/userrole/deleteMany').post(auth(PLATFORM.SYSTEM_USER),checkRolePermission,userRoleController.deleteManyUserRole);
router.route('/admin/api/v1/userrole/softDelete/:id').put(auth(PLATFORM.SYSTEM_USER),checkRolePermission,userRoleController.softDeleteUserRole);
router.route('/admin/api/v1/userrole/partial-update/:id').put(auth(PLATFORM.SYSTEM_USER),checkRolePermission,userRoleController.partialUpdateUserRole);   
router.route('/admin/api/v1/userrole/update/:id').put(auth(PLATFORM.SYSTEM_USER),checkRolePermission,userRoleController.updateUserRole);   
router.route('/admin/api/v1/userrole/:id').get(auth(PLATFORM.SYSTEM_USER),checkRolePermission,userRoleController.getUserRoleById);
router.route('/admin/api/v1/userrole/delete/:id').delete(auth(PLATFORM.SYSTEM_USER),checkRolePermission,userRoleController.deleteUserRole);

module.exports = router;
