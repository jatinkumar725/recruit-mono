const response = require('../../../../utils/response');
const responseHandler = require('../../../../utils/response/responseHandler');
const getSelectObject = require('../../../../utils/getSelectObject');
const getObjectFromArray = require('../../../../utils/getObjectFromArray');
const { UPLOAD_TYPES } = require('../../../../constants/authConstant');

const applyToPost = (addApplyPostUsecase) => async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    dataToCreate.seekerId = req.user.id;
    let result = await addApplyPostUsecase(dataToCreate, req, res);
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const findAllAppliedPost = (findAllAppliedPostUsecase, getUserUploadsUsecase) => async (req, res) => {
  try {
    const defaultCountWhere = {
      seekerId: req.user.id,
    };

    const query = { ...req.body.query || defaultCountWhere };
    const options = {
      ...req.body.options, sort: {
        createdAt: -1
      }, 
      projection: 'postMId applicationDate applicationStatus', 
      populate: ['postMId']
    };

    if (req.body && req.body.query && req.body.query._id) {
      query.seekerId.$in = [req.body.query._id];
    }

    const result = await findAllAppliedPostUsecase({ query, options, isCountOnly: req.body.isCountOnly || false }, req, res);

    if (result.data && result.data.data) {
      const newAppliedPost = await Promise.all(result.data.data.map(async appliedPost => {
        const { postMId, applicationDate, applicationStatus, ...restAppliedPostData } = appliedPost;

        /**
         * Get company (recruiter) details
         */

        const { addedBy: recruiterDetails, ...postData } = await postMId.populate('addedBy');

        // Get company details
        const companyDetails = {
          name: recruiterDetails.company,
          details: recruiterDetails?.description || '',
          address: recruiterDetails.location,
        };

        // Get company logo
        const uploadOptions = {};
        let uploadResult = {};

        const uploadQuery = {
          userId: recruiterDetails.profileId,
          uploadType: { "$in": [UPLOAD_TYPES.Logo.type] },
          isDeleted: false,
          isActive: true
        };

        uploadResult = await getUserUploadsUsecase({ query: uploadQuery, options: uploadOptions }, req, res);

        const logoUpload = getObjectFromArray(uploadResult?.data || [], ['uploadType'], UPLOAD_TYPES.Logo.type)?.toJSON();

        // Attach details
        const post = {
          postId: postMId.postId,
          title: postMId.title,
          description: postMId.description,
          jobType: postMId.jobType,
          salaryDetails: postMId.salaryDetails,
          industry: postMId.industry,
          designation: postMId.designation,
          companyDetails: companyDetails,
          companyLogo: logoUpload || null,
          location: postMId.location,
          jdUrl: postMId.jdUrl,
        };

        return {
          applicationDate,
          applicationStatus,
          post
        };
      }));
      result.data.data = newAppliedPost;
    }

    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

module.exports = {
  applyToPost,
  findAllAppliedPost,
};
