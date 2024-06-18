const response = require("../../../../utils/response");
const responseHandler = require("../../../../utils/response/responseHandler");
const getSelectObject = require("../../../../utils/getSelectObject");
const getObjectFromArray = require("../../../../utils/getObjectFromArray");
const {
  USER_TYPES,
  MODEL_TYPE,
  USER_QUERY_TYPES,
  UPLOAD_TYPES,
} = require("../../../../constants/authConstant");
const TermRelationship = require("../../../../objects/relationship");
const mergeObjects = require("../../../../utils/mergeObjects");
const filterObjectFromArray = require("../../../../utils/filterObjectFromArray");

// Add seeker
const addUser =
  (addUserUsecase, addTermRelationshipUsecase) => async (req, res) => {
    try {
      // Delete vulnerable payloads
      delete req.body.password;
      delete req.body.username;

      let dataToCreate = { ...(req.body || {}) };
      dataToCreate.userType = authConstant.USER_TYPES.Seeker;
      dataToCreate.addedBy = req.user.id;
      dataToCreate.userType = USER_TYPES.Seeker;
      dataToCreate.model_type = MODEL_TYPE[req.user.userType];

      // Create an instance of TermRelationship
      const termRelationship = new TermRelationship();
      const { termData, restData } = termRelationship.separateTerms(req.body);

      let result = await addUserUsecase(restData, req, res);

      if (result.data) {
        /**
         * Add term relationship
         */
        const flattenTermData = termData.flat();

        for (const term of flattenTermData) {
          const resultRelationship = await addTermRelationshipUsecase({
            ...term,
            objectId: result.data.userId,
            model_type: "Seeker",
          });
        }
      }

      return responseHandler(res, result);
    } catch (error) {
      return responseHandler(
        res,
        response.internalServerError({ message: error.message })
      );
    }
  };

const bulkInsertUser =
  (bulkInsertUserUsecase, addTermRelationshipUsecase) => async (req, res) => {
    try {
      // Delete vulnerable payloads
      delete req.body.password;
      delete req.body.username;

      let dataToCreate = [...req.body.data];
      for (let i = 0; i < dataToCreate.length; i++) {
        dataToCreate[i] = {
          ...dataToCreate[i],
          addedBy: req.user.id,
          userType: USER_TYPES.Seeker,
          model_type: MODEL_TYPE[req.user.userType],
        };
      }
      let result = await bulkInsertUserUsecase(dataToCreate, req, res);

      return responseHandler(res, result);
    } catch (error) {
      return responseHandler(
        res,
        response.internalServerError({ message: error.message })
      );
    }
  };

const findAllUser = (findAllUserUsecase) => async (req, res) => {
  try {
    let query = { ...(req.body.query || {}) };
    let options = { ...(req.body.options || {}) };
    query._id = { $ne: req.user.id };
    if (req.body && req.body.query && req.body.query._id) {
      query._id.$in = [req.body.query._id];
    }
    let result = await findAllUserUsecase(
      {
        query,
        options,
        isCountOnly: req.body.isCountOnly || false,
      },
      req,
      res
    );
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(
      res,
      response.internalServerError({ message: error.message })
    );
  }
};

const getUser = (getUserUsecase) => async (req, res) => {
  try {
    if (!req.params.id) {
      return responseHandler(res, response.badRequest());
    }
    let query = { userId: req.params.id };
    let options = {};
    let result = await getUserUsecase(
      {
        query,
        options,
      },
      req,
      res
    );
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(
      res,
      response.internalServerError({ message: error.message })
    );
  }
};

const getUserCount = (getUserCountUsecase) => async (req, res) => {
  try {
    let where = { ...(req.body.where || {}) };
    let result = await getUserCountUsecase({ where }, req, res);
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(
      res,
      response.internalServerError({ message: error.message })
    );
  }
};

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
    return responseHandler(
      res,
      response.internalServerError({ message: error.message })
    );
  }
};

