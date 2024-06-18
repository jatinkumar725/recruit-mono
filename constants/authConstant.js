/**
 * authConstant.js
 * @description :: constants used in authentication
 */

const USER_TYPES = {
  Seeker: 1,
  Recruiter: 2,
  System_User: 3,
};

const JWT_TYPES = {
  Access: 1,
  Refresh: 2,
  General: 3,
};

const JWT = {
  [JWT_TYPES.Access]: {
    [USER_TYPES.Seeker]: 'c617cf180b5a08329b1e4a97f02c054d98d2b879566cc5e349ac7127224a701831dc66642f7d33de2399366552fe1cc35521acb4d1dcd552913e08b95083c86e',
    [USER_TYPES.Recruiter]: 'a5b75de1d6ca15fa524048141eb7287ed4dd992a64f0dcfadd50458e0860bcf905165269b117c5f46539452e686798fbf57b0526f055787e7c245bfa449c599e',
    [USER_TYPES.System_User]: 'ec5383b11bdc9a9ad6baec4cae972e760241d506de27be0e05195ca126c80a75deebd8a25351c771b10dc98b56ee74c868f6af507495bfc36f4d6787fff77368',
    EXPIRES_IN: 60 * 60 // seconds ( 1 hour ) 
  },
  [JWT_TYPES.Refresh]: {
    [USER_TYPES.Seeker]: 'c617cf180b5a08329b1e4a97f02c054d98d2b879566cc5e349ac7127224a701831dc66642f7d33de2399366552fe1cc35521acb4d1dcd552913e08b95083c86e', // 880cdc79c1b846ad710dfa125a30761d67751f0e5c77d1f6db5e96a450fd6c4779ea9cbeb33ffef3d9e8ba3617b4f3812ff7f945eb1eb941126ab33f07c1adba
    [USER_TYPES.Recruiter]: 'a5b75de1d6ca15fa524048141eb7287ed4dd992a64f0dcfadd50458e0860bcf905165269b117c5f46539452e686798fbf57b0526f055787e7c245bfa449c599e', //  5bff66774fc92aea1da60e04f6d227c0d0768bb3d149c7d03ba1a174ce9e02ac6f874ed29d103646cd3965d243b8352004534f19ddf2e00c3cd8f4766c05886c
    [USER_TYPES.System_User]: 'ae96245887386e614c030d80750f86c0dc98ae87fbd527d944198ff1d8bc53eb511f2f80caa193e1dfa731ccdfa4127f91666e0aa49850fa40fb7c0c9375e8a8',
    EXPIRES_IN: 365 * 24 * 60 * 60, // seconds ( 365 days | 1 Year )
  },
  [JWT_TYPES.General]: {
    CODE: '33a6dabc9d0bd4b3d93523547cf71083c45555eb2ec2536c85744842e66b44e9c1b0d944a9eee502e5320c5d8901a865',
    EXPIRES_IN: 15 * 60 // seconds ( 15 mins )
  }
};

const SITE_COOKIES = {
  rp_at: { 
    httpOnly: false, 
    sameSite: 'lax',
    maxAge: 1000 * JWT[JWT_TYPES.Access].EXPIRES_IN // millisecond ( 28 Days )
  },
  rp_rt: { 
    httpOnly: true, 
    // secure: true,
    sameSite: 'lax',
    maxAge: 1000 * JWT[JWT_TYPES.Refresh].EXPIRES_IN // millisecond ( 28 Days )
  },
  rpc_at: { 
    httpOnly: false, 
    sameSite: 'lax',
    maxAge: 1000 * JWT[JWT_TYPES.Access].EXPIRES_IN // millisecond ( 1 hour )
  },
  rpc_rt: { 
    httpOnly: true, 
    // secure: true,
    sameSite: 'lax',
    maxAge: 1000 * 24 * 60 * 60 // millisecond ( 1 Day )
  }
};

const PLATFORM = {
  SEEKER_CLIENT: 1,
  RECRUITER_CLIENT: 2,
  SYSTEM_USER: 3,
};

// (key: [ platform1, platform2, ... ]) as a user can have access to more than one platform.
const LOGIN_ACCESS = {
  [USER_TYPES.Seeker]: [PLATFORM.SEEKER_CLIENT],
  [USER_TYPES.Recruiter]: [PLATFORM.RECRUITER_CLIENT],
  [USER_TYPES.System_User]: [PLATFORM.SYSTEM_USER],
};

const AUTH_STRATEGY_TYPE = {
  [PLATFORM.SEEKER_CLIENT]: 'client-seeker-rule',
  [PLATFORM.RECRUITER_CLIENT]: 'client-recruiter-rule',
  [PLATFORM.SYSTEM_USER]: 'system-user-rule',
};

// key: model_type
const MODEL_TYPE = {
  [USER_TYPES.Seeker]: 'Seeker',
  [USER_TYPES.Recruiter]: 'Recruiter',
  [USER_TYPES.System_User]: 'System_User',
};

// key: Secret
const JWT_SECRET_TYPE = {
  [USER_TYPES.Seeker]: JWT.SEEKER_SECRET,
  [USER_TYPES.Recruiter]: JWT.RECRUITER_SECRET,
  [USER_TYPES.System_User]: JWT.SYSTEM_USER_SECRET,
};

const MAX_LOGIN_RETRY_LIMIT = 10;
const LOGIN_REACTIVE_TIME = 2;

