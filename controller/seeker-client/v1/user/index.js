const seekerDb = require('../../../../data-access/seekerDb');
const userTokensDb = require('../../../../data-access/userTokensDb');
const uploadDb = require("../../../../data-access/uploadDb");
const codeDb = require("../../../../data-access/codeDb");

const seekerSchema = require('../../../../validation/schema/seeker');
const seekerEntity = require('../../../../entities/seeker');

const getUserUploadsUsecase = require('../../../../use-case/fileUpload/getUserUploads')({
  uploadDb,
});

const updateValidation = require('../../../../validation')(seekerSchema.updateSchema);
const filterValidation = require('../../../../validation')(seekerSchema.filterValidationSchema);
const getUserUsecase = require('../../../../use-case/user/getUser')({
  userDb: seekerDb,
  filterValidation
});
const changePasswordUsecase = require('../../../../use-case/user/changePassword')({ 
  userDb: seekerDb,
  userTokensDb,
});
const changeEmailAddressUsecase = require('../../../../use-case/user/changeEmailAddress')({ 
  userDb: seekerDb,
  codeDb
});
const updateProfileUsecase = require('../../../../use-case/user/updateProfile')({
  userDb: seekerDb,
  userEntity: seekerEntity,
  updateValidation
});
const updateOnlineProfileUsecase = require('../../../../use-case/user/updateOnlineProfile')({
  userDb: seekerDb,
});
const deleteOnlineProfileUsecase = require('../../../../use-case/user/deleteOnlineProfile')({
  userDb: seekerDb,
});
const updateProjectUsecase = require('../../../../use-case/user/updateProject')({
  userDb: seekerDb,
});
const deleteProjectUsecase = require('../../../../use-case/user/deleteProject')({
  userDb: seekerDb,
});
const deleteUserUsecase = require('../../../../use-case/user/deleteUser')({
  userDb: seekerDb,
  userTokensDb,
  uploadDb,
});

const getSeekerDashboardDetailsUsecase = require('../../../../use-case/dashboard/getSeekerDashboardDetails')({
  seekerDb,
  uploadDb,
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

const partialUpdateUserUsecase = require('../../../../use-case/user/partialUpdateUser')({
  userDb: seekerDb,
});

const deleteTermRelationshipUsecase = require('../../../../use-case/termRelationship/deleteManyTermRelationship')({
  termTaxonomyDb, 
  termRelationshipDb
});


const userController = require('./user');

const changePassword = userController.changePassword(changePasswordUsecase);
const changeEmailAddress = userController.changeEmailAddress(changeEmailAddressUsecase);
const updateProfile = userController.updateProfile(updateProfileUsecase, updateTermRelationshipUsecase);
const deleteProfileEntity = userController.deleteProfileEntity(partialUpdateUserUsecase, deleteTermRelationshipUsecase);
const updateOnlineProfile = userController.updateOnlineProfile(updateOnlineProfileUsecase);
const deleteOnlineProfile = userController.deleteOnlineProfile(deleteOnlineProfileUsecase);
const updateProject = userController.updateProject(updateProjectUsecase);
const deleteProject = userController.deleteProject(deleteProjectUsecase);
const getLoggedInUserInfo = userController.getLoggedInUserInfo(getUserUsecase, getUserUploadsUsecase);
const deleteLoggedUser = userController.deleteLoggedUser(deleteUserUsecase, deleteTermRelationshipUsecase);
const getSeekerDashboardDetails = userController.getSeekerDashboardDetails(getSeekerDashboardDetailsUsecase);

module.exports = {
  changePassword,
  changeEmailAddress,
  updateProfile,
  deleteProfileEntity,
  updateOnlineProfile,
  deleteOnlineProfile,
  updateProject,
  deleteProject,
  getLoggedInUserInfo,
  deleteLoggedUser,
  getSeekerDashboardDetails,
};