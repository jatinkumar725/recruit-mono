const express = require('express');
const router = express.Router();
const fileUploadController = require('../../controller/admin/fileUpload');
const responseHandler = require('../../utils/response/responseHandler');

router.route('/admin/api/v1/upload').post(fileUploadController.upload);

module.exports = router;
