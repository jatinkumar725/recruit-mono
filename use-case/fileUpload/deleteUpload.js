/**
 * deleteUpload.js
 */

const response = require('../../utils/response');
const { deleteFileFromLocalServer } = require('../../services/fileUpload');
const { DEFAULT_UPLOAD_DIR } = require('../../constants/uploadConstant');
/**
 * @description : find record from database by id;
 * @param {Object} params : request body including option and query.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : found User. {status, message, data}
 */
const deleteUpload = ({
  uploadDb,
}) => async (params, req, res) => {
  let {
    query,
    options
  } = params;
  const deletedUpload = await uploadDb.deleteOne(query, options);
  if (deletedUpload) {
    const deletedUploadPath = DEFAULT_UPLOAD_DIR + deletedUpload.uploadPath;
    deleteFileFromLocalServer(deletedUploadPath);
  } else {
    return response.recordNotFound();
  }
  return response.success({ message: 'File deleted successfully' });
};
module.exports = deleteUpload;