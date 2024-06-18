let uploadDb = require("../../../../data-access/uploadDb");
const recruiterDb = require('../../../../data-access/recruiterDb');

const {
  ALLOWED_FILETYPES,
  USER_TYPES,
  UPLOAD_TYPES,
  MODEL_TYPE,
} = require("../../../../constants/authConstant");

const logoUploadUsecase = require("../../../../use-case/fileUpload/upload")({
  uploadDb,
  allowedFileTypes: ALLOWED_FILETYPES[USER_TYPES.Recruiter][UPLOAD_TYPES.Logo.type],
  uploadType: UPLOAD_TYPES.Logo,
  modelType: MODEL_TYPE[USER_TYPES.Recruiter],
});

const docsUploadUsecase = require("../../../../use-case/fileUpload/upload")({
  uploadDb,
  allowedFileTypes: ALLOWED_FILETYPES[USER_TYPES.Recruiter][UPLOAD_TYPES.Doc.type],
  uploadType: UPLOAD_TYPES.Doc,
  modelType: MODEL_TYPE[USER_TYPES.Recruiter],
});

const getUploadUsecase = require("../../../../use-case/fileUpload/getUpload")({
  uploadDb,
});

const deleteUploadUsecase = require("../../../../use-case/fileUpload/deleteUpload")({
  uploadDb,
});

const fileUploadController = require("./fileUploadController");

const uploadLogo = fileUploadController.upload(logoUploadUsecase);

const getUploadedLogo = fileUploadController.getUpload({
  getUploadUsecase,
  uploadType: UPLOAD_TYPES.Logo.type,
});

const deleteUploadedLogo = fileUploadController.deleteUpload({
  deleteUploadUsecase,
  uploadType: UPLOAD_TYPES.Logo.type,
});

// Schemas
const recruiterSchema = require('../../../../validation/schema/recruiter');

// Entities
const recruiterEntity = require('../../../../entities/recruiter');

// Recruiter use cases
const updateRecruiterValidation = require('../../../../validation')(recruiterSchema.updateSchema);

const updateProfileUsecase = require('../../../../use-case/user/updateProfile')({
  userDb: recruiterDb,
  userEntity: recruiterEntity,
  updateValidation: updateRecruiterValidation
});

const uploadDocs = fileUploadController.uploadKYCDocs(docsUploadUsecase, updateProfileUsecase);

module.exports = {
  uploadLogo,
  getUploadedLogo,
  deleteUploadedLogo,
  uploadDocs,
};