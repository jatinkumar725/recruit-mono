module.exports = (upload) => {

  let newUpload = {
    userId: upload.userId,
    model_type: upload.model_type,
    uploadName: upload.uploadName,
    uploadPath: upload.uploadPath,
    uploadType: upload.uploadType,
    fileSize: upload.fileSize,
    fileFormat: upload.fileFormat,
    isActive: upload.isActive,
    addedBy: upload.addedBy,
    updatedBy: upload.updatedBy,
    createdAt: upload.createdAt,
    updatedAt: upload.updatedAt,
    isDeleted: upload.isDeleted,
  };

  // remove undefined values
  Object.keys(newUpload).forEach(key => newUpload[key] === undefined && delete newUpload[key]);

  // To validate Entity uncomment this block
  /*
   * const validate = (newUpload) => {
   *   if (!newUpload.field) {
   *       throw new Error("this field is required");
   *   }
   * }
   * validate(newUpload) 
   */

  return Object.freeze(newUpload);
};
