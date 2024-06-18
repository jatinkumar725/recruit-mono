const response = require('../../../utils/response');
const responseHandler = require('../../../utils/response/responseHandler');
const getSelectObject = require('../../../utils/getSelectObject');
// const TermRelationship = require('../../../objects/relationship');
const getObjectFromArray = require('../../../utils/getObjectFromArray');
// const { UPLOAD_TYPES } = require('../../../constants/authConstant');
const filterObjectFromArray = require("../../../utils/filterObjectFromArray");
const { POST_QUERY_TYPE } = require('../../../constants/postConstant');
const { query } = require('express');

const getJobPosts = (getPostsUsecase, getUserUploadsUsecase, getAppliedPostUsecase) => async (req, res) => {
  try {

    let query = {};

    let options = {
      sort: {
        createdAt: -1
      },
      limit: 5,
    };

    // Is loggedIn
    const isSeekerLoggedIn = (req.user && req.user.userType === 1) ? true : false;

    let result = await getPostsUsecase({
      query,
      options
    }, req, res);

    // TODO: need to attach company logo, but need to discuss where upload ? 
    if (result.data) {
      const jobDetails = await Promise.all(result.data.map(async item => {
        item = item.projectFields(1);
        if (isSeekerLoggedIn) {
          const userObjectId = req.user.id;
          const appliedPost = await getAppliedPostUsecase({ query: { seekerId: userObjectId, postId: item.postId }, options: {} });
          if (appliedPost.data) {
            item.applyDate = appliedPost.data.applicationDate;
          }
        }

        return item;
      }));
      result.data = {
        loggedIn: isSeekerLoggedIn,
        jobDetails
      };
    }

    return responseHandler(res, result);
  } catch (error) {
    console.error(error.message)
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
}

const getJobPostDetails = (getPostUsecase, getUserUploadsUsecase, getAppliedPostUsecase) => async (req, res) => {
  try {
    if (!req.query.skewid) {
      return responseHandler(res, response.badRequest());
    }

    // Is loggedIn
    const loggedIn = req.user ? true : false;
    
    let query = {
      postId: req.query.skewid
    };

    let options = {};
    let result = await getPostUsecase({
      query,
      options
    }, req, res);

    const jsonResultData = result.data.projectFields(2);

    const shadowCopyResult = {
      ...result,
      data: {
        loggedIn,
        jobDetails: jsonResultData
      }
    };

    // TODO: need to attach company logo, but need to discuss where upload ? 

    // const filteredObjectData = filterObjectFromArray(shadowCopyResult.data, POST_QUERY_TYPE[2]);

    // // Get additioanl details
    // if (filteredObjectData) {

    //   /**
    //    * Get company (recruiter) details
    //    */
    //   // const { addedBy: recruiterDetails, ...restResultData } = filteredObjectData;
    //   const { company, companyDescription } = filteredObjectData;

    //   // Get company details
    //   const companyDetails = {
    //     name: company,
    //     details: companyDescription || '',
    //   };

    //   // Get company logo
    //   // const uploadOptions = {};
    //   // let uploadResult = {};

    //   // const uploadQuery = {
    //   //   userId: recruiterDetails.profileId,
    //   //   uploadType: { "$in": [UPLOAD_TYPES.Logo.type] },
    //   //   isDeleted: false,
    //   //   isActive: true
    //   // };

    //   // uploadResult = await getUserUploadsUsecase({ query: uploadQuery, options: uploadOptions }, req, res);

    //   // const logoUpload = getObjectFromArray(uploadResult?.data || [], ['uploadType'], UPLOAD_TYPES.Logo.type)?.toJSON();

    //   // Attach company logo & details to result
    //   // shadowCopyResult.data.companyLogo = logoUpload || null;
    //   filteredObjectData.companyDetails = companyDetails;

    //   // Attach staticURL of post
    //   // const staticURL = `${req.protocol}://${req.get("host")}/api/v1/post/${req.query.skewid}`;
    //   // filteredObjectData.staticURL = staticURL;

    //   // Delete addedBy
    //   // delete shadowCopyResult.data.addedBy;
    //   delete filteredObjectData.company;
    //   delete filteredObjectData.companyDescription;

    // }
    
    /**
     * Get apply date for user who logged-in and already applied to post
     */
    // Check if user is logged-in ( by retrieving user object from request body )
    if (req.user) {
      const userObjectId = req.user.id;
      const appliedPost = await getAppliedPostUsecase({ query: { seekerId: userObjectId, postId: req.query.skewid }, options });
      if (appliedPost.data) {
        shadowCopyResult.data.jobDetails.applyDate = appliedPost.data.applicationDate;
      }
    }

    shadowCopyResult.data.loggedIn = loggedIn;

    return responseHandler(res, shadowCopyResult);
  } catch (error) {
    console.error(error.message)
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
}

const updateJobPostViews = (updateJobPostViewsUsecase) => async (req, res) => {
  try {

    if (!req.body.postId) {
      return responseHandler(res, response.badRequest());
    }

    const options = {};

    const result = await updateJobPostViewsUsecase({
      query: {
        postId: req.body.postId
      },
      dataToUpdate: { $inc: { views: 1 } },
      options
    }, req, res);

    if (result.data) {
      result.data = result.data.projectFields(3);
    }

    return responseHandler(res, result);

  } catch (error) {
    console.error('error', error)
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const QueryAndfilterJobPosts = (QueryAndfilterJobPostsUsecase) => async (req, res) => {
  try {

    const {
      perPage,
      currentPage = 1,
      keyword,
      experience,
      location
    } = req.query;

    if (!keyword) {
      return responseHandler(res, response.badRequest());
    } 

    const defaultOptions = {
      limit: 20,
      currentPage: 1,
    };

    const results = await QueryAndfilterJobPostsUsecase({
      params: {
        keyword
      },
      options: {
        limit: perPage,
        currentPage: currentPage,
        ...defaultOptions
      }
    }, req, res);
    
    return responseHandler(res, results);
    
  } catch (error) {
    console.error('error', error)
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

module.exports = {
  getJobPosts,
  getJobPostDetails,
  updateJobPostViews,
  QueryAndfilterJobPosts
};
