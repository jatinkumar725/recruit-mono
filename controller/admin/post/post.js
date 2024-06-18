const response = require('../../../utils/response');
const responseHandler = require('../../../utils/response/responseHandler');
const getSelectObject = require('../../../utils/getSelectObject');

const findAllOrphanPost = (findAllPostUsecase, getUserUsecase) => async (req, res) => {
  try {
    const query = { isDeleted: true };
    const options = {};

    // Get all posts that were marked as isDeleted
    let result = await findAllPostUsecase({
      query,
      options,
      isCountOnly: req.body.isCountOnly || false
    }, req, res);

    // Filter orphan posts
    if (result.data) {
      result.data.data = await Promise.all(result.data.data.map(async (post) => {
        let user = await getUserUsecase({
          query: {
            _id: post.addedBy,
          },
        });
        
        if ( ! user.data ) {
          return post;
        }
      }));
    }

    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const deleteOrphanPost = (deletePostUsecase, deleteTermRelationshipUsecase) => async (req, res) => {
  try {

    if (!req.params.postId) {
      return responseHandler(res, response.badRequest({ message: 'Insufficient request parameters! postId is required.' }));
    }

    let query = { postId: req.params.postId };

    let result = await deletePostUsecase({
      query,
      isWarning: req.body.isWarning || false
    }, req, res);

    if ( result.data ) {
      
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

module.exports = {
  findAllOrphanPost,
  deleteOrphanPost,
};
