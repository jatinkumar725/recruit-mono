/**
 * updateTermRelationship.js
 * 
 * TODO:
 * - Remove all previous term that are not present in request
 * - Add term if not exits
 */
const makeAddTerm = require("./../term/addTerm");
const termRelationshipEntity = require("../../entities/termRelationship");
const response = require("../../utils/response");
const { TAXONOMY } = require("../../constants/termConstant");
/**
 * @description : update record with data by id.
 * @param {Object} params : request body including query and data.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : updated TermRelationship. {status, message, data}
 */

const createRecord = async (dataToCreate, termRelationshipDb, createValidation) => {
  try {
    const validateRequest = await createValidation(dataToCreate);
    if (!validateRequest.isValid) {
      return response.validationError({
        message: `Invalid values in parameters, ${validateRequest.message}`,
      });
    }

    await termRelationshipDb.create(dataToCreate);

    return true;

  } catch (error) {
    console.error(error);
  }
};

const deleteRecord = async (dataToDelete, termTaxonomyDb, termRelationshipDb) => {
  try {

    // Assuming dataToDelete contains necessary data for deletion
    const deletedRecordCnt = await termRelationshipDb.deleteMany({
      objectId: dataToDelete.objectId,
      termTaxonomyId: { $in: dataToDelete.termTaxonomyIds },
      objectGroup: dataToDelete.objectGroup,
    });

    if (deletedRecordCnt) {

      // Decrement the count of the taxonomy
      await termTaxonomyDb.updateMany(
        {
          termTaxonomyId: { $in: dataToDelete.termTaxonomyIds },
          count: { $gt: 0 } // Only update documents where count is greater than 0
        },
        {
          $inc: { count: -1 } // Decrement count by 1
        }
      );

    }

    // Return a success response if deletion is successful
    return { success: true };

  } catch (error) {
    console.error(error);
    // Return an error response if an error occurs during deletion
    return { success: false, error: "An error occurred during deletion." };
  }
};

const attachObjectTerm = async (
  objectId,
  model_type,
  objects,
  previouslyAttachedTermRelationships,
  termDb,
  termTaxonomyDb,
  termRelationshipDb,
  createValidation,
  createTermValidation
) => {

  // Shadow Clone previouslyAttachedTermRelationships
  const previouslyAttachedTermRelationshipsClone = [...previouslyAttachedTermRelationships];

  const addTerm = await makeAddTerm({
    termDb,
    termTaxonomyDb,
    createValidation: createTermValidation,
  });

  for (const object of objects) {

    const { noticeperiod, religion, maritalstatus, skills, city, pincode, educationType, specialisation, institute, company, industry, designation, locationId, educationId, employmentId } = object;

    const objectGroup = [locationId, educationId, employmentId];    
    
    const termQueries = [];

    // Notice period query
    if (noticeperiod) {
      termQueries.push({ term: noticeperiod.split(','), taxonomy: "noticeperiod" });
    }

    // Religion query
    if (religion) {
      termQueries.push({ term: religion.split(','), taxonomy: "religion" });
    }

    // Marital status query
    if (maritalstatus) {
      termQueries.push({ term: maritalstatus.split(','), taxonomy: "maritalstatus" });
    }

    // Skills query
    if (skills) {
      termQueries.push({ term: skills.split(','), taxonomy: "skill" });
    }

    // City query
    if (city) {
      termQueries.push({ term: city, taxonomy: "city" });
    }

    // Pincode query
    if (pincode) {
      termQueries.push({ term: pincode, taxonomy: "pincode" });
    }

    // Education type query
    if (educationType) {
      termQueries.push({ term: educationType, taxonomy: "educationtype" });
    }
    
    // Specialisation query
    if (specialisation) {
      termQueries.push({ term: specialisation, taxonomy: "specialisation" });
    }

    // Institute query
    if (institute) {
      termQueries.push({ term: institute, taxonomy: "institute" });
    }

    // Company query
    if (company) {
      termQueries.push({ term: company, taxonomy: "company" });
    }

    // Designation query
    if (designation) {
      termQueries.push({ term: designation, taxonomy: "designation" });
    }

    // Industry query
    if (industry) {
      termQueries.push({ term: industry, taxonomy: "industry" });
    }

    for (const { term, taxonomy } of termQueries) {

      let query = [term];
      if (Array.isArray(term)) {
        query = term;
      }

      const termTaxonomyIds = [];

      for (const queryTerm of query) {

        // Fnd terms in termDb
        const matchedTerms = await termDb.findMany({ name: queryTerm }, { termId: 1, _id: 0 });
        const matchedTermIds = matchedTerms.map(term => term.termId);

        let existedTerm = null;
        let termTaxonomy = null;

        // Check if it belongs to taxonomy
        if (matchedTermIds.length) {
          termTaxonomy = await termTaxonomyDb.findOne(
            { termId: { $in: matchedTermIds }, taxonomy },
            { termTaxonomyId: 1, _id: 0 }
          );

          if (termTaxonomy) {
            // Set existedTerm if it found in taxonomy
            existedTerm = matchedTermIds.filter(termId => termTaxonomy.termId === termId);
          }
        }

        // If term not exists, add it to termDb
        if (((existedTerm && !termTaxonomy) || (!existedTerm)) && TAXONOMY[taxonomy].isCreatable) {

          const addedTermResult = await addTerm({
            name: queryTerm,
            taxonomy
          });

          existedTerm = addedTermResult.data;

          // Re-fill termTaxonomy
          termTaxonomy = await termTaxonomyDb.findOne(
            { termId: existedTerm.termId, taxonomy },
            { termTaxonomyId: 1, _id: 0 }
          );

        }

        if (termTaxonomy) {
          termTaxonomyIds.push(termTaxonomy.termTaxonomyId);
        }

      }

      const filteredRecordsByObjectGroup = previouslyAttachedTermRelationshipsClone.filter(record => {
        return objectGroup.includes(record.objectGroup);
      });

      // Extracting only termTaxonomyId from the filtered records
      const filteredTermTaxonomyIds = filteredRecordsByObjectGroup.map(record => record.termTaxonomyId);

      // Already existed record for the taxonomy
      const filteredPrevRecordsByTaxonomy = await termTaxonomyDb.findMany({
        $and: [{ termTaxonomyId: { $in: filteredTermTaxonomyIds } }, { taxonomy }]
      });

      for (const termTaxonomyId of termTaxonomyIds) {

        const alreadyAttachedIndex = filteredPrevRecordsByTaxonomy.findIndex(record => termTaxonomyId === record.termTaxonomyId);

        if (alreadyAttachedIndex !== -1) {

          filteredPrevRecordsByTaxonomy.splice(alreadyAttachedIndex, 1);

        } else {
          // If not already attached, create the term relationship
          const createdRecord = await createRecord(
            {
              objectId,
              termTaxonomyId: termTaxonomyId,
              model_type,
              objectGroup: locationId || educationId || employmentId,
            },
            termRelationshipDb,
            createValidation
          );

          if (createdRecord) {

            // Increment object count of taxonomy
            await termTaxonomyDb.updateOne(
              { termTaxonomyId: termTaxonomyId },
              { $inc: { count: 1 } }
            );

          }
          // console.log(createdRecord)
        }

      }

      // Delete all relationships for terms that are not exists in request
      if (filteredPrevRecordsByTaxonomy.length) {
        await deleteRecord(
          {
            objectId,
            termTaxonomyIds: filteredPrevRecordsByTaxonomy.map(termTaxonomy => termTaxonomy.termTaxonomyId),
            objectGroup: locationId || educationId || employmentId, // Empty means attach to direct main object
          },
          termTaxonomyDb,
          termRelationshipDb
        ); // Empty means request have no term to add or delete
      }

    }

  }

};

const updateTermRelationship =
  ({
    termDb,
    termTaxonomyDb,
    termRelationshipDb,
    createValidation,
    createTermValidation,
  }) =>
    async (dataToCreate, req, res) => {
      try {
        const { objectId, model_type, termsData } = dataToCreate;

        if (termsData) {
          // Retrieve existing term relationships for the post
          const previouslyAttachedTermRelationships =
            await termRelationshipDb.findMany({ objectId }, {
              termTaxonomyId: 1,
              objectGroup: 1,
              _id: 0,
            });

          // Attach to location array
          if (termsData.location) {
            await attachObjectTerm(
              objectId,
              model_type,
              termsData.location,
              previouslyAttachedTermRelationships,
              termDb,
              termTaxonomyDb,
              termRelationshipDb,
              createValidation,
              createTermValidation
            );
          }
          
          // Attach to preferred location array
          if (termsData.preflocation) {
            await attachObjectTerm(
              objectId,
              model_type,
              termsData.preflocation, // Add job type and handle multi select on job location and type to populate - client
              previouslyAttachedTermRelationships,
              termDb,
              termTaxonomyDb,
              termRelationshipDb,
              createValidation,
              createTermValidation
            );
          }

          // Attach to education array
          if (termsData.education) {
            await attachObjectTerm(
              objectId,
              model_type,
              termsData.education,
              previouslyAttachedTermRelationships,
              termDb,
              termTaxonomyDb,
              termRelationshipDb,
              createValidation,
              createTermValidation
            );
          }

          // Attach to employment array
          if (termsData.employment) {
            await attachObjectTerm(
              objectId,
              model_type,
              termsData.employment,
              previouslyAttachedTermRelationships,
              termDb,
              termTaxonomyDb,
              termRelationshipDb,
              createValidation,
              createTermValidation
            );
          }

          // Attach to skills array with entity
          if (termsData.skills) {
            await attachObjectTerm(
              objectId,
              model_type,
              [{ skills: termsData.skills, }],
              previouslyAttachedTermRelationships,
              termDb,
              termTaxonomyDb,
              termRelationshipDb,
              createValidation,
              createTermValidation
            );
          }

          // Attach to industry string with entity
          if (termsData.industry) {
            await attachObjectTerm(
              objectId,
              model_type,
              [{ industry: termsData.industry }],
              previouslyAttachedTermRelationships,
              termDb,
              termTaxonomyDb,
              termRelationshipDb,
              createValidation,
              createTermValidation
            );
          }

          // Attach to company string with entity
          if (termsData.company) {
            await attachObjectTerm(
              objectId,
              model_type,
              [{ company: termsData.company }],
              previouslyAttachedTermRelationships,
              termDb,
              termTaxonomyDb,
              termRelationshipDb,
              createValidation,
              createTermValidation
            );
          }

          // Attach to designation string with entity
          if (termsData.designation) {
            await attachObjectTerm(
              objectId,
              model_type,
              [{ designation: termsData.designation }],
              previouslyAttachedTermRelationships,
              termDb,
              termTaxonomyDb,
              termRelationshipDb,
              createValidation,
              createTermValidation
            );
          }
          
          // Attach to notice period string with entity
          if (termsData.noticeperiod) {
            await attachObjectTerm(
              objectId,
              model_type,
              [{ noticeperiod: termsData.noticeperiod }],
              previouslyAttachedTermRelationships,
              termDb,
              termTaxonomyDb,
              termRelationshipDb,
              createValidation,
              createTermValidation
            );
          }
          
          // Attach to religion string with entity
          if (termsData.religion) {
            await attachObjectTerm(
              objectId,
              model_type,
              [{ religion: termsData.religion }],
              previouslyAttachedTermRelationships,
              termDb,
              termTaxonomyDb,
              termRelationshipDb,
              createValidation,
              createTermValidation
            );
          }
          
          // Attach to marital status string with entity
          if (termsData.maritalstatus) {
            await attachObjectTerm(
              objectId,
              model_type,
              [{ maritalstatus: termsData.maritalstatus }],
              previouslyAttachedTermRelationships,
              termDb,
              termTaxonomyDb,
              termRelationshipDb,
              createValidation,
              createTermValidation
            );
          }
        }

        return response.badRequest();
      } catch (error) {
        console.error(error);
        return response.internalServerError({
          message: "An error occurred while updating term relationships.",
        });
      }
    };

module.exports = updateTermRelationship;