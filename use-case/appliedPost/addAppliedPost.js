/**
 *addAppliedPost.js
 */

const appliedPostEntity = require('../../entities/appliedPost');
const response = require('../../utils/response');
/**
 * @description : create new record of post in database.
 * @param {Object} dataToCreate : data for create new document.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : response of create. {status, message, data}
 */
const addAppliedPost = ({
  appliedPostDb, postDb, createValidation
}) => async (dataToCreate, req, res) => {

  const postExists = await postDb.findOne({ postId: dataToCreate.postId });
  if (!postExists) {
    return response.badRequest({ message: 'Invalid postId' });
  }

  const postJSON = postExists.toVObject();

  // Attaching post object id to applied post so while fetching applied post its easier to retrieve attached post
  dataToCreate = {
    ...dataToCreate,
    postMId: postJSON.id,
  };

  const appliedPostExists = await appliedPostDb.findOne({
    $and: [{ postId: dataToCreate.postId }, { seekerId: dataToCreate.seekerId }],
  });

  if (appliedPostExists) {
    return response.badRequest({ message: 'Already applied for this post' });
  }

  const validateRequest = await createValidation(dataToCreate);
  if (!validateRequest.isValid) {
    return response.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
  }

  let appliedPost = appliedPostEntity(dataToCreate);
  appliedPost = await appliedPostDb.create(appliedPost);

  if (appliedPost) {
    await postDb.updateOne({ postId: dataToCreate.postId }, { $inc: { totalApplicants: 1 } });
  }

  return response.success({ data: appliedPost });
};
module.exports = addAppliedPost;