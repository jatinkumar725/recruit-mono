const postDb = require('../../../data-access/postDb');
const appliedPostDb = require('../../../data-access/appliedPostDb');
const uploadDb = require("../../../data-access/uploadDb");
const termDb = require("../../../data-access/termDb");
const termTaxonomyDb = require("../../../data-access/termTaxonomyDb");
const termRelationshipDb = require("../../../data-access/termRelationshipDb");

// Schemas
const postSchema = require('../../../validation/schema/post');
const appliedPostSchema = require('../../../validation/schema/appliedPost');

// Schema Validations
const filterValidation = require('../../../validation')(postSchema.filterValidationSchema);

const filterAppliedPostValidation = require('../../../validation')(appliedPostSchema.filterValidationSchema);

const getUserUploadsUsecase = require('../../../use-case/fileUpload/getUserUploads')({
    uploadDb,
});

const getPostUsecase = require('../../../use-case/post/getPost')({
    postDb,
    filterValidation
});

const getAllPostUsecase = require('../../../use-case/post/findAllPost')({
    postDb,
    filterValidation
});

const getPostsUsecase = require('../../../use-case/post/getPosts')({
    postDb,
    filterValidation
});

const getAppliedPostUsecase = require('../../../use-case/appliedPost/getAppliedPost')({
    appliedPostDb,
    filterValidation: filterAppliedPostValidation
});

const partialUpdatePostUsecase = require('../../../use-case/post/partialUpdatePost')({
    postDb,
});

const QueryAndfilterJobPostsUsecase = require('../../../use-case/site/QueryAndfilterJobPosts')({
    postDb,
    termDb,
    termTaxonomyDb,
    termRelationshipDb,
});

const jobPostController = require('./jobPostsController');

const getJobPostDetails = jobPostController.getJobPostDetails(getPostUsecase, getUserUploadsUsecase, getAppliedPostUsecase);
const getJobPosts = jobPostController.getJobPosts(getPostsUsecase, getUserUploadsUsecase, getAppliedPostUsecase);
const updateJobPostViews = jobPostController.updateJobPostViews(partialUpdatePostUsecase);

// Search
const QueryAndfilterJobPosts = jobPostController.QueryAndfilterJobPosts(QueryAndfilterJobPostsUsecase);

module.exports = {
    getJobPostDetails,
    updateJobPostViews,
    getJobPosts,
    QueryAndfilterJobPosts
};