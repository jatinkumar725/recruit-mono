const express =  require('express');
const router =  express.Router();
router.use('/client/cloud-aggregator-rec/v1/auth',require('./auth'));
router.use(require('./userRoutes'));
router.use(require('./saveSeekerRoutes'));
router.use(require('./uploadRoutes'));
router.use(require('./postRoutes'));

module.exports = router;
