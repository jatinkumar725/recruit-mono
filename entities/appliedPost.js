module.exports = (appliedPost) => {

  let newPost = {
    seekerId: appliedPost.seekerId,
    postId: appliedPost.postId,
    postMId: appliedPost.postMId,
    applicationDate: appliedPost.applicationDate,
    applicationStatus: appliedPost.applicationStatus,
    unread: appliedPost.unread,
    isActive: appliedPost.isActive,
    isDeleted: appliedPost.isDeleted,
    createdAt: appliedPost.createdAt,
    updatedAt: appliedPost.updatedAt,
  };

  // remove undefined values
  Object.keys(newPost).forEach(key => newPost[key] === undefined && delete newPost[key]);

  // To validate Entity uncomment this block
  /*
   * const validate = (newPost) => {
   *   if (!newPost.field) {
   *       throw new Error("this field is required");
   *   }
   * }
   * validate(newPost) 
   */

  return Object.freeze(newPost);
};