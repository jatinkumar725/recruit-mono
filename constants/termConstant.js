/**
 * termConstant.js
 * @description :: constants used in term
 */

const TAXONOMY = {
    country: {
        name: 'country',
        isCreatable: true,
    },
    state: {
        name: 'state',
        isCreatable: true,
    },
    city: {
        name: 'city',
        isCreatable: true,
    },
    pincode: {
        name: 'pincode',
        isCreatable: true,
    },
    language: {
        name: 'language',
        isCreatable: true,
    },
    experience: {
        name: 'experience',
        isCreatable: true,
    },
    companysize: {
        name: 'companySize',
        isCreatable: true,
    },
    skill: {
        name: 'skill',
        isCreatable: true,
    },
    // worked with yet
    designation: {
        name: 'designation',
        isCreatable: true,
    },
    industry: {
        name: 'industry',
        isCreatable: true,
    },
    education: {
        name: 'education',
        isCreatable: true,
    },
    company: {
        name: 'company',
        isCreatable: true,
    },
    // skills: {
    //     name: 'skills',
    //     isCreatable: true,
    // },
    location: {
        name: 'location',
        isCreatable: true,
    },
    employment: {
        name: 'employment',
        isCreatable: true,
    },
    educationtype: {
        name: 'educationtype',
        isCreatable: true,
    },
    institute: {
        name: 'institute',
        isCreatable: true,
    },
    specialisation: {
        name: 'specialisation',
        isCreatable: true,
    },
    noticeperiod: {
        name: 'noticeperiod',
        isCreatable: true,
    },
    maritalstatus: {
        name: 'maritalstatus',
        isCreatable: true,
    },
    religion: {
        name: 'religion',
        isCreatable: true,
    },
    preflocation: {
        name: 'preflocation',
        isCreatable: true,
    }
};

const DEFAULT_TERM_SEARCH_RESULTS = 10; // Ten
const MAX_TERM_SEARCH_RESULTS = 10000; // Ten Thousands

const EDUCATION_TYPES = {
    'ppg': 'Doctorate/Ph.D',
    'pg': 'Post Graduation',
    'ug': 'Graduation',
    'ssec': 'Class XII',
    'sec': 'Class X'
};

module.exports = {
    TAXONOMY,
    DEFAULT_TERM_SEARCH_RESULTS,
    MAX_TERM_SEARCH_RESULTS,
    EDUCATION_TYPES
};