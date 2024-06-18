const express = require('express');
const router = express.Router();

router.use(require('./home'));
router.use(require('./404'));

module.exports = router;