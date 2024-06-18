const response = require('../../../../utils/response');
const responseHandler = require('../../../../utils/response/responseHandler');
const getSelectObject = require('../../../../utils/getSelectObject');
const TermRelationship = require('../../../../objects/relationship');
const mergeObjects = require('../../../../utils/mergeObjects');
const filterObjectFromArray = require('../../../../utils/filterObjectFromArray');
const getObjectFromArray = require('../../../../utils/getObjectFromArray');
const { UPLOAD_TYPES, USER_QUERY_TYPES, USER_TYPES } = require('../../../../constants/authConstant');
const convertObjectValueToArray = require('../../../../utils/convertObjectValueToArray');
const { POST_QUERY_TYPE } = require('../../../../constants/postConstant');
const { EDUCATION_TYPES } = require('../../../../constants/termConstant');

const addPost = (addPostUsecase, updateTermRelationshipUsecase) => async (req, res) => {
  try {

    // Delete vulnerable fields
    delete req.body.postId;

    let dataToCreate = { ...req.body || {} };
    dataToCreate.addedBy = req.user.id;

    let result = await addPostUsecase(dataToCreate);

    // Create an instance of TermRelationship
    const termRelationship = new TermRelationship();
    const { termData: reqTermData, restData: reqRestData } = termRelationship.separateTerms(dataToCreate);
    const { termData: resultTermData, restData: resultRestData } = termRelationship.separateTerms(result.data);

    const mergedTermData = mergeObjects(reqTermData, resultTermData);

    // Re-build education details in post
    if (mergedTermData?.education) {

      if (mergedTermData?.education?.reqUg) {
        mergedTermData.education = [{
          specialisation: []
        }];
      } else {
        const educationLevels = Object.keys(EDUCATION_TYPES);

        const specialisationArray = convertObjectValueToArray(mergedTermData.education, 'specialisation', educationLevels);

        mergedTermData.education = [{
          specialisation: specialisationArray
        }];
      }

    }

    if (Object.keys(mergedTermData).length) {

      const res1 = await updateTermRelationshipUsecase({
        objectId: result.data.postId,
        model_type: 'Post',
        termsData: mergedTermData
      });

    }

    // Set response data for client to level 1 // ? ( If need to send some fields only to client then create a filter constant for post as well )
    // const filteredUserData = filterObjectFromArray(resultRestData, USER_QUERY_TYPE[1]);
    // result.data = filteredUserData;

    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const bulkInsertPost = (bulkInsertPostUsecase) => async (req, res) => {
  try {
    let dataToCreate = [...req.body.data];
    for (let i = 0; i < dataToCreate.length; i++) {
      dataToCreate[i] = {
        ...dataToCreate[i],
        addedBy: req.user.id,
      };
    }
    let result = await bulkInsertPostUsecase(dataToCreate, req, res);
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

// Kind of search post
const findAllPost = (findAllPostUsecase) => async (req, res) => {
  try {
    const defaultCountWhere = {
      addedBy: req.user.id,
    };

    let query = { ...req.body.query || defaultCountWhere };
    let defaultOptions = {
      sort: {
        createdAt: -1
      },
      // projection: POST_QUERY_TYPE[1].join(' ')
    };
    let options = { 
      ...req.body.options, 
      ...defaultOptions 
    } || defaultOptions;

    if (req.body && req.body.query && req.body.query.id) {
      query.addedBy.$in = [req.body.query.id];
    }

    let result = await findAllPostUsecase({
      query,
      options,
      isCountOnly: req.body.isCountOnly || false
    }, req, res);

    if (result.data.data) {
      result.data.data = result.data.data.map(item => item.projectFields(1));
    }

    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const getUserPost = (getPostUsecase) => async (req, res) => {
  try {
    if (!req.params.postId) {
      return responseHandler(res, response.badRequest());
    }
    let query = {
      postId: req.params.postId,
      addedBy: req.user.id,
    };
    let options = {};
    let result = await getPostUsecase({
      query,
      options
    }, req, res);
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const getPostCount = (getUserPostCountUsecase) => async (req, res) => {
  try {
    let where = { ...req.body.where || {} };
    let result = await getUserPostCountUsecase({ where }, req, res);
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const updatePost = (updatePostUsecase, updateTermRelationshipUsecase, getPostUsecase) => async (req, res) => {
  try {

    if (!req.params.postId) {
      return responseHandler(res, response.badRequest({ message: 'Insufficient request parameters! postId is required.' }));
    }

    // Delete vulnerable fields
    delete req.body.postId;
    delete req.body.addedBy;

    let dataToUpdate = { ...req.body || {} };
    dataToUpdate.updatedBy = req.user.id;

    let query = {
      postId: req.params.postId,
      addedBy: {
        $in: [req.user.id]
      }
    };

    let result = await updatePostUsecase({
      query,
      dataToUpdate,
    }, req, res);

    // Create an instance of TermRelationship
    const termRelationship = new TermRelationship();
    const { termData: reqTermData, restData: reqRestData } = termRelationship.separateTerms(dataToUpdate);
    const { termData: resultTermData, restData: resultRestData } = termRelationship.separateTerms(result.data);

    const mergedTermData = mergeObjects(reqTermData, resultTermData);

    // Re-build education details in post
    if (mergedTermData?.education) {

      if (mergedTermData?.education?.reqUg) {
        mergedTermData.education = [{
          specialisation: []
        }];
      } else {
        const educationLevels = Object.keys(EDUCATION_TYPES);

        const specialisationArray = convertObjectValueToArray(mergedTermData.education, 'specialisation', educationLevels);

        mergedTermData.education = [{
          specialisation: specialisationArray
        }];
      }

    }

    if (Object.keys(mergedTermData).length) {

      const res1 = await updateTermRelationshipUsecase({
        objectId: result.data.postId,
        model_type: 'Post',
        termsData: mergedTermData
      });

    }

    // Set response data for client to level 1 // ? ( If need to send some fields only to client then create a filter constant for post as well )
    // const filteredUserData = filterObjectFromArray(resultRestData, USER_QUERY_TYPE[1]);
    // result.data = filteredUserData;

    return responseHandler(res, result);
  } catch (error) {
    console.log(error)
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const bulkUpdatePost = (bulkUpdatePostUsecase) => async (req, res) => {
  try {
    let dataToUpdate = { ...req.body.data || {} };
    let query = { ...req.body.filter || {} };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    query.addedBy.$in = req.user.id;

    // Handle filter post
    if (req.body.filter && req.body.filter.postId) {
      query.postId.$in = [req.body.filter.postId];
    }
    let result = await bulkUpdatePostUsecase({
      dataToUpdate,
      query
    }, req, res);
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const partialUpdatePost = (partialUpdatePostUsecase, updateTermRelationshipUsecase) => async (req, res) => {
  try {

    if (!req.params.postId) {
      return responseHandler(res, response.badRequest({ message: 'Insufficient request parameters! postId is required.' }));
    }

    // Delete vulnerable fields
    delete req.body.postId;
    delete req.body.addedBy;

    let dataToUpdate = { ...req.body || {} };
    dataToUpdate.updatedBy = req.user.id;

    let query = {
      postId: req.params.postId,
      addedBy: {
        $in: [req.user.id]
      }
    };

    // Create an instance of TermRelationship
    const termRelationship = new TermRelationship();
    const { termData, restData } = termRelationship.separateTerms(dataToUpdate);

    let result = await partialUpdatePostUsecase({
      query,
      dataToUpdate: restData
    }, req, res);

    // Flatten Data
    const flattenTermData = termData.flat();

    if (flattenTermData.length) {

      await updateTermRelationshipUsecase({
        objectId: req.params.postId,
        model_type: 'Post',
        termsData: flattenTermData
      });

    }

    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const deleteLoggedUserPost = (deletePostUsecase, deleteTermRelationshipUsecase) => async (req, res) => {
  try {

    if (!req.params.postId) {
      return responseHandler(res, response.badRequest({ message: 'Insufficient request parameters! postId is required.' }));
    }

    let query = {
      postId: req.params.postId,
      addedBy: req.user.id,
    };

    let result = await deletePostUsecase({
      query,
      isWarning: req.body.isWarning || false
    }, req, res);

    if (result.data) {

      await deleteTermRelationshipUsecase({
        query: {
          objectId: req.params.postId,
          model_type: 'Post'
        }
      });

    }

    return responseHandler(res, result);
  } catch (error) {
    console.log(error);
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const deletePostEntity = (partialUpdatePostUsecase, deletePostEntityUsecase) => async (req, res) => {
  try {

    if (!req.params.postId) {
      return responseHandler(res, response.badRequest({ message: 'Insufficient request parameters! postId is required.' }));
    }

    // Delete vulnerable fields
    delete req.body.postId;
    delete req.body.addedBy;

    let dataToUpdate = { ...req.body || {} };
    dataToUpdate.updatedBy = req.user.id;

    let query = {
      postId: req.params.postId,
      addedBy: {
        $in: [req.user.id]
      }
    };

    // Create an instance of TermRelationship
    const termRelationship = new TermRelationship();
    const { termData, restData } = termRelationship.separateTerms(dataToUpdate);

    let result = await partialUpdatePostUsecase({
      query,
      dataToUpdate: restData
    }, req, res);

    await deletePostEntityUsecase({
      query: {
        $and: [
          { objectId: req.params.postId },
          { objectGroup: req.params.entityId }
        ]
      }
    });

    return responseHandler(res, result);

  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const getApplicationsOfJobPost = (getApplicationsOfJobPostUseCase, getUserUploadsUsecase) => async (req, res) => {
  try {

    if (!req.body.postId) {
      return responseHandler(res, response.badRequest({ message: 'Insufficient request parameters! postId is required.' }));
    }

    let query = {
      ...req.body.filter || {},
      postId: req.body.postId,
    };

    const options = {
      limit: 50,
      sort: {
        createdAt: -1
      },
    };

    const result = await getApplicationsOfJobPostUseCase({ query, options, isCountOnly: req.body.isCountOnly || false }, req, res);

    if (result.data) {

      const totalCount = result.data.totalCount;
      let unreadCount = 0;

      const newAppliedPost = await Promise.all(result.data.applications.map(async appliedPost => {

        /**
         * Get seeker details
         */
        const { seekerId: seekerDetails, applicationId, applicationDate, applicationStatus, unread, ...restAppliedPostData } = await appliedPost.populate('seekerId');

        // const jsonSeekerProfile = seekerDetails.toJSON();

        // const projection = USER_QUERY_TYPES[USER_TYPES.Seeker][3];

        // seeker details object
        const seeker = seekerDetails.projectFields(3);

        const uploadOptions = {};
        let uploadResult = {};

        const uploadQuery = {
          userId: seeker.profileId,
          uploadType: { "$in": [UPLOAD_TYPES.Profile.type, UPLOAD_TYPES.Resume.type] },
          isDeleted: false,
          isActive: true
        };

        uploadResult = await getUserUploadsUsecase({ query: uploadQuery, options: uploadOptions }, req, res);

        // Profile picture
        const profileUpload = getObjectFromArray(uploadResult?.data || [], ['uploadType'], UPLOAD_TYPES.Profile.type)?.toJSON();
        seeker.profilePhoto = profileUpload || null;

        // CV Resume
        const cvUpload = getObjectFromArray(uploadResult?.data || [], ['uploadType'], UPLOAD_TYPES.Resume.type)?.toJSON();
        seeker.cvInfo = cvUpload || null;

        // Increment unread count
        if (unread) {
          unreadCount += 1;
        }

        return {
          applicationId,
          applicationDate,
          applicationStatus,
          unread,
          seeker
        };
      }));

      result.data = {
        applications: newAppliedPost,
        unreadCount,
        totalCount
      };

    }

    return responseHandler(res, result);
  } catch (error) {
    console.error(error);
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const getApplicationAttachments = (getAppliedPostUseCase, getUserUploadsUsecase) => async (req, res) => {
  try {

    // Till only returning only resume as attachment
    if (!req.params.applicationId) {
      return responseHandler(res, response.badRequest({ message: 'Insufficient request parameters! applicationId is required.' }));
    }

    let query = {
      applicationId: req.params.applicationId,
    };

    const options = {}

    const result = await getAppliedPostUseCase({ query, options }, req, res);

    const { seekerId: seekerDetails, ...restData } = await result.data.populate('seekerId');

    if (result.data) {

      const uploadOptions = {};
      let uploadResult = {};

      const uploadQuery = {
        userId: seekerDetails.profileId,
        uploadType: { "$in": [UPLOAD_TYPES.Resume.type] },
        isDeleted: false,
        isActive: true
      };

      uploadResult = await getUserUploadsUsecase({ query: uploadQuery, options: uploadOptions }, req, res);

      // CV Resume
      const cvUpload = getObjectFromArray(uploadResult?.data || [], ['uploadType'], UPLOAD_TYPES.Resume.type)?.toJSON();

      if (cvUpload) {
        result.data = {
          attachments: [cvUpload]
        };
      }

    }

    return responseHandler(res, result);
  } catch (error) {
    console.error(error);
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const markReadToApplicationOfJobPost = (partialUpdateAppliedPostUseCase) => async (req, res) => {
  try {
    if (!req.params.applicationId) {
      return responseHandler(res, response.badRequest({ message: 'Insufficient request parameters! applicationId is required.' }));
    }

    let query = {
      applicationId: req.params.applicationId,
    };

    const dataToUpdate = {
      unread: false
    };

    const result = await partialUpdateAppliedPostUseCase({ query, dataToUpdate }, req, res);

    return responseHandler(res, result);
  } catch (error) {
    console.error(error);
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const markShortlistRejectApplicationOfJobPost = (partialUpdateAppliedPostUseCase, sendApplicationStatusByEmail) => async (req, res) => {
  try {
    if (!req.params.applicationId || !req.body.status) {
      return responseHandler(res, response.badRequest({ message: 'Insufficient request parameters!' }));
    }

    let query = {
      applicationId: req.params.applicationId,
    };

    const dataToUpdate = {
      applicationStatus: req.body.status,
    };

    const result = await partialUpdateAppliedPostUseCase({ query, dataToUpdate }, req, res);

    if (result.data) {

      const { seekerId: seekerDetails, postMId: postDetails, ...restData } = await result.data.populate('seekerId postMId');
      const params = {
        email: seekerDetails.email,
        designation: postDetails.designation,
        company: postDetails.company,
      };

      await sendApplicationStatusByEmail(params);

    }


    return responseHandler(res, result);
  } catch (error) {
    console.error(error);
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

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
