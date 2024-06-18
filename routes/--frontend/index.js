const express = require('express');
const router =  express.Router();

router.use(require('./seeker/v1/index'));
router.use(require('./site/index'));

module.exports = router;