/**
 * getUpload.js
 */

 const response = require('../../utils/response');

 /**
  * @description : find record from database by id;
  * @param {Object} params : request body including option and query.
  * @param {Object} req : The req object represents the HTTP request.
  * @param {Object} res : The res object represents HTTP response.
  * @return {Object} : found User. {status, message, data}
  */
 const getUpload = ({
   uploadDb, 
 }) => async (params,req,res) => {
   let {
     query,  
     options
   } = params;
   let foundUpload = await uploadDb.findOne(query, options)
   if (!foundUpload){
     return response.recordNotFound();
   }
   return response.success({ data:foundUpload });
 };
 module.exports = getUpload;