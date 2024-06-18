const appliedPostDb = require('../../../../data-access/appliedPostDb');
const postDb = require('../../../../data-access/postDb');
const uploadDb = require("../../../../data-access/uploadDb");

const getUserUploadsUsecase = require('../../../../use-case/fileUpload/getUserUploads')({
    uploadDb,
});

const appliedPostSchema = require('../../../../validation/schema/appliedPost');

const createValidation = require('../../../../validation')(appliedPostSchema.createSchema);
const filterValidation = require('../../../../validation')(appliedPostSchema.filterValidationSchema);

const addAppliedPostUseCase = require('../../../../use-case/appliedPost/addAppliedPost')({
    appliedPostDb, 
    postDb,
    createValidation
});

const findAllAppliedPostUseCase = require('../../../../use-case/appliedPost/findAllAppliedPost')({
    appliedPostDb, 
    filterValidation,
});

const appliedPostController = require('./post');

const applyToPost = appliedPostController.applyToPost(addAppliedPostUseCase);
const findAllAppliedPost = appliedPostController.findAllAppliedPost(findAllAppliedPostUseCase, getUserUploadsUsecase);

module.exports = {
    applyToPost,
    findAllAppliedPost,
};