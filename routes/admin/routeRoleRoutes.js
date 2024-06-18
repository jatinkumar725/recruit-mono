const express = require('express');
const router = express.Router();
const routeRoleController = require('../../controller/admin/routeRole');
const {
  auth,checkRolePermission,
} = require('../../middleware');
const { PLATFORM } =  require('../../constants/authConstant'); 

router.route('/admin/api/v1/routerole/create').post(auth(PLATFORM.SYSTEM_USER),checkRolePermission,routeRoleController.addRouteRole);
router.route('/admin/api/v1/routerole/addBulk').post(auth(PLATFORM.SYSTEM_USER),checkRolePermission,routeRoleController.bulkInsertRouteRole);
router.route('/admin/api/v1/routerole/list').post(auth(PLATFORM.SYSTEM_USER),checkRolePermission,routeRoleController.findAllRouteRole);
router.route('/admin/api/v1/routerole/count').post(auth(PLATFORM.SYSTEM_USER),checkRolePermission,routeRoleController.getRouteRoleCount);
router.route('/admin/api/v1/routerole/updateBulk').put(auth(PLATFORM.SYSTEM_USER),checkRolePermission,routeRoleController.bulkUpdateRouteRole); 
router.route('/admin/api/v1/routerole/softDeleteMany').put(auth(PLATFORM.SYSTEM_USER),checkRolePermission,routeRoleController.softDeleteManyRouteRole);
router.route('/admin/api/v1/routerole/deleteMany').post(auth(PLATFORM.SYSTEM_USER),checkRolePermission,routeRoleController.deleteManyRouteRole);
router.route('/admin/api/v1/routerole/softDelete/:id').put(auth(PLATFORM.SYSTEM_USER),checkRolePermission,routeRoleController.softDeleteRouteRole);
router.route('/admin/api/v1/routerole/partial-update/:id').put(auth(PLATFORM.SYSTEM_USER),checkRolePermission,routeRoleController.partialUpdateRouteRole);   
router.route('/admin/api/v1/routerole/update/:id').put(auth(PLATFORM.SYSTEM_USER),checkRolePermission,routeRoleController.updateRouteRole);   
router.route('/admin/api/v1/routerole/:id').get(auth(PLATFORM.SYSTEM_USER),checkRolePermission,routeRoleController.getRouteRoleById);
router.route('/admin/api/v1/routerole/delete/:id').delete(auth(PLATFORM.SYSTEM_USER),checkRolePermission,routeRoleController.deleteRouteRole);

module.exports = router;
