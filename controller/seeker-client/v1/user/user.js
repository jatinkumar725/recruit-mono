const response = require('../../../../utils/response');
const responseHandler = require('../../../../utils/response/responseHandler');
const getSelectObject = require('../../../../utils/getSelectObject');
const getObjectFromArray = require('../../../../utils/getObjectFromArray');
const { UPLOAD_TYPES, USER_QUERY_TYPES, USER_TYPES, } = require('../../../../constants/authConstant');
const TermRelationship = require('../../../../objects/relationship');
const mergeObjects = require('../../../../utils/mergeObjects');
const filterObjectFromArray = require('../../../../utils/filterObjectFromArray');

const changePassword = (changePasswordUsecase) => async (req, res) => {
  try {

    const accessToken = req.headers.authorization.replace("Bearer ", "");

    let params = {
      ...req.body,
      username: req.user.username,
      accessToken,
    };
    let result = await changePasswordUsecase(params);
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const changeEmailAddress = (changeEmailAddressUsecase) => async (req, res) => {
  try {
    let params = {
      ...req.body,
      email: req.user.email,
    };
    let result = await changeEmailAddressUsecase(params);
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const updateProfile = (updateProfileUsecase, updateTermRelationshipUsecase) => async (req, res) => {
  try {

    // Delete vulnerable fields
    delete req.body.password;
    delete req.body.username;
    delete req.body.email;

    let result = await updateProfileUsecase({
      userId: req.user.userId,
      profileData: req.body,
    });

    // Create an instance of TermRelationship
    const termRelationship = new TermRelationship();
    const { termData: reqTermData, restData: reqRestData } = termRelationship.separateTerms(req.body);
    const { termData: resultTermData, restData: resultRestData } = termRelationship.separateTerms(result.data);
    
    const mergedTermData = mergeObjects(reqTermData, resultTermData);

    if ( Object.keys(mergedTermData).length ) {

      const res1 = await updateTermRelationshipUsecase({
        objectId: req.user.userId,
        model_type: 'Seeker',
        termsData: mergedTermData
      });

    }

    // Set response data for client to level 1
    const filteredUserData = filterObjectFromArray(resultRestData, USER_QUERY_TYPES[USER_TYPES.Seeker][1]);
    result.data = filteredUserData;

    // Flatten Data
    // const flattenTermData = termData.flat();

    // if ( flattenTermData.length ) {

    //   await updateTermRelationshipUsecase({
    //     objectId: req.user.userId,
    //     model_type: 'Seeker',
    //     termsData: flattenTermData
    //   });

    // }

    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const deleteProfileEntity = (partialUpdateUserUsecase, deleteProfileEntityUsecase) => async (req, res) => {
  try {

    let result = await partialUpdateUserUsecase({
      query: { userId: req.user.userId },
      dataToUpdate: {
        $pull: {
          [req.params.entity]: {
            [`${req.params.entity}Id`]: req.params.entityId
          }
        }
      }
    });
    
    await deleteProfileEntityUsecase({
      query: {
        $and: [
          { objectId: req.user.userId },
          { objectGroup: req.params.entityId }
        ]
      }
    });

    return responseHandler(res, result);

  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const updateOnlineProfile = (updateOnlineProfileUsecase) => async (req, res) => {

  try {
    let result = await updateOnlineProfileUsecase({
      userId: req.user.userId,
      onlineProfileData: req.body
    });

    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }

};

const deleteOnlineProfile = (deleteOnlineProfileUsecase) => async (req, res) => {

  try {
    let result = await deleteOnlineProfileUsecase({
      userId: req.user.userId,
      ogId: req.params.ogId
    });

    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }

};

const updateProject = (updateProjectUsecase) => async (req, res) => {

  try {
    let result = await updateProjectUsecase({
      userId: req.user.userId,
      projectData: req.body
    });

    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }

};

const deleteProject = (deleteProjectUsecase) => async (req, res) => {

  try {
    let result = await deleteProjectUsecase({
      userId: req.user.userId,
      projectId: req.params.projectId
    });

    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }

};

const getLoggedInUserInfo = (getUserUsecase, getUserUploadsUsecase) => async (req, res) => {
  try {

    const { level } = req.query;

    const projections = USER_QUERY_TYPES[USER_TYPES.Seeker][level] || USER_QUERY_TYPES[USER_TYPES.Seeker][1];
    
    const options = {};
    const query = {
      userId: req.user.userId,
      isDeleted: false,
      isActive: true
    };

    const userResult = await getUserUsecase({ query, projections, options }, req, res);

    const userData = {
      ...userResult,
      data: {
        ...userResult.data.toJSON(),
      },
    };

    if ( [ 'profilePhoto', 'cvInfo' ].some(field => projections.includes( field ) ) ) {

      const uploadOptions = {};
      let uploadResult = {};
  
      const uploadQuery = {
        userId: userResult.data.profileId,
        uploadType: { "$in": [UPLOAD_TYPES.Profile.type, UPLOAD_TYPES.Resume.type] },
        isDeleted: false,
        isActive: true
      };
  
      uploadResult = await getUserUploadsUsecase({ query: uploadQuery, options: uploadOptions }, req, res);
      
      if ( projections.includes( 'profilePhoto' ) ) {
        const profileUpload = getObjectFromArray(uploadResult?.data || [], ['uploadType'], UPLOAD_TYPES.Profile.type)?.toJSON();
        userData.data.profilePhoto = profileUpload || null;
      }

      if ( projections.includes( 'cvInfo' ) ) {
        const cvUpload = getObjectFromArray(uploadResult?.data || [], ['uploadType'], UPLOAD_TYPES.Resume.type)?.toJSON();
        userData.data.cvInfo = cvUpload || null;
      }

    }

    return responseHandler(res, userData);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const deleteLoggedUser = (deleteUserUsecase, deleteTermRelationshipUsecase) => async (req, res) => {
  try {
    let query = { userId: req.user.userId };
    let result = await deleteUserUsecase({
      query,
      isWarning: req.body.isWarning || false
    }, req, res);

    if (result.data) {

      await deleteTermRelationshipUsecase({
        query: {
          objectId: req.user.userId,
          model_type: 'Seeker'
        }
      });

    }

    return responseHandler(res, result);
  } catch (error) {
    console.log(error);
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const getSeekerDashboardDetails = (getSeekerDashboardDetailsUsecase) => async (req, res) => {
  try {
    let result = await getSeekerDashboardDetailsUsecase({
      userId: req.user.userId
    });

    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

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