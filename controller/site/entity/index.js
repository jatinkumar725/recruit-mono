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
const getListEntityUsecase = require('../../../use-case/site/getListEntity')({
  termDb, 
  termTaxonomyDb, 
  filterTermValidation,
  filterTermTaxonomyValidation
});

const entityController = require('./entity');

const getListEntity = entityController.getListEntity(getListEntityUsecase);

module.exports = {
    getListEntity,
};