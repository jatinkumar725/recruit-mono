const response = require('../../../../utils/response'); 
const responseHandler = require('../../../../utils/response/responseHandler'); 
const {  USER_QUERY_TYPES, USER_TYPES } = require("../../../../constants/authConstant");
const filterObjectFromArray = require("../../../../utils/filterObjectFromArray");

const upload = (fileUploadUsecase) => async (req,res) => {
  try {

    const { profileId } = req.params;

    let result = await fileUploadUsecase(profileId, req,res);
    return responseHandler(res,result);
  } catch (error) {
    console.log(error);
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const getUpload = ({
  getUploadUsecase,
  uploadType,
}) => async (req, res) => { 
  try {
    const options = {};
    const query = {
      profileId: req.params.profileId,
      uploadType,
      isDeleted: false,
      isActive: true
    };
    let result = await getUploadUsecase({
      query,
      options 
    },req,res);
    return responseHandler(res,result);
  } catch (error) {
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const deleteUpload = ({
  deleteUploadUsecase,
  uploadType,
}) => async (req, res) => { 
  try {
    const options = {};
    const query = {
      userId: req.params.profileId,
      uploadType,
      isDeleted: false,
      isActive: true
    };
    const result = await deleteUploadUsecase({
      query,
      options 
    },req,res);
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const uploadKYCDocs = (fileUploadUsecase, updateProfileUsecase) => async (req,res) => {
  try {

    const { profileId } = req.params;

    let result = await fileUploadUsecase(profileId, req,res);

    if (result.status === 'error') {
      return responseHandler(res, result);
    }

    let profileResult = await updateProfileUsecase({
      userId: req.user.userId,
      profileData: {
        isKYCDocsUploaded: true,
      },
    });

    const jsonProfileData = profileResult.data.toJSON();

    // Set response data for client to level 1
    const filteredUserData = filterObjectFromArray(
      jsonProfileData,
      USER_QUERY_TYPES[USER_TYPES.Recruiter][1]
    );

    profileResult.data = filteredUserData;

    return responseHandler(res,{
      ...result,
      data: {
        upload: result.data,
        profile: profileResult.data,
      },
    });
  } catch (error) {
    console.log(error);
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

module.exports = { 
  upload,
  getUpload,
  deleteUpload,
  uploadKYCDocs,
};