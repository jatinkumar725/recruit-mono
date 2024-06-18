const express = require('express');
const router = express.Router();
const projectRouteController = require('../../controller/admin/projectRoute');
const {
  auth,checkRolePermission,
} = require('../../middleware');
const { PLATFORM } =  require('../../constants/authConstant'); 

router.route('/admin/api/v1/projectroute/create').post(auth(PLATFORM.SYSTEM_USER),checkRolePermission,projectRouteController.addProjectRoute);
router.route('/admin/api/v1/projectroute/addBulk').post(auth(PLATFORM.SYSTEM_USER),checkRolePermission,projectRouteController.bulkInsertProjectRoute);
router.route('/admin/api/v1/projectroute/list').post(auth(PLATFORM.SYSTEM_USER),checkRolePermission,projectRouteController.findAllProjectRoute);
router.route('/admin/api/v1/projectroute/count').post(auth(PLATFORM.SYSTEM_USER),checkRolePermission,projectRouteController.getProjectRouteCount);
router.route('/admin/api/v1/projectroute/updateBulk').put(auth(PLATFORM.SYSTEM_USER),checkRolePermission,projectRouteController.bulkUpdateProjectRoute); 
router.route('/admin/api/v1/projectroute/softDeleteMany').put(auth(PLATFORM.SYSTEM_USER),checkRolePermission,projectRouteController.softDeleteManyProjectRoute);
router.route('/admin/api/v1/projectroute/deleteMany').post(auth(PLATFORM.SYSTEM_USER),checkRolePermission,projectRouteController.deleteManyProjectRoute);
router.route('/admin/api/v1/projectroute/softDelete/:id').put(auth(PLATFORM.SYSTEM_USER),checkRolePermission,projectRouteController.softDeleteProjectRoute);
router.route('/admin/api/v1/projectroute/partial-update/:id').put(auth(PLATFORM.SYSTEM_USER),checkRolePermission,projectRouteController.partialUpdateProjectRoute);   
router.route('/admin/api/v1/projectroute/update/:id').put(auth(PLATFORM.SYSTEM_USER),checkRolePermission,projectRouteController.updateProjectRoute);   
router.route('/admin/api/v1/projectroute/:id').get(auth(PLATFORM.SYSTEM_USER),checkRolePermission,projectRouteController.getProjectRouteById);
router.route('/admin/api/v1/projectroute/delete/:id').delete(auth(PLATFORM.SYSTEM_USER),checkRolePermission,projectRouteController.deleteProjectRoute);

module.exports = router;