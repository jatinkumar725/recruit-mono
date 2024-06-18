/**
 *addSavedSeeker.js
 */

const savedSeekerEntity = require('../../entities/savedSeeker');
const response = require('../../utils/response');
/**
 * @description : create new record of post in database.
 * @param {Object} dataToCreate : data for create new document.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : response of create. {status, message, data}
 */
const addSavedSeeker = ({
  savedSeekerDb, recruiterDb, createValidation
}) => async (dataToCreate, req, res) => {

  const validateRequest = await createValidation(dataToCreate);
  if (!validateRequest.isValid) {
    return response.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
  }

  // Check if seeker is already saved
  const isSaved = await savedSeekerDb.findOne({
    seekerId: dataToCreate.seekerId,
    recruiterId: dataToCreate.recruiterId
  });

  if (isSaved) {
    return response.validationError({ message: 'Seeker is already saved.' });
  }

  let savedSeeker = savedSeekerEntity(dataToCreate);
  savedSeeker = await savedSeekerDb.create(savedSeeker);

  if (savedSeeker) {
    // const updatedRecruiter = await recruiterDb.updateOne({ id: savedSeeker.recruiterId }, { $inc: { totalSavedCandidates: 1 } });
    return response.success({
      data: {
        savedSeeker,
        // profile: updatedRecruiter
      }
    });
  }

  return response.internalServerError({ message: 'Unable to save seeker.' });

};
module.exports = addSavedSeeker;