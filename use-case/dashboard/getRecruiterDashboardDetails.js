/**
 * getRecruiterDashboardDetails.js
 */

const { APPLICATION_STATUS } = require('../../constants/postConstant');
const { convertSingleToDoubleDigitNumber } = require('../../utils/number');
const response = require('../../utils/response');
/**
 * @description : dashboard details for recruiter.
 * @param {Object} params : query to find dashboard details.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : response of create. {status, message, data}
 */
const getRecruiterDashboardDetails = ({
    postDb, savedSeekerDb, appliedPostDb
}) => async (params, req, res) => {
    try {
        const { query } = params;

        const dataToReturn = {
            totalJobPosts: 0,
            totalSavedSeekers: 0,
            totalShortlistedApplications: 0,
        };

        // Return total job post, total saved seeker, total applications are shortlisted
        const jobPosts = await postDb.findMany(query);

        console.log('jobPosts', jobPosts)

        if (jobPosts) {
            const jobPostsId = jobPosts.map(post => post.postId);
            const jobPostCnt = jobPosts.length;
            dataToReturn.totalJobPosts = convertSingleToDoubleDigitNumber(jobPostCnt);

            // Calculate total shortlisted applications
            const applicationQuery = { postId: { $in: jobPostsId }, applicationStatus: APPLICATION_STATUS.Shortlist, isDeleted: false };
            const shortlistedApplicationCnt = await appliedPostDb.count(applicationQuery);
            dataToReturn.totalShortlistedApplications = convertSingleToDoubleDigitNumber(shortlistedApplicationCnt);
        }

        // Calculate saved seekers ( candidates )
        const savedSeekerQuery = { recruiterId: query.id, isDeleted: false };
        const savedSeekerCnt = await savedSeekerDb.count(savedSeekerQuery);
        dataToReturn.totalSavedSeekers = convertSingleToDoubleDigitNumber(savedSeekerCnt);

        return response.success({ data: dataToReturn });
    } catch (error) {
        console.error(error);
        return response.internalServerError({ message: error.message });
    }
};
module.exports = getRecruiterDashboardDetails;