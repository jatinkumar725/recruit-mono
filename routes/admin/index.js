const express =  require('express');
const router =  express.Router();
router.use('/admin/api/v1/auth',require('./auth'));
router.use(require('./userRoutes'));
router.use(require('./roleRoutes'));
router.use(require('./projectRouteRoutes'));
router.use(require('./routeRoleRoutes'));
router.use(require('./userRoleRoutes'));
router.use(require('./uploadRoutes'));
router.use(require('./termRoutes'));
router.use(require('./postRoutes'));

module.exports = router;
