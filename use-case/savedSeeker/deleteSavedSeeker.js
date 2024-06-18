
/**
 * deleteSavedSeeker.js
 */
const response = require('../../utils/response');

/**
 * @description : delete record from database.
 * @param {Object} params : request body including query.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : deleted Term. {status, message, data}
 */
const deleteSavedSeeker = ({ savedSeekerDb, recruiterDb, filterValidation }) => async (params, req, res) => {
    try {
        const { query } = params; // Destructure 'query' from 'params'

        const deletedSavedSeekerCnts = await savedSeekerDb.deleteMany(query);

        if (deletedSavedSeekerCnts > 0) { 
            // Check if any documents were deleted
            // Update recruiter's totalSavedCandidates by decrementing deleted count
            
            // const updatedRecruiter = await recruiterDb.updateOne({ id: query.recruiterId }, { $inc: { totalSavedCandidates: -deletedSavedSeekerCnts } });
            // const responseData = {
            //     profile: updatedRecruiter
            // };
            // return response.success({ data: responseData });

            return response.success();
        }

        return response.internalServerError({ message: 'Unable to process your request.' });

    } catch (error) {
        console.error('Error deleting saved seeker:', error);
        return response.internalServerError(res, { message: error.message }); // Return internal server error response
    }
};

module.exports = deleteSavedSeeker;