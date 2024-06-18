module.exports = (post) => {

  let newPost = {
    postId: post.postId,
    title: post.title,
    description: post.description,
    shortDescription: post.shortDescription,
    employmentType: post.employmentType,
    jobType: post.jobType,
    salaryDetails: post.salaryDetails,
    minimumExperience: post.minimumExperience,
    maximumExperience: post.maximumExperience,
    views: post.views,
    totalOpening: post.totalOpening,
    location: post.location,
    industry: post.industry,
    designation: post.designation,
    skills: post.skills,
    addedBy: post.addedBy,
    updatedBy: post.updatedBy,
    totalApplicants: post.totalApplicants,
    company: post.company,
    companyDescription: post.companyDescription,
    isActive: post.isActive,
    isDeleted: post.isDeleted,
    postDate: post.postDate,
    expireAfter: post.expireAfter,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    education: post.education
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