let uploadDb = require("../../../../data-access/uploadDb");
const {
  ALLOWED_FILETYPES,
  USER_TYPES,
  UPLOAD_TYPES,
  MODEL_TYPE,
} = require("../../../../constants/authConstant");

const profileUploadUsecase = require("../../../../use-case/fileUpload/upload")({
  uploadDb,
  allowedFileTypes: ALLOWED_FILETYPES[USER_TYPES.Seeker][UPLOAD_TYPES.Profile.type],
  uploadType: UPLOAD_TYPES.Profile,
  modelType: MODEL_TYPE[USER_TYPES.Seeker],
});

const resumeUploadUsecase = require("../../../../use-case/fileUpload/upload")({
  uploadDb,
  allowedFileTypes: ALLOWED_FILETYPES[USER_TYPES.Seeker][UPLOAD_TYPES.Resume.type],
  uploadType: UPLOAD_TYPES.Resume,
  modelType: MODEL_TYPE[USER_TYPES.Seeker],
});

const getUploadUsecase = require("../../../../use-case/fileUpload/getUpload")({
  uploadDb,
});

const deleteUploadUsecase = require("../../../../use-case/fileUpload/deleteUpload")({
  uploadDb,
});

const fileUploadController = require("./fileUploadController");

const uploadProfile = fileUploadController.upload(profileUploadUsecase);
const uploadResume = fileUploadController.upload(resumeUploadUsecase);

const getUploadedProfile = fileUploadController.getUpload({
  getUploadUsecase,
  uploadType: UPLOAD_TYPES.Profile.type,
});

const getUploadedResume = fileUploadController.getUpload({
  getUploadUsecase,
  uploadType: UPLOAD_TYPES.Resume.type,
});

const deleteUploadedProfile = fileUploadController.deleteUpload({
  deleteUploadUsecase,
  uploadType: UPLOAD_TYPES.Profile.type,
});

const deleteUploadedResume = fileUploadController.deleteUpload({
  deleteUploadUsecase,
  uploadType: UPLOAD_TYPES.Resume.type,
});

module.exports = {
  uploadProfile,
  uploadResume,
  getUploadedProfile,
  getUploadedResume,
  deleteUploadedProfile,
  deleteUploadedResume,
};