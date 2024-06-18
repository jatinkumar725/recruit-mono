module.exports = (savedSeeker) => {

    let newPost = {
      seekerId: savedSeeker.seekerId,
      recruiterId: savedSeeker.recruiterId,
      sId: savedSeeker.sId,
      savedDate: savedSeeker.savedDate,
      isActive: savedSeeker.isActive,
      isDeleted: savedSeeker.isDeleted,
      createdAt: savedSeeker.createdAt,
      updatedAt: savedSeeker.updatedAt,
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