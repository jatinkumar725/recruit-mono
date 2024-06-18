const SITE_DIR_PATH = "";
const SITE_DIR_URI = "https://recruit-mono.onrender.com/";

const SUPPORTED_YEARS = [
  2031, 2030, 2029, 2028, 2027, 2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012,
  2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999,
  1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986,
  1985, 1984,
];

const SUPPORTED_MONTHS = {
  1: {
    long: 'January',
    short: 'Jan',
  },
  2: {
    long: 'February',
    short: 'Feb',
  },
  3: {
    long: 'March',
    short: 'Mar',
  },
  4: {
    long: 'April',
    short: 'Apr',
  },
  5: {
    long: 'May',
    short: 'May',
  },
  6: {
    long: 'June',
    short: 'Jun',
  },
  7: {
    long: 'July',
    short: 'Jul',
  },
  8: { 
    long: 'August',
    short: 'Aug',
  },
  9: {
    long: 'September',
    short: 'Sep',
  },
  10: {
    long: 'October',
    short: 'Oct',
  },
  11: {
    long: 'November',
    short: 'Nov',
  },
  12: {
    long: 'December',
    short: 'Dec',
  }
};

const SUPPORTED_EXPERIENCE_YEARS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
];

const SUPPORTED_EXPERIENCE_MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const SUPPORTED_PROFILE_PICTURE_FORMATS = ['png', 'jpeg', 'jpg'];

const MAX_SUPPORTED_PROFILE_PICTURE_SIZE = 2; // MB

const SUPPORTED_CV_RESUME_FORMATS = [
  'msword',
  'vnd.openxmlformats-officedocument.wordprocessingml.document',
  'rtf',
  'pdf'
];

const MAX_SUPPORTED_CV_RESUME_SIZE = 2; // MB

const API_BASE_URIS = {
  System_User: 'admin/api',
  Seeker: 'client/cloud-aggregator-sk/v1',
  Recruiter: 'client/cloud-aggregator-rec/v1',
  Taxonomy: 'client/cloud-aggregator-taxonomy',
  Site_Jobs: 'rp-job-api/v1',
  Site_Login_Status: 'client/central-auth-service/v1/login-status'
};

const MAX_SUPPORTED_DOC_UPlOAD_SIZE = 2; // MB

const SUPPORTED_DOC_UPlOAD_FORMATS = ['pdf', 'jpeg', 'jpg'];

const USER_VERIFICATION = {
  SEEKER: {
    email: true,
    mobile: false,
  }, 
  RECRUITER: {
    email: true,
    mobile: false,
  } 
};

const COMPANY_SIZE = {
  1: '1-10',
  2: '11-50',
  3: '51-100',
  4: '101-500',
  5: '500+',
};

const EMPLOYMENT_TYPES = {
  'Work from home': 1,
  'Permanent': 2,
  'Contractual': 3,
  'Internship': 4,
};

const JOB_TYPES = {
  'Full Time': 1,
  'Part Time': 2,
  // 'Hourly Contract': 3,
};

const JOB_OPENINGS = {
  1: '1 Opening',
  2: '2 Openings',
  3: '3 Openings',
  4: '4 Openings',
  5: '5 Openings',
};

const SUPPORTED_JOB_VALIDITY_PERIOD = {
    1: '7 Days',
    2: '15 Days',
    3: '1 Month',
    4: '2 Months',
    5: '3 Months',
};

const GENDER_TYPES = {
  'M': 'Male',
  'F': 'Female',
  'T': 'Transgender',
};

const MARITAL_STATUS_TYPES = [ 'Single/unmarried', 'Married', 'Widowed', 'Divorced', 'Separated', 'Other' ];

const RELIGION_TYPES = [ 'Hindu', 'Muslim', 'Christian', 'Sikh', 'Jain', 'Buddhist', 'Other' ];

const NOTICE_PERIOD_TYPES = {
  1: '15 Days or less',
  2: '1 Month',
  3: '2 Months',
  4: '3 Months',
  5: 'More than 3 Months',
  6: 'Serving Notice Period',
};

const EDUCATION_TYPES = {
  'ppg': 'Doctorate/Ph.D',
  'pg': 'Post Graduation',
  'ug': 'Graduation',
  'ssec': 'Class XII',
  'sec':'Class X'
};

const EXAM_BOARD_GROUPS = [
  {
    id: 1,
    name: 'All India',
  },
  {
    id: 2,
    name: 'State Board',
  }
];

const EXAM_BOARDS = [
  {
    name: "CBSE",
    group: EXAM_BOARD_GROUPS[0].id
  },
  {
    name: "CICSE(ICSE/ISC)",
    group: EXAM_BOARD_GROUPS[0].id
  },
  {
    name: "Diploma",
    group: EXAM_BOARD_GROUPS[0].id
  },
  {
    name: "National Open School",
    group: EXAM_BOARD_GROUPS[0].id
  },
  {
    name: "IB(International Baccalaureate)",
    group: EXAM_BOARD_GROUPS[0].id
  },
  {
    name: "Andhra Pradesh",
    group: EXAM_BOARD_GROUPS[1].id
  },
  {
    name: "Assam",
    group: EXAM_BOARD_GROUPS[1].id
  },
  {
    name: "Bihar",
    group: EXAM_BOARD_GROUPS[1].id
  },
  {
    name: "Gujarat",
    group: EXAM_BOARD_GROUPS[1].id
  },
  {
    name: "Karnataka",
    group: EXAM_BOARD_GROUPS[1].id
  },
  {
    name: "Kerala",
    group: EXAM_BOARD_GROUPS[1].id
  },
  {
    name: "Maharashtra",
    group: EXAM_BOARD_GROUPS[1].id
  },
  {
    name: "Punjab",
    group: EXAM_BOARD_GROUPS[1].id
  },
  {
    name: "Tamil Nadu",
    group: EXAM_BOARD_GROUPS[1].id
  },
  {
    name: "Uttar Pradesh",
    group: EXAM_BOARD_GROUPS[1].id
  },
  {
    name: "West Bengal",
    group: EXAM_BOARD_GROUPS[1].id
  },
  {
    name: "Other",
    group: EXAM_BOARD_GROUPS[1].id
  }
];

const EXCLUSIVE_EDUCATION_TYPES = [ 'Class X', 'Class XII' ];

export {
  SITE_DIR_PATH,
  SITE_DIR_URI,
  SUPPORTED_YEARS,
  SUPPORTED_MONTHS,
  SUPPORTED_EXPERIENCE_YEARS,
  SUPPORTED_EXPERIENCE_MONTHS,
  SUPPORTED_PROFILE_PICTURE_FORMATS,
  MAX_SUPPORTED_PROFILE_PICTURE_SIZE,
  SUPPORTED_CV_RESUME_FORMATS,
  MAX_SUPPORTED_CV_RESUME_SIZE,
  MAX_SUPPORTED_DOC_UPlOAD_SIZE,
  SUPPORTED_DOC_UPlOAD_FORMATS,
  API_BASE_URIS,
  USER_VERIFICATION,
  COMPANY_SIZE,
  EMPLOYMENT_TYPES,
  JOB_TYPES,
  JOB_OPENINGS,
  GENDER_TYPES,
  MARITAL_STATUS_TYPES,
  NOTICE_PERIOD_TYPES,
  RELIGION_TYPES,
  SUPPORTED_JOB_VALIDITY_PERIOD,
  EDUCATION_TYPES,
  EXAM_BOARD_GROUPS,
  EXAM_BOARDS,
  EXCLUSIVE_EDUCATION_TYPES
};
