const express = require('express');
const router = express.Router();
const termController = require('../../controller/admin/term');
const {
  auth,checkRolePermission,
} = require('../../middleware');
const { PLATFORM } =  require('../../constants/authConstant'); 

router.route('/admin/api/v1/term/create').post(auth(PLATFORM.SYSTEM_USER),checkRolePermission,termController.addTerm);
router.route('/admin/api/v1/term/list').post(auth(PLATFORM.SYSTEM_USER),checkRolePermission,termController.findAllTerm);
router.route('/admin/api/v1/term/count').post(auth(PLATFORM.SYSTEM_USER),checkRolePermission,termController.getTermCount);
router.route('/admin/api/v1/term/:id').get(auth(PLATFORM.SYSTEM_USER),checkRolePermission,termController.getTermById);
router.route('/admin/api/v1/term/update/:id').put(auth(PLATFORM.SYSTEM_USER),checkRolePermission,termController.updateTerm);   
router.route('/admin/api/v1/term/partial-update/:id').put(auth(PLATFORM.SYSTEM_USER),checkRolePermission,termController.partialUpdateTerm);   
router.route('/admin/api/v1/term/softDelete/:id').put(auth(PLATFORM.SYSTEM_USER),checkRolePermission,termController.softDeleteTerm);
router.route('/admin/api/v1/term/softDeleteMany').put(auth(PLATFORM.SYSTEM_USER),checkRolePermission,termController.softDeleteManyTerm);
router.route('/admin/api/v1/term/softReactivate/:id').put(auth(PLATFORM.SYSTEM_USER),checkRolePermission,termController.softReactivateTerm);
router.route('/admin/api/v1/term/softReactivateMany').put(auth(PLATFORM.SYSTEM_USER),checkRolePermission,termController.softReactivateManyTerm);
router.route('/admin/api/v1/term/addBulk').post(auth(PLATFORM.SYSTEM_USER),termController.bulkInsertTerm);
router.route('/admin/api/v1/term/updateBulk').put(auth(PLATFORM.SYSTEM_USER),checkRolePermission,termController.bulkUpdateTerm); 
router.route('/admin/api/v1/term/delete/:id').delete(auth(PLATFORM.SYSTEM_USER),checkRolePermission,termController.deleteTerm);
router.route('/admin/api/v1/term/deleteMany').post(auth(PLATFORM.SYSTEM_USER),checkRolePermission,termController.deleteManyTerm);

module.exports = router;