const updateProfile =
  (updateProfileUsecase, updateTermRelationshipUsecase) => async (req, res) => {
    try {
      // Delete vulnerable fields
      delete req.body.password;
      delete req.body.username;
      delete req.body.email;
      delete req.body.company;

      let result = await updateProfileUsecase({
        userId: req.user.userId,
        profileData: req.body,
      });

      // Create an instance of TermRelationship
      const termRelationship = new TermRelationship();
      const { termData: reqTermData, restData: reqRestData } =
        termRelationship.separateTerms(req.body);
      const { termData: resultTermData, restData: resultRestData } =
        termRelationship.separateTerms(result.data);

      const mergedTermData = mergeObjects(reqTermData, resultTermData);

      if (Object.keys(mergedTermData).length) {
        const res1 = await updateTermRelationshipUsecase({
          objectId: req.user.userId,
          model_type: "Recruiter",
          termsData: mergedTermData,
        });
      }

      // Set response data for client to level 1
      const filteredUserData = filterObjectFromArray(
        resultRestData,
        USER_QUERY_TYPES[USER_TYPES.Recruiter][1]
      );
      result.data = filteredUserData;

      return responseHandler(res, result);
    } catch (error) {
      return responseHandler(
        res,
        response.internalServerError({ message: error.message })
      );
    }
  };

const getLoggedInUserInfo =
  (getUserUsecase, getUserUploadsUsecase) => async (req, res) => {
    try {
      const { level } = req.query;

      const projections = USER_QUERY_TYPES[USER_TYPES.Recruiter][level] || USER_QUERY_TYPES[USER_TYPES.Recruiter][1];

      const options = {};
      const query = {
        userId: req.user.userId,
        isDeleted: false,
        isActive: true,
      };

      const userResult = await getUserUsecase(
        { query, projections, options },
        req,
        res
      );

      const userData = {
        ...userResult,
        data: {
          ...userResult.data.toJSON(),
        },
      };

      if (["companyLogo"].some((field) => projections.includes(field))) {
        const uploadOptions = {};
        let uploadResult = {};

        const uploadQuery = {
          userId: userResult.data.profileId,
          uploadType: { $in: [UPLOAD_TYPES.Logo.type] },
          isDeleted: false,
          isActive: true,
        };

        uploadResult = await getUserUploadsUsecase(
          { query: uploadQuery, options: uploadOptions },
          req,
          res
        );

        if (projections.includes("companyLogo")) {
          const logoUpload = getObjectFromArray(
            uploadResult?.data || [],
            ["uploadType"],
            UPLOAD_TYPES.Logo.type
          )?.toJSON();
          userData.data.companyLogo = logoUpload || null;
        }
      }

      return responseHandler(res, userData);
    } catch (error) {
      console.error("error", error);
      return responseHandler(
        res,
        response.internalServerError({ message: error.message })
      );
    }
  };

const deleteLoggedUser =
  (
    deleteUserUsecase,
    bulkUpdatePostUsecase,
    deleteTermRelationshipUsecase
    // deleteManyPostUsecase
  ) =>
    async (req, res) => {
      try {
        let query = { userId: req.user.userId };
        let result = await deleteUserUsecase(
          {
            query,
            isWarning: req.body.isWarning || false,
          },
          req,
          res
        );

        if (result.data) {
          // Delete user terms
          await deleteTermRelationshipUsecase({
            query: {
              objectId: req.user.userId,
              model_type: "Recruiter",
            },
          });

          // Set isDeleted to true for user post
          const updatedPosts = await bulkUpdatePostUsecase({
            query: { addedBy: req.user.id },
            dataToUpdate: { isDeleted: true },
            isCountOnly: false,
          });

          // ? Uncomment this portion if you want to delete the user posts
          // const deletedPosts = await deleteManyPostUsecase({
          //   query: { addedBy: req.user.id },
          // });

          // Get updated post ids
          // Add logic to get deleted posts postId ( deletedPostsIds:Array )

          // Delete post term relationships of deleted posts
          // await deleteTermRelationshipUsecase({
          //   query: {
          //     objectId: {
          //       $in: deletedPostsIds,
          //     },
          //     model_type: 'Post'
          //   }
          // });
        }

        return responseHandler(res, result);
      } catch (error) {
        console.log(error);
        return responseHandler(
          res,
          response.internalServerError({ message: error.message })
        );
      }
    };