const FORGOT_PASSWORD_WITH = {
  LINK: {
    email: true,
    sms: false
  },
  EXPIRE_TIME: 20 // mins
};

const ACCOUNT_VERIFICATION = {
  [USER_TYPES.Seeker]: {
    email: true,
    mobile: false,
    redirect: '/mnjseeker/profile',
  },
  [USER_TYPES.Recruiter]: {
    email: true,
    mobile: false,
    redirect: '/recruit/dashboard/profile',
  },
  EXPIRE_TIME: 30 // mins
};

const UPLOAD_TYPES = {
  Profile: {
    type: 1,
    dir: 'profile',
    multiples: false,
    deletePrevious: true,
  },
  Resume: {
    type: 2,
    dir: 'resume',
    multiples: false,
    deletePrevious: true,
  },
  Logo: {
    type: 3,
    dir: 'logo',
    multiples: false,
    deletePrevious: true,
  },
  Doc: {
    type: 4,
    dir: 'doc',
    multiples: true,
    maxUploads: 4,
    deletePrevious: false,
  },
};

const ALLOWED_FILETYPES = {
  [USER_TYPES.Seeker]: {
    [UPLOAD_TYPES.Profile.type]: [
      'png',
      'jpeg',
      'jpg',
      'gif',

    ],
    [UPLOAD_TYPES.Resume.type]: [
      'pdf',
      'doc',
      'docx',
      'rtf',
    ],
  },
  [USER_TYPES.Recruiter]: {
    [UPLOAD_TYPES.Logo.type]: [
      'png',
      'jpeg',
      'jpg',
      'gif',
    ],
    [UPLOAD_TYPES.Doc.type]: [
      'pdf',
      'jpeg',
      'jpg',
    ],
  },
};

// USER ID
const USER_ID_LENGTH = 6;

const USER_QUERY_LEVEL = {
  level1: 1,
  level2: 2,
  level3: 3,
  level4: 4,
};

const USER_QUERY_TYPES = {
  [USER_TYPES.Seeker]: {
    [USER_QUERY_LEVEL.level1]: [
      'userId',
      'userType',
      'profileId',
      'email',
      'mobile',
      'username',
      'name',
      'isPrimaryEmailVerified',
      'isPrimaryMobileNoVerified',
    ],
    [USER_QUERY_LEVEL.level2]: [
      'userId',
      'profileId',
      'email',
      'mobile',
      'username',
      'name',
      'gender',
      'industry',
      'profilePhoto',
      'cvInfo',
      'updatedAt',
      'education',
      'employment',
      'location',
      'skills',
      'projects',
      'headline',
      'overview',
      'onlineProfiles',
      'noticePeriod',
      'birthDate',
      'currentSalary',
      'experience',
      'gender',
      'maritalStatus', 
      'religion',
      'designation',
      'prefJobType',
      'prefEmploymentType',
      'prefLocation',
      'expectedCtc',
      'lastModDate',
      'lastModAgo'
    ],
    [USER_QUERY_LEVEL.level3]: [
      'userId',
      'userType',
      'profileId',
      'email',
      'mobile',
      'username',
      'name',
      'bio',
      'overview',
      'isPrimaryEmailVerified',
      'isPrimaryMobileNoVerified',
      'currentSalary',
      'designation',
      'profilePhoto',
      'cvInfo',
      'skills',
      'location',
      'noticePeriod',
      'experience',
      'staticUrl',
      'lastModDate',
      'lastModAgo'
    ],
  },
  [USER_TYPES.Recruiter]: {
    [USER_QUERY_LEVEL.level1]: [
      'userId',
      'userType',
      'profileId',
      'email',
      'mobile',
      'username',
      'name',
      'isPrimaryEmailVerified',
      'isPrimaryMobileNoVerified',
      'isKYCDocsUploaded',
      'totalSavedCandidates'
    ],
    [USER_QUERY_LEVEL.level2]: [
      'userId',
      'profileId',
      'email',
      'mobile',
      'username',
      'name',
      'companyLogo',
      'industry',
      'company',
      'companySize',
      'roleAtCompany',
      'updatedAt',
      'location',
      'isKYCDocsUploaded',
      'totalSavedCandidates'
    ],
  },
  [USER_TYPES.System_User]: {
    [USER_QUERY_LEVEL.level1]: [
      'userId',
      'userType',
      'profileId',
      'email',
      'mobile',
      'username',
      'name',
    ],
  }
};

const CLIENT_DASH_ROUTES = {
  [USER_TYPES.Seeker]: '/mnjSeeker/dashboard',
  [USER_TYPES.Recruiter]: '/mnjRecruiter/dashboard',
  [USER_TYPES.System_User]: '/mnjAdmin/dashboard',
};

module.exports = {
  JWT,
  JWT_TYPES,
  USER_TYPES,
  PLATFORM,
  MAX_LOGIN_RETRY_LIMIT,
  LOGIN_REACTIVE_TIME,
  FORGOT_PASSWORD_WITH,
  LOGIN_ACCESS,
  MODEL_TYPE,
  JWT_SECRET_TYPE,
  ACCOUNT_VERIFICATION,
  ALLOWED_FILETYPES,
  UPLOAD_TYPES,
  AUTH_STRATEGY_TYPE,
  USER_ID_LENGTH,
  SITE_COOKIES,
  USER_QUERY_TYPES,
  CLIENT_DASH_ROUTES,
};