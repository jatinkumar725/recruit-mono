const uploadDb = require("../../../../data-access/uploadDb");
const savedSeekerDb = require('../../../../data-access/savedSeekerDb');
const seekerDb = require('../../../../data-access/seekerDb');
const recruiterDb = require('../../../../data-access/recruiterDb');

// Schema
const savedSeekerSchema = require('../../../../validation/schema/savedSeeker');

// Schema Validations
const createValidation = require('../../../../validation')(savedSeekerSchema.createSchema);
const updateValidation = require('../../../../validation')(savedSeekerSchema.updateSchema);
const filterValidation = require('../../../../validation')(savedSeekerSchema.filterValidationSchema);

// Save seeker use-case function to be called by route
const getSavedSeekersUsecase = require('../../../../use-case/savedSeeker/getSavedSeekers')({
    savedSeekerDb,
    filterValidation
});

const addSavedSeekerUsecase = require('../../../../use-case/savedSeeker/addSavedSeeker')({
    savedSeekerDb,
    recruiterDb,
    createValidation
});

const deleteSavedSeekerUsecase = require('../../../../use-case/savedSeeker/deleteSavedSeeker')({
    savedSeekerDb,
    recruiterDb,
    filterValidation
});

const getUserIdUsecase = require('../../../../use-case/common/getUserId')({
    userDb: seekerDb
});

const getUserUploadsUsecase = require("../../../../use-case/fileUpload/getUpload")({
    uploadDb,
});

// Controller
const savedSeekerController = require('./savedSeekerController');

const saveSeeker = savedSeekerController.saveSeeker(addSavedSeekerUsecase, getUserIdUsecase);
const getSavedSeekers = savedSeekerController.getSavedSeekers(getSavedSeekersUsecase, getUserUploadsUsecase);
const deleteSavedSeeker = savedSeekerController.deleteSavedSeeker(deleteSavedSeekerUsecase);

module.exports = {
    saveSeeker,
    getSavedSeekers,
    deleteSavedSeeker
};