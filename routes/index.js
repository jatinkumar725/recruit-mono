const express = require('express');
const router =  express.Router();

// Backend Route

router.use(require('./site/index'));
router.use(require('./admin/index'));
router.use(require('./recruiter-client/v1/index'));
router.use(require('./seeker-client/v1/index'));
router.use(require('./googleLoginRoutes'));

// Frontend Route
// router.use(require('./frontend/index'));

module.exports = router;