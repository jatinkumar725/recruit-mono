const express =  require('express');
const router =  express.Router();
router.use(require('./entityRoutes'));
router.use(require('./taxonomySuggestRoutes'));
router.use(require('./jobRoutes'));
router.use(require('./loginStatus'));

module.exports = router;