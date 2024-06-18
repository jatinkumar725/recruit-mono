const termDb = require('../../../data-access/termDb');
const termTaxonomyDb = require('../../../data-access/termTaxonomyDb');

/**
 * Schemas
 */

// Term
const termSchema = require('../../../validation/schema/term');

const filterTermValidation = require('../../../validation')(termSchema.filterValidationSchema);


// Term taxonomy
const termTaxonomySchema = require('../../../validation/schema/termTaxonomy');

const filterTermTaxonomyValidation = require('../../../validation')(termTaxonomySchema.filterValidationSchema);

/**
 * Use case
 */
const suggesterUsecase = require('../../../use-case/site/suggester')({
  termDb, 
  termTaxonomyDb, 
  filterTermValidation,
  filterTermTaxonomyValidation
});

const suggesterController = require('./taxonomy');

const findAllTerm = suggesterController.findAllTerm(suggesterUsecase);

module.exports = {
  findAllTerm,
};