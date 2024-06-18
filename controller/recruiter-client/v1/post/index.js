const postDb = require('../../../../data-access/postDb');
const appliedPostDb = require('../../../../data-access/appliedPostDb');
const uploadDb = require("../../../../data-access/uploadDb");

// Schemas
const postSchema = require('../../../../validation/schema/post');

// Schema Validations
const createValidation = require('../../../../validation')(postSchema.createSchema);
const filterValidation = require('../../../../validation')(postSchema.filterValidationSchema);
const updateValidation = require('../../../../validation')(postSchema.updateSchema);

// Post use cases
const addPostUsecase = require('../../../../use-case/post/addPost')({
    postDb,
    createValidation
});

const bulkInsertPostUsecase = require('../../../../use-case/post/bulkInsertPost')({
    postDb,
    createValidation
});

const findAllPostUsecase = require('../../../../use-case/post/findAllPost')({
    postDb,
    filterValidation
});

const updatePostUsecase = require('../../../../use-case/post/updatePost')({
    postDb,
    updateValidation
});

const deleteUserPostUsecase = require('../../../../use-case/post/deletePost')({
    postDb,
});

const getUserPostCountUsecase = require('../../../../use-case/post/getPostCount')({
    postDb,
    filterValidation
});

const getPostUsecase = require('../../../../use-case/post/getPost')({
    postDb,
    filterValidation
});

const partialUpdatePostUsecase = require('../../../../use-case/post/partialUpdatePost')({
    postDb,
});

const bulkUpdatePostUsecase = require('../../../../use-case/post/bulkUpdatePost')({
    postDb,
    updateValidation
});

/**
 * Term relationship
 */
const termDb = require('../../../../data-access/termDb');
const termRelationshipDb = require('../../../../data-access/termRelationshipDb');
const termTaxonomyDb = require('../../../../data-access/termTaxonomyDb');

// Term Relationship Schema
const termRelationshipSchema = require('../../../../validation/schema/termRelationship');

// Term Relationship Validation
const createTermRelationshipValidation = require('../../../../validation')(termRelationshipSchema.createSchema);

// Term Schema
const termSchema = require('../../../../validation/schema/term');

// Term Validation
const createTermValidation = require('../../../../validation')(termSchema.createSchema);

const updateTermRelationshipUsecase = require('../../../../use-case/termRelationship/updateTermRelationship')({
  termDb,
  termTaxonomyDb, 
  termRelationshipDb, 
  createValidation: createTermRelationshipValidation,
  createTermValidation
});

// const addTermRelationshipUsecase = require('../../../../use-case/termRelationship/addTermRelationship')({
//   termTaxonomyDb, 
//   termRelationshipDb, 
//   createValidation: createTermRelationshipValidation
// });

const deleteTermRelationshipUsecase = require('../../../../use-case/termRelationship/deleteManyTermRelationship')({
  termTaxonomyDb, 
  termRelationshipDb
});

// Uploads
const getUserUploadsUsecase = require('../../../../use-case/fileUpload/getUserUploads')({
    uploadDb,
});

// Post Applications
const appliedPostSchema = require('../../../../validation/schema/appliedPost');

const appliedPostFilterValidation = require('../../../../validation')(appliedPostSchema.filterValidationSchema);

const getApplicationsOfJobPostUseCase = require('../../../../use-case/appliedPost/findApplicationsOfJobPost')({
    appliedPostDb, 
    filterValidation: appliedPostFilterValidation,
});

const getAppliedPostUseCase = require('../../../../use-case/appliedPost/getAppliedPost')({
    appliedPostDb, 
    filterValidation: appliedPostFilterValidation,
});

const partialUpdateAppliedPostUseCase = require('../../../../use-case/appliedPost/partialUpdateAppliedPost')({
    appliedPostDb, 
});

const postController = require('./post');

const sendApplicationStatusByEmail = require('../../../../use-case/common/sendApplicationStatusByEmail');

const addPost = postController.addPost(addPostUsecase, updateTermRelationshipUsecase);
const findAllPost = postController.findAllPost(findAllPostUsecase);
const bulkInsertPost = postController.bulkInsertPost(bulkInsertPostUsecase);
const updatePost = postController.updatePost(updatePostUsecase, updateTermRelationshipUsecase);
const bulkUpdatePost = postController.bulkUpdatePost(bulkUpdatePostUsecase);
const partialUpdatePost = postController.partialUpdatePost(partialUpdatePostUsecase, updateTermRelationshipUsecase);
const deleteLoggedUserPost = postController.deleteLoggedUserPost(deleteUserPostUsecase, deleteTermRelationshipUsecase);
const getPostCount = postController.getPostCount(getUserPostCountUsecase);
const getUserPost = postController.getUserPost(getPostUsecase);
const deletePostEntity = postController.deletePostEntity(partialUpdatePostUsecase, deleteTermRelationshipUsecase);
const getApplicationsOfJobPost = postController.getApplicationsOfJobPost(getApplicationsOfJobPostUseCase, getUserUploadsUsecase);
const getApplicationAttachments = postController.getApplicationAttachments(getAppliedPostUseCase, getUserUploadsUsecase);
const markReadToApplicationOfJobPost = postController.markReadToApplicationOfJobPost(partialUpdateAppliedPostUseCase);
const markShortlistRejectApplicationOfJobPost = postController.markShortlistRejectApplicationOfJobPost(partialUpdateAppliedPostUseCase, sendApplicationStatusByEmail);

module.exports = {
    addPost,
    bulkInsertPost,
    findAllPost,
    getUserPost,
    getPostCount,
    updatePost,
    bulkUpdatePost,
    partialUpdatePost,
    deleteLoggedUserPost,
    deletePostEntity,
    getApplicationsOfJobPost,
    getApplicationAttachments,
    markReadToApplicationOfJobPost,
    markShortlistRejectApplicationOfJobPost,
};