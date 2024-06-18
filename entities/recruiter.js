module.exports = (recruiter) => {

  let newRecruiter = { 
    username: recruiter.username,
    password: recruiter.password,
    email: recruiter.email,
    name: recruiter.name,
    company: recruiter.company,
    roleAtCompany: recruiter.roleAtCompany,
    companySize: recruiter.companySize,
    industry: recruiter.industry,
    isActive: recruiter.isActive,
    createdAt: recruiter.createdAt,
    updatedAt: recruiter.updatedAt,
    addedBy: recruiter.addedBy,
    updatedBy: recruiter.updatedBy,
    location: recruiter.location,
    userType: recruiter.userType,
    mobile: recruiter.mobile,
    isDeleted: recruiter.isDeleted,
    resetPasswordLink: recruiter.resetPasswordLink,
    loginRetryLimit: recruiter.loginRetryLimit,
    loginReactiveTime: recruiter.loginReactiveTime,
    isKYCDocsUploaded: recruiter.isKYCDocsUploaded,
    isProfileVerified: recruiter.isProfileVerified,
    // totalSavedCandidates: recruiter.totalSavedCandidates,
  };

  // remove undefined values
  Object.keys(newRecruiter).forEach(key => newRecruiter[key] === undefined && delete newRecruiter[key]);

  // To validate Entity uncomment this block
  /*
   * const validate = (newSeeker) => {
   *   if (!newSeeker.field) {
   *       throw new Error("this field is required");
   *   }
   * }
   * validate(newSeeker) 
   */

  return Object.freeze(newRecruiter);
};
