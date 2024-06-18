const formidable = require('formidable');
const validUrl = require('valid-url');

const response = require('../../utils/response');
const makeDirectory = require('../../utils/makeDirectory');

const { DEFAULT_UPLOAD_DIR_PATH, DEFAULT_UPLOAD_DIR, } = require('../../constants/uploadConstant');

const { uploadFilesOnLocalServer, deleteFileFromLocalServer } = require('../../services/fileUpload');

const upload = ({
  uploadDb,
  allowedFileTypes,
  uploadType,
  modelType,
}) => async (profileId, req, res) => {
  try {
    let combinedOutput = {};
    let defaultDirectory = DEFAULT_UPLOAD_DIR_PATH + uploadType.dir;
    let maxFileSize = 5; //In Megabyte

    // Create Directory if not exist.
    await makeDirectory(defaultDirectory);

    // Setting up formidable options.
    const options = {
      multiples: uploadType.multiples,
      maxFileSize: 300 * 1024 * 1024, //300 MB
      maxFieldsSize: 100 * 1024 * 1024 //50 MB
    };

    const form = new formidable.IncomingForm(options);

    //Parse Form data
    const {
      fields, files
    } = await new Promise(async (resolve, reject) => {
      form.parse(req, function (error, fields, files) {
        if (error) reject(error);
        resolve({
          fields,
          files
        });
      });
    });

    let uploadSuccess = [];
    let uploadFailed = [];
    let fileCount = 1;

    let fileArr = [];
    if (!files['files'] || files['files'].size == 0) {

      let badRequestNoFile = 'Select file to upload.';
      if (uploadType.multiples) {
        badRequestNoFile = 'Select at least one file to upload.';
      }

      return response.badRequest({ message: badRequestNoFile });

    }

    // Check if multiples are not allowed and more than one file is uploaded
    if (!uploadType.multiples && Array.isArray(files['files']) && files['files'].length > 1) {
      return response.badRequest({ message: 'Multiple files not allowed for this upload type.' });
    }

    if (!Array.isArray(files['files'])) {
      fileArr.push(files['files']);
      files['files'] = fileArr;
    }

    // Delete All previous uploads for the user.
    if (uploadType.deletePrevious) {

      const uploadsToBeDelete = await uploadDb.findMany({
        userId: profileId,
        uploadType: uploadType.type
      });

      uploadsToBeDelete.forEach(async (upload) => {

        // Delete records from db
        await uploadDb.deleteOne({
          _id: upload._id,
        });

        // Delete files from server
        const uploadDeletePath = DEFAULT_UPLOAD_DIR + upload.uploadPath;
        deleteFileFromLocalServer(uploadDeletePath);

      });

    }

    for (let file of files['files']) {
      let response = await uploadFilesOnLocalServer(file, fields, fileCount++, allowedFileTypes, maxFileSize, defaultDirectory);
      if (response.status == false) {
        uploadFailed.push({
          'name': file.originalFilename,
          'error': response.message,
          'status': false
        });
      } else {
        let url = response.data;
        if (!validUrl.isUri(response.data)) {
          response.data = response.data.replace('/'+DEFAULT_UPLOAD_DIR, '');
          url = `${response.data}`;
        }

        let uploadResult = await uploadDb.create({
          model_type: modelType,
          userId: profileId,
          uploadName: file.originalFilename,
          uploadType: uploadType.type,
          fileFormat: response.fileFormat,
          fileSize: response.fileSize,
          uploadPath: url,
        });

        uploadSuccess.push(uploadResult);
      }
    }

    let uploadFileRes = {
      uploadSuccess,
      uploadFailed
    };

    if (uploadType.multiples) {

      let fileUploadResponseObj = {};
      if (uploadFileRes.uploadSuccess.length > 0) {
        let message = `${uploadFileRes.uploadSuccess.length} File uploaded successfully out of ${uploadFileRes.uploadSuccess.length + uploadFileRes.uploadFailed.length}`;
        fileUploadResponseObj = {
          message: message,
          data: {
            uploadFailed: uploadFileRes.uploadFailed,
          }
        };

      } else {
        let message = 'Failed to upload files.';
        fileUploadResponseObj = {
          message: message,
          data: uploadFileRes
        };
      }

      combinedOutput.uploadFileRes = fileUploadResponseObj;

    } else {

      if (uploadFileRes.uploadSuccess.length > 0) {

        combinedOutput = {
          status: true,
          message: 'File uploaded successfully',
        };

      } else {

        combinedOutput = {
          status: false,
          message: uploadFileRes.uploadFailed[0].error,
        };

      }

    }

    if (combinedOutput) {
      return response.success({ data: combinedOutput });
    }

  } catch (error) {
    console.log('error', error);
  }
};

module.exports = upload;