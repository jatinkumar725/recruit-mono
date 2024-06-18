const express = require('express');
const router = express.Router();
const entityController = require('../../controller/site/entity');
const {
    auth,
} = require('../../middleware');
const { PLATFORM } = require('../../constants/authConstant');

router.route('/client/cloud-aggregator-service/v1/object/:type/education').get(auth(PLATFORM.SEEKER_CLIENT, true), entityController.getListEntity);

module.exports = router;