const getSeeker =
  (getUserUsecase, getUserUploadsUsecase, getSavedSeekerUsecase) => async (req, res) => {
    try {
      if (!req.params.seekerId) {
        return responseHandler(res, response.badRequest());
      }
      let query = { userId: req.params.seekerId };
      let options = {};
      let projections = USER_QUERY_TYPES[USER_TYPES.Seeker][2];
      let result = await getUserUsecase(
        {
          query,
          options,
          projections,
        },
        req,
        res
      );

      let jsonResultData;
      if (
        result.data &&
        ["profilePhoto", "cvInfo"].some((field) => projections.includes(field))
      ) {

        jsonResultData = result.data.toJSObject();

        const uploadOptions = {};
        let uploadResult = {};

        const uploadQuery = {
          userId: jsonResultData.profileId,
          uploadType: {
            $in: [UPLOAD_TYPES.Profile.type, UPLOAD_TYPES.Resume.type],
          },
          isDeleted: false,
          isActive: true,
        };

        uploadResult = await getUserUploadsUsecase(
          { query: uploadQuery, options: uploadOptions },
          req,
          res
        );

        // Profile picture
        if (projections.includes("profilePhoto")) {
          const profileUpload = getObjectFromArray(
            uploadResult?.data || [],
            ["uploadType"],
            UPLOAD_TYPES.Profile.type
          )?.toJSON();
          jsonResultData.profilePhoto = profileUpload || null
        }

        // CV Resume
        if (projections.includes("cvInfo")) {
          const cvUpload = getObjectFromArray(
            uploadResult?.data || [],
            ["uploadType"],
            UPLOAD_TYPES.Resume.type
          )?.toJSON();
          jsonResultData.cvInfo = cvUpload || null;
        }

        // Check if seeker is saved
        const savedSeeker = await getSavedSeekerUsecase({
          query: { seekerId: jsonResultData.id, recruiterId: req.user.id },
        });

        if (savedSeeker.data) {
          jsonResultData.isSaved = true;
        } else {
          jsonResultData.isSaved = false;
        }

        delete jsonResultData.id;
        delete jsonResultData.__v;
        delete jsonResultData.ssoAuth;
        delete jsonResultData.isActive;
        delete jsonResultData.isDeleted;

      }
      return responseHandler(res, {
        ...result,
        data: jsonResultData
      });
    } catch (error) {
      return responseHandler(
        res,
        response.internalServerError({ message: error.message })
      );
    }
  };

const getSeekerResume =
  (getUserUsecase, getUserUploadsUsecase) => async (req, res) => {
    try {
      if (!req.params.profileId) {
        return responseHandler(res, response.badRequest());
      }

      const uploadOptions = {};
      let uploadResult = {};

      const uploadQuery = {
        userId: req.params.profileId,
        uploadType: { $in: [UPLOAD_TYPES.Resume.type] },
        isDeleted: false,
        isActive: true,
      };

      uploadResult = await getUserUploadsUsecase(
        { query: uploadQuery, options: uploadOptions },
        req,
        res
      );

      // CV Resume
      const cvUpload = getObjectFromArray(
        uploadResult?.data || [],
        ["uploadType"],
        UPLOAD_TYPES.Resume.type
      )?.toJSON();

      if (cvUpload) {
        uploadResult.data = cvUpload || null;
      }

      return responseHandler(res, uploadResult);
    } catch (error) {
      console.error(error);
      return responseHandler(
        res,
        response.internalServerError({ message: error.message })
      );
    }
  };

const getRecruiterDashboardDetails = (getRecruiterDashboardDetailsUsecase) => async (req, res) => {
  try {

    const userMId = req.user.id;

    const result = await getRecruiterDashboardDetailsUsecase(
      { query: { addedBy: userMId, isDeleted: false, isActive: true } },
      req,
      res
    );

    return responseHandler(res, result);
    
  } catch (error) {
    console.error(error);
    return responseHandler(
      res,
      response.internalServerError({ message: error.message })
    );
  }
};

module.exports = {
  addUser,
  bulkInsertUser,
  findAllUser,
  getUser,
  getUserCount,
  changePassword,
  updateProfile,
  getLoggedInUserInfo,
  deleteLoggedUser,
  getSeeker,
  getSeekerResume,
  getRecruiterDashboardDetails,
};
