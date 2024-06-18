const express = require('express');
const router = express.Router();
const suggesterController = require('../../controller/site/taxonomy');

router.route('/client/cloud-aggregator-taxonomy/suggester').get(suggesterController.findAllTerm);

module.exports = router;