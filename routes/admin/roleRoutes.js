const express = require('express');
const router = express.Router();
const roleController = require('../../controller/admin/role');
const {
  auth,checkRolePermission,
} = require('../../middleware');
const { PLATFORM } =  require('../../constants/authConstant'); 

router.route('/admin/api/v1/role/create').post(auth(PLATFORM.SYSTEM_USER),checkRolePermission,roleController.addRole);
router.route('/admin/api/v1/role/addBulk').post(auth(PLATFORM.SYSTEM_USER),checkRolePermission,roleController.bulkInsertRole);
router.route('/admin/api/v1/role/list').post(auth(PLATFORM.SYSTEM_USER),checkRolePermission,roleController.findAllRole);
router.route('/admin/api/v1/role/count').post(auth(PLATFORM.SYSTEM_USER),checkRolePermission,roleController.getRoleCount);
router.route('/admin/api/v1/role/updateBulk').put(auth(PLATFORM.SYSTEM_USER),checkRolePermission,roleController.bulkUpdateRole); 
router.route('/admin/api/v1/role/softDeleteMany').put(auth(PLATFORM.SYSTEM_USER),checkRolePermission,roleController.softDeleteManyRole);
router.route('/admin/api/v1/role/deleteMany').post(auth(PLATFORM.SYSTEM_USER),checkRolePermission,roleController.deleteManyRole);
router.route('/admin/api/v1/role/softDelete/:id').put(auth(PLATFORM.SYSTEM_USER),checkRolePermission,roleController.softDeleteRole);
router.route('/admin/api/v1/role/partial-update/:id').put(auth(PLATFORM.SYSTEM_USER),checkRolePermission,roleController.partialUpdateRole);   
router.route('/admin/api/v1/role/update/:id').put(auth(PLATFORM.SYSTEM_USER),checkRolePermission,roleController.updateRole);   
router.route('/admin/api/v1/role/:id').get(auth(PLATFORM.SYSTEM_USER),checkRolePermission,roleController.getRoleById);
router.route('/admin/api/v1/role/delete/:id').delete(auth(PLATFORM.SYSTEM_USER),checkRolePermission,roleController.deleteRole);

module.exports = router;
