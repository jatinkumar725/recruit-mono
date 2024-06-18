/**
 * getSeekerDashboardDetails.js
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
const getSeekerDashboardDetails = ({
    seekerDb
}) => async (params, req, res) => {
    try {
        const { query } = params;

        const seeker = seekerDb.findOne(query);

        // const see

        return response.success({ data: dataToReturn });
    } catch (error) {
        console.error(error);
        return response.internalServerError({ message: error.message });
    }
};
module.exports = getSeekerDashboardDetails;