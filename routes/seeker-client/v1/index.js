const express =  require('express');
const router =  express.Router();
router.use('/client/cloud-aggregator-sk/v1/auth',require('./auth'));
router.use(require('./userRoutes'));
router.use(require('./uploadRoutes'));
router.use(require('./postRoutes'));

module.exports = router;
