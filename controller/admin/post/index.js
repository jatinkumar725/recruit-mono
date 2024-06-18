const postDb = require('../../../data-access/postDb');

// Schemas
const postSchema = require('../../../validation/schema/post');

// Schema Validations
const filterValidation = require('../../../validation')(postSchema.filterValidationSchema);

// Post use cases
const findAllPostUsecase = require('../../../use-case/post/findAllPost')({
    postDb,
    filterValidation
});

const deleteUserPostUsecase = require('../../../use-case/post/deletePost')({
    postDb,
});

/**
 * Term relationship
 */
const termRelationshipDb = require('../../../data-access/termRelationshipDb');
const termTaxonomyDb = require('../../../data-access/termTaxonomyDb');

const deleteTermRelationshipUsecase = require('../../../use-case/termRelationship/deleteManyTermRelationship')({
  termTaxonomyDb, 
  termRelationshipDb
});

const postController = require('./post');

/**
 * User
 */

const recruiterDb = require('../../../data-access/recruiterDb');

// Schemas
const recruiterSchema = require('../../../validation/schema/recruiter');

// Schema validation
const filterRecruiterValidation = require('../../../validation')(recruiterSchema.filterValidationSchema);

const getUserUsecase = require('../../../use-case/user/getUser')({
    userDb: recruiterDb,
    filterValidation: filterRecruiterValidation
});

const findAllOrphanPost = postController.findAllOrphanPost(findAllPostUsecase, getUserUsecase);
const deleteOrphanPost = postController.deleteOrphanPost(deleteUserPostUsecase, deleteTermRelationshipUsecase);

module.exports = {
    findAllOrphanPost,
    deleteOrphanPost,
};