const express = require('express');
const router = express.Router();
const userController = require('../../controller/admin/user');
const {
  auth,checkRolePermission,
} = require('../../middleware');
const { PLATFORM } =  require('../../constants/authConstant'); 

router.route('/admin/api/v1/user/me').get(auth(PLATFORM.SYSTEM_USER),userController.getLoggedInUserInfo);
router.route('/admin/api/v1/user/create').post(auth(PLATFORM.SYSTEM_USER),checkRolePermission,userController.addUser);
router.route('/admin/api/v1/user/list').post(auth(PLATFORM.SYSTEM_USER),checkRolePermission,userController.findAllUser);
router.route('/admin/api/v1/user/count').post(auth(PLATFORM.SYSTEM_USER),checkRolePermission,userController.getUserCount);
router.route('/admin/api/v1/user/:id').get(auth(PLATFORM.SYSTEM_USER),checkRolePermission,userController.getUserById);
router.route('/admin/api/v1/user/update/:id').put(auth(PLATFORM.SYSTEM_USER),checkRolePermission,userController.updateUser);   
router.route('/admin/api/v1/user/partial-update/:id').put(auth(PLATFORM.SYSTEM_USER),checkRolePermission,userController.partialUpdateUser);   
router.route('/admin/api/v1/user/softDelete/:id').put(auth(PLATFORM.SYSTEM_USER),checkRolePermission,userController.softDeleteUser);
router.route('/admin/api/v1/user/softDeleteMany').put(auth(PLATFORM.SYSTEM_USER),checkRolePermission,userController.softDeleteManyUser);
router.route('/admin/api/v1/user/addBulk').post(auth(PLATFORM.SYSTEM_USER),checkRolePermission,userController.bulkInsertUser);
router.route('/admin/api/v1/user/updateBulk').put(auth(PLATFORM.SYSTEM_USER),checkRolePermission,userController.bulkUpdateUser); 
router.route('/admin/api/v1/user/delete/:id').delete(auth(PLATFORM.SYSTEM_USER),checkRolePermission,userController.deleteUser);
router.route('/admin/api/v1/user/deleteMany').post(auth(PLATFORM.SYSTEM_USER),checkRolePermission,userController.deleteManyUser);
router.route('/admin/api/v1/user/change-password').put(auth(PLATFORM.SYSTEM_USER),userController.changePassword);
router.route('/admin/api/v1/user/update-profile').put(auth(PLATFORM.SYSTEM_USER),userController.updateProfile);

module.exports = router;
