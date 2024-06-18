const mongoDbService = (Model) => {
  // for create one as well as create many
  const create = (data) => new Promise((resolve, reject) => {
    Model.create(data, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });

  // update single document that will return updated document
  const updateOne = (filter, data, options = { new: true }) => new Promise((resolve, reject) => {
    Model.findOneAndUpdate(filter, data, options, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });

  // delete single document that will return updated document
  const deleteOne = (filter, options = { new: true }) => new Promise((resolve, reject) => {
    Model.findOneAndDelete(filter, options, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });

  // update multiple documents and returns count or updatedDocs based on isCountOnly flag
  const updateMany = (filter, data, isCountOnly = true) => new Promise((resolve, reject) => {
    Model.updateMany(filter, data, (error, result) => {
      if (error) reject(error);
      else {
        if (isCountOnly) {
          resolve(result.modifiedCount);
        } else {
          resolve(result);
        }
      }
    });
  });

  // delete multiple documents and returns count
  const deleteMany = (filter, data) => new Promise((resolve, reject) => {
    Model.deleteMany(filter, data, (error, result) => {
      if (error) reject(error);
      else resolve(result.deletedCount);
    });
  });

  // find single document by query
  const findOne = (filter, options, projections = []) => new Promise((resolve, reject) => {
    Model.findOne(filter, projections, options, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });

  // find multiple documents
  const findMany = (filter, options, projection={}) => new Promise((resolve, reject) => {
    Model.find(filter, projection, options,(error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });

  // count documents
  const count = (filter) => new Promise((resolve, reject) => {
    Model.countDocuments(filter, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });

  // find documents with pagination
  const paginate = (filter, options) => new Promise((resolve, reject) => {
    Model.paginate(filter, options, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });

  const startSession = async () => {
    return await Model.startSession();
  };

  const endSession = async (session) => {
    return await session.endSession();
  };

  const startTransaction = async (session) => {
    return await session.startTransaction();
  };

  const commitTransaction = async (session) => {
    return await session.commitTransaction();
  };

  const abortTransaction = async (session) => {
    return await session.abortTransaction();
  };

  // Save a document
  const save = (document) => new Promise((resolve, reject) => {
    document.save((error, savedDocument) => {
      if (error) reject(error);
      else resolve(savedDocument);
    });
  });

  return Object.freeze({
    create,
    updateOne,
    updateMany,
    deleteOne,
    deleteMany,
    findOne,
    findMany,
    count,
    paginate,
    startSession,
    startTransaction,
    endSession,
    commitTransaction,
    abortTransaction,
    save,
  });
};

module.exports = mongoDbService;
