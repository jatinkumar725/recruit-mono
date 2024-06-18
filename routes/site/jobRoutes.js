const express = require('express');
const router = express.Router();
const jobPostsController = require('../../controller/site/JobPosts');
const {
    auth,
} = require('../../middleware');
const { PLATFORM } = require('../../constants/authConstant');

router.route('/rp-job-api/v1/job').get(auth(PLATFORM.SEEKER_CLIENT, true), jobPostsController.getJobPostDetails);
router.route('/rp-job-api/v1/jobs').get(auth(PLATFORM.SEEKER_CLIENT, true), jobPostsController.getJobPosts);
router.route('/rp-job-api/v1/job/viewed').post(auth(PLATFORM.SEEKER_CLIENT, true), jobPostsController.updateJobPostViews);

// Search
router.route('/rp-job-api/v1/job-search').get(auth(PLATFORM.SEEKER_CLIENT, true), jobPostsController.QueryAndfilterJobPosts);

module.exports = router;