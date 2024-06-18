/**
 *partialUpdateAppliedPost.js
 */

 const response = require('../../utils/response');

 /**
  * @description : partially update record with data by id;
  * @param {Object} params : request body.
  * @param {Object} req : The req object represents the HTTP request.
  * @param {Object} res : The res object represents HTTP response.
  * @return {obj} : updated applied post. {status, message, data}
  */
 const partialUpdateAppliedPost = ({ appliedPostDb }) => async (params,req,res) => {
   let { dataToUpdate, query } = params;
   const appliedPost = await appliedPostDb.updateOne(query,dataToUpdate);
   if (!appliedPost){
     return response.recordNotFound();
   }
   return response.success({ data: appliedPost });
 };
 module.exports = partialUpdateAppliedPost;