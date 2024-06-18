module.exports = (seeker) => {

  let newSeeker = { 
    username: seeker.username,
    headline: seeker.headline,
    overview: seeker.overview,
    currentSalary: seeker.currentSalary,
    noticePeriod: seeker.noticePeriod,
    experience: seeker.experience,
    birthDate: seeker.birthDate,
    gender: seeker.gender,
    maritalStatus: seeker.maritalStatus,
    religion: seeker.religion,
    onlineProfiles: seeker.onlineProfiles,
    projects: seeker.projects,
    password: seeker.password,
    location: seeker.location,
    education: seeker.education,
    employment: seeker.employment,
    skills: seeker.skills,
    email: seeker.email,
    name: seeker.name,
    isActive: seeker.isActive,
    createdAt: seeker.createdAt,
    updatedAt: seeker.updatedAt,
    addedBy: seeker.addedBy,
    updatedBy: seeker.updatedBy,
    permanentAddress: seeker.permanentAddress,
    userType: seeker.userType,
    mobile: seeker.mobile,
    industry: seeker.industry,
    designation: seeker.designation,
    prefLocation: seeker.prefLocation,
    prefJobType: seeker.prefJobType,
    prefEmploymentType: seeker.prefEmploymentType,
    expectedCtc: seeker.expectedCtc,
    isDeleted: seeker.isDeleted,
    resetPasswordLink: seeker.resetPasswordLink,
    loginRetryLimit: seeker.loginRetryLimit,
    loginReactiveTime: seeker.loginReactiveTime,
    ssoAuth: seeker.ssoAuth,
  };

  // remove undefined values
  Object.keys(newSeeker).forEach(key => newSeeker[key] === undefined && delete newSeeker[key]);

  // To validate Entity uncomment this block
  /*
   * const validate = (newSeeker) => {
   *   if (!newSeeker.field) {
   *       throw new Error("this field is required");
   *   }
   * }
   * validate(newSeeker) 
   */

  return Object.freeze(newSeeker);
};
