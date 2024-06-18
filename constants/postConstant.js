/**
 * postConstant.js
 * @description :: constants used in posting
 */

const APPLICATION_STATUS = {
    Pending: 1,
    Shortlist: 2,
    Rejected: 3,
};

const JOB_TYPES = {
    Full_Time: 1,
    Part_Time: 2,
    // Hourly_Contract: 3,
};

const EMPLOYMENT_TYPES = {
    Work_From_Home: 1,
    Permanent: 2,
    Contractual: 3,
    Internship: 4,
};

const POST_ID_LENGTH = 8;
const POST_ID_START_AT = 1242;

const POST_QUERY_LEVEL = {
    level1: 1,
    level2: 2,
    level3: 3,
    level4: 4,
};

const POST_QUERY_TYPE = {
    [POST_QUERY_LEVEL.level1]: [
        'postId',
        'title',
        'description',
        'employmentType',
        'jobType',
        'totalOpening',
        'totalApplicants',
        'postDate',
        'industry',
        'designation',
        'skills',
        'location',
        'company',
        'companyDescription',
        'salaryDetails',
        'minimumExperience',
        'maximumExperience',
        'staticUrl'
    ],
    [POST_QUERY_LEVEL.level2]: [
        'postId',
        'title',
        'description',
        'employmentType',
        'jobType',
        'totalOpening',
        'totalApplicants',
        'postDate',
        'industry',
        'designation',
        'skills',
        'location',
        'company',
        'companyDescription',
        'salaryDetails',
        'minimumExperience',
        'maximumExperience',
        'isFeatured',
        'views',
        'expireAfter',
        'expireAfterDate',
        'education',
        'staticUrl'
    ],
    [POST_QUERY_LEVEL.level3]: [
        'postId',
        'views'
    ],
};

module.exports = {
    APPLICATION_STATUS,
    JOB_TYPES,
    EMPLOYMENT_TYPES,
    POST_ID_LENGTH,
    POST_ID_START_AT,
    POST_QUERY_TYPE
};