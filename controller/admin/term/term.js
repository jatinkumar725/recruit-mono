const response = require('../../../utils/response');
const responseHandler = require('../../../utils/response/responseHandler');
const getSelectObject = require('../../../utils/getSelectObject');

const addTerm = (addTermUsecase) => async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    dataToCreate.addedBy = req.user.id;
    let result = await addTermUsecase(dataToCreate, req, res);
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const bulkInsertTerm = (bulkInsertTermUsecase) => async (req, res) => {
  try {
    let dataToCreate = [...req.body.data];
    for (let i = 0; i < dataToCreate.length; i++) {
      dataToCreate[i] = {
        ...dataToCreate[i],
        addedBy: req.user.id,
      };
    }
    let result = await bulkInsertTermUsecase(dataToCreate, req, res);
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const findAllTerm = (findAllTermUsecase) => async (req, res) => {
  try {
    let query = { ...req.body.query || { isActive: true, isDeleted: false } };
    let options = { ...req.body.options || {} };
    let result = await findAllTermUsecase({
      query,
      options,
      isCountOnly: req.body.isCountOnly || false
    }, req, res);
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const getTerm = (getTermUsecase) => async (req, res) => {
  try {
    if (!req.params.id) {
      return responseHandler(res, response.badRequest());
    }
    let query = { termId: req.params.id };
    let options = {};
    let result = await getTermUsecase({
      query,
      options
    }, req, res);
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const getTermCount = (getTermCountUsecase) => async (req, res) => {
  try {
    let where = { ...req.body.where || { isActive: true, isDeleted: false } };
    let result = await getTermCountUsecase({ where }, req, res);
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const updateTerm = (updateTermUsecase) => async (req, res) => {
  try {
    if (!req.params.id) {
      return responseHandler(res, response.badRequest({ message: 'Insufficient request parameters! id is required.' }));
    }
    let dataToUpdate = { ...req.body || {} };
    let query = { termId: req.params.id };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let result = await updateTermUsecase({
      dataToUpdate,
      query
    }, req, res);
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const bulkUpdateTerm = (bulkUpdateTermUsecase) => async (req, res) => {
  try {
    let dataToUpdate = { ...req.body.data || {} };
    let query = { ...req.body.filter || {} };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let result = await bulkUpdateTermUsecase({
      dataToUpdate,
      query
    }, req, res);
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const partialUpdateTerm = (partialUpdateTermUsecase) => async (req, res) => {
  try {
    if (!req.params.id) {
      return responseHandler(res, response.badRequest({ message: 'Insufficient request parameters! id is required.' }));
    }
    let query = { termId: req.params.id };
    let dataToUpdate = { ...req.body || {} };
    dataToUpdate.updatedBy = req.user.id;
    let result = await partialUpdateTermUsecase({
      dataToUpdate,
      query
    }, req, res);
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const deleteTerm = (deleteTermUsecase) => async (req, res) => {
  try {
    if (!req.params.id) {
      return responseHandler(res, response.badRequest({ message: 'Insufficient request parameters! id is required.' }));
    }
    let query = { termId: req.params.id };
    let result = await deleteTermUsecase({
      query,
      isWarning: req.body.isWarning || false
    }, req, res);
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const deleteManyTerm = (deleteManyTermUsecase) => async (req, res) => {
  try {
    if (!req.body || !req.body.ids) {
      return responseHandler(res, response.badRequest({ message: 'Insufficient request parameters! ids field is required.' }));
    }
    let ids = req.body.ids;
    let query = { termId: { $in: ids } };
    let result = await deleteManyTermUsecase({
      query,
      isWarning: req.body.isWarning || false
    }, req, res);
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const softDeleteTerm = (softDeleteTermUsecase) => async (req, res) => {
  try {
    if (!req.params.id) {
      return responseHandler(res, response.badRequest({ message: 'Insufficient request parameters! id is required.' }));
    }
    let query = { termId: req.params.id };
    const dataToUpdate = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let result = await softDeleteTermUsecase({
      query,
      dataToUpdate,
      isWarning: req.body.isWarning || false
    }, req, res);
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const softDeleteManyTerm = (softDeleteManyTermUsecase) => async (req, res) => {
  try {
    if (!req.body || !req.body.ids) {
      return responseHandler(res, response.badRequest({ message: 'Insufficient request parameters! id is required.' }));
    }
    let ids = req.body.ids;
    let query = { termId: { $in: ids } };
    const dataToUpdate = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let result = await softDeleteManyTermUsecase({
      query,
      dataToUpdate,
      isWarning: req.body.isWarning || false
    }, req, res);
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const softReactivateTerm = (softReactivateTermUsecase) => async (req, res) => {
  try {
    if (!req.params.id) {
      return responseHandler(res, response.badRequest({ message: 'Insufficient request parameters! id is required.' }));
    }
    let query = { termId: req.params.id };
    const dataToUpdate = {
      isDeleted: false,
      updatedBy: req.user.id,
    };
    let result = await softReactivateTermUsecase({
      query,
      dataToUpdate,
      isWarning: req.body.isWarning || false
    }, req, res);
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

const softReactivateManyTerm = (softReactivateManyTermUsecase) => async (req, res) => {
  try {
    if (!req.body || !req.body.ids) {
      return responseHandler(res, response.badRequest({ message: 'Insufficient request parameters! id is required.' }));
    }
    let ids = req.body.ids;
    let query = { termId: { $in: ids } };
    const dataToUpdate = {
      isDeleted: false,
      updatedBy: req.user.id,
    };
    let result = await softReactivateManyTermUsecase({
      query,
      dataToUpdate,
      isWarning: req.body.isWarning || false
    }, req, res);
    return responseHandler(res, result);
  } catch (error) {
    return responseHandler(res, response.internalServerError({ message: error.message }));
  }
};

module.exports = {
  addTerm,
  bulkInsertTerm,
  findAllTerm,
  getTerm,
  getTermCount,
  updateTerm,
  bulkUpdateTerm,
  partialUpdateTerm,
  softDeleteTerm,
  softDeleteManyTerm,
  softReactivateTerm,
  softReactivateManyTerm,
  deleteTerm,
  deleteManyTerm,
};