const termDb = require('../../../data-access/termDb');
const termTaxonomyDb = require('../../../data-access/termTaxonomyDb');
const termRelationshipDb = require('../../../data-access/termRelationshipDb');

/**
 * Schemas
 */

// Term
const termSchema = require('../../../validation/schema/term');

const createTermValidation = require('../../../validation')(termSchema.createSchema);
const updateTermValidation = require('../../../validation')(termSchema.updateSchema);
const filterTermValidation = require('../../../validation')(termSchema.filterValidationSchema);


// Term taxonomy
const termTaxonomySchema = require('../../../validation/schema/termTaxonomy');

const createTermTaxonomyValidation = require('../../../validation')(termTaxonomySchema.createSchema);
const updateTermTaxonomyValidation = require('../../../validation')(termTaxonomySchema.updateSchema);
const filterTermTaxonomyValidation = require('../../../validation')(termTaxonomySchema.filterValidationSchema);

/**
 * Use case
 */
const addTermUsecase = require('../../../use-case/term/addTerm')({
  termDb,
  termTaxonomyDb,
  createValidation: createTermValidation
});

const findAllTermUsecase = require('../../../use-case/term/findAllTerm')({
  termDb, 
  termTaxonomyDb, 
  filterTermValidation,
  filterTermTaxonomyValidation
});

const getTermCountUsecase = require('../../../use-case/term/getTermCount')({
  termDb,
  filterTermValidation
});

const getTermUsecase = require('../../../use-case/term/getTerm')({
  termDb, 
  termTaxonomyDb, 
  filterTermValidation, 
  filterTermTaxonomyValidation
});

const updateTermUsecase = require('../../../use-case/term/updateTerm')({
  termDb, 
  termTaxonomyDb, 
  updateValidation: updateTermValidation
});

const partialUpdateTermUsecase = require('../../../use-case/term/partialUpdateTerm')({ termDb });

const softDeleteTermUsecase = require('../../../use-case/term/softDeleteTerm')({
  termDb, 
  termTaxonomyDb, 
  termRelationshipDb
});

const softDeleteManyTermUsecase = require('../../../use-case/term/softDeleteManyTerm')({
  termDb, 
  termTaxonomyDb, 
  termRelationshipDb
});

const softReactivateTermUsecase = require('../../../use-case/term/softReactivateTerm')({
  termDb, 
  termTaxonomyDb, 
  termRelationshipDb
});

const softReactivateManyTermUsecase = require('../../../use-case/term/softReactivateManyTerm')({
  termDb, 
  termTaxonomyDb, 
  termRelationshipDb
});

const bulkInsertTermUsecase = require('../../../use-case/term/bulkInsertTerm')({
  termDb, 
  termTaxonomyDb, 
  createValidation: createTermValidation
});

const bulkUpdateTermUsecase = require('../../../use-case/term/bulkUpdateTerm')({
  termDb, 
  termTaxonomyDb
});

const deleteTermUsecase = require('../../../use-case/term/deleteTerm')({
  termDb, 
  termTaxonomyDb, 
  termRelationshipDb
});

const deleteManyTermUsecase = require('../../../use-case/term/deleteManyTerm')({
  termDb, 
  termTaxonomyDb, 
  termRelationshipDb
});

const termController = require('./term');

const addTerm = termController.addTerm(addTermUsecase);
const findAllTerm = termController.findAllTerm(findAllTermUsecase);
const getTermCount = termController.getTermCount(getTermCountUsecase);
const getTermById = termController.getTerm(getTermUsecase);
const updateTerm = termController.updateTerm(updateTermUsecase);
const partialUpdateTerm = termController.partialUpdateTerm(partialUpdateTermUsecase);
const softDeleteTerm = termController.softDeleteTerm(softDeleteTermUsecase);
const softDeleteManyTerm = termController.softDeleteManyTerm(softDeleteManyTermUsecase);
const softReactivateTerm = termController.softReactivateTerm(softReactivateTermUsecase);
const softReactivateManyTerm = termController.softReactivateManyTerm(softReactivateManyTermUsecase);
const bulkInsertTerm = termController.bulkInsertTerm(bulkInsertTermUsecase);
const bulkUpdateTerm = termController.bulkUpdateTerm(bulkUpdateTermUsecase);
const deleteTerm = termController.deleteTerm(deleteTermUsecase);
const deleteManyTerm = termController.deleteManyTerm(deleteManyTermUsecase);

module.exports = {
  addTerm,
  findAllTerm,
  getTermCount,
  getTermById,
  updateTerm,
  partialUpdateTerm,
  softDeleteTerm,
  softDeleteManyTerm,
  softReactivateTerm,
  softReactivateManyTerm,
  bulkInsertTerm,
  bulkUpdateTerm,
  deleteTerm,
  deleteManyTerm,
};