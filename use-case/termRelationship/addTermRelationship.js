/**
 * addTermRelationship.js
 */

const termRelationshipEntity = require('../../entities/termRelationship');
const response = require('../../utils/response');
/**
 * @description : create new record of termRelationship in database.
 * @param {Object} dataToCreate : data for create new document.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : response of create. {status, message, data}
 */
const addTermRelationship = ({
  termDb, termTaxonomyDb, termRelationshipDb, createValidation
}) => async (dataToCreate, req, res) => {
    
  const termTaxonomyData = await termTaxonomyDb.findOne({ termId: dataToCreate.id }, [ 'termTaxonomyId', 'count' ]);
  if ( ! termTaxonomyData ) {
    return response.recordNotFound({ message: `Invalid ${dataToCreate?.name || 'term'} provided.`});
  }

  dataToCreate.termTaxonomyId = termTaxonomyData.termTaxonomyId;

  // Delete unwanted terms
  delete dataToCreate.id;
  delete dataToCreate.name;

  const validateRequest = await createValidation(dataToCreate);
  if (!validateRequest.isValid) {
    return response.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
  }

  let termRelationship = termRelationshipEntity(dataToCreate);
  termRelationship = await termRelationshipDb.create(termRelationship);

  if ( termRelationship ) {
    const updatedTermTaxonomy = await termTaxonomyDb.updateOne( { 
      termTaxonomyId: termTaxonomyData.termTaxonomyId,
    }, {
      count: termTaxonomyData.count + 1
    })
  }
  
  return response.success({ data: termRelationship });
};
module.exports = addTermRelationship;