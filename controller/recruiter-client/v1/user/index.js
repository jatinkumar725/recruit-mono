const recruiterDb = require('../../../../data-access/recruiterDb');
const seekerDb = require('../../../../data-access/seekerDb');
const savedSeekerDb = require('../../../../data-access/savedSeekerDb');
const userTokensDb = require('../../../../data-access/userTokensDb');
const postDb = require('../../../../data-access/postDb');
const uploadDb = require("../../../../data-access/uploadDb");
const appliedPostDb = require("../../../../data-access/appliedPostDb");

const getUserUploadsUsecase = require('../../../../use-case/fileUpload/getUserUploads')({
  uploadDb,
});

// Schemas
const recruiterSchema = require('../../../../validation/schema/recruiter');
const seekerSchema = require('../../../../validation/schema/seeker');
const savedSeekerSchema = require('../../../../validation/schema/savedSeeker');

// Schema Validations
const createSeekerValidation = require('../../../../validation')(seekerSchema.createSchema);
const filterSeekerValidation = require('../../../../validation')(seekerSchema.filterValidationSchema);
const filterRecruiterValidation = require('../../../../validation')(recruiterSchema.filterValidationSchema);

// Entities
const seekerEntity = require('../../../../entities/seeker');
const recruiterEntity = require('../../../../entities/recruiter');

// Seeker use cases
const addSeekerUsecase = require('../../../../use-case/user/addUser')({
  userDb: seekerDb,
  userEntity: seekerEntity,
  createValidation: createSeekerValidation
});

const findAllSeekerUsecase = require('../../../../use-case/user/findAllUser')({
  userDb: seekerDb,
  filterValidation: filterSeekerValidation
});

const getSeekerUsecase = require('../../../../use-case/user/getUser')({
  userDb: seekerDb,
  filterValidation: filterSeekerValidation
});

const bulkInsertSeekerUsecase = require('../../../../use-case/user/bulkInsertUser')({
  userDb: seekerDb,
  userEntity: seekerEntity,
  createValidation: createSeekerValidation
});

// Recruiter use cases
const updateRecruiterValidation = require('../../../../validation')(recruiterSchema.updateSchema);

const getRecruiterUsecase = require('../../../../use-case/user/getUser')({
  userDb: recruiterDb,
  filterValidation: filterRecruiterValidation
});

const changePasswordUsecase = require('../../../../use-case/user/changePassword')({ 
  userDb: recruiterDb,
  userTokensDb
});
const updateProfileUsecase = require('../../../../use-case/user/updateProfile')({
  userDb: recruiterDb,
  userEntity: recruiterEntity,
  updateValidation: updateRecruiterValidation
});

const deleteUserUsecase = require('../../../../use-case/user/deleteUser')({
  userDb: recruiterDb,
  userTokensDb,
});

const getRecruiterDashboardDetailsUsecase = require('../../../../use-case/dashboard/getRecruiterDashboardDetails')({
  postDb, 
  savedSeekerDb, 
  appliedPostDb
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

const addTermRelationshipUsecase = require('../../../../use-case/termRelationship/addTermRelationship')({
  termTaxonomyDb,
  termRelationshipDb,
  createValidation: createTermRelationshipValidation
});

const updateTermRelationshipUsecase = require('../../../../use-case/termRelationship/updateTermRelationship')({
  termDb,
  termTaxonomyDb,
  termRelationshipDb,
  createValidation: createTermRelationshipValidation,
  createTermValidation
});

const deleteTermRelationshipUsecase = require('../../../../use-case/termRelationship/deleteManyTermRelationship')({
  termTaxonomyDb,
  termRelationshipDb
});

/**
 * Post
 */
// Schemas
const postSchema = require('../../../../validation/schema/post');

// Schema Validations
const updateValidation = require('../../../../validation')(postSchema.updateSchema);

// const deleteManyPostUsecase = require('../../../../use-case/post/deleteManyPost')({ postDb });

const bulkUpdatePostUsecase = require('../../../../use-case/post/bulkUpdatePost')({
  postDb,
  updateValidation
});

const filterSavedSeekerValidation = require('../../../../validation')(savedSeekerSchema.filterValidationSchema);

const getSavedSeekerUsecase = require('../../../../use-case/savedSeeker/getSavedSeeker')({
  savedSeekerDb,
  filterValidation: filterSavedSeekerValidation
});

const userController = require('./user');

const addSeeker = userController.addUser(addSeekerUsecase, addTermRelationshipUsecase);
const findAllSeeker = userController.findAllUser(findAllSeekerUsecase);
const getSeeker = userController.getSeeker(getSeekerUsecase, getUserUploadsUsecase, getSavedSeekerUsecase);
const getSeekerResume = userController.getSeekerResume(getSeekerUsecase, getUserUploadsUsecase);
const bulkInsertSeeker = userController.bulkInsertUser(bulkInsertSeekerUsecase, addTermRelationshipUsecase);
const changePassword = userController.changePassword(changePasswordUsecase);
const updateProfile = userController.updateProfile(updateProfileUsecase, updateTermRelationshipUsecase);
const getLoggedInUserInfo = userController.getLoggedInUserInfo(getRecruiterUsecase, getUserUploadsUsecase);
const deleteLoggedUser = userController.deleteLoggedUser(
  deleteUserUsecase,
  bulkUpdatePostUsecase,
  deleteTermRelationshipUsecase
  // deleteManyPostUsecase  
);
const getRecruiterDashboardDetails = userController.getRecruiterDashboardDetails(getRecruiterDashboardDetailsUsecase);

module.exports = {
  addSeeker,
  findAllSeeker,
  bulkInsertSeeker,
  changePassword,
  updateProfile,
  getLoggedInUserInfo,
  deleteLoggedUser,
  getSeeker,
  getSeekerResume,
  getRecruiterDashboardDetails,
};