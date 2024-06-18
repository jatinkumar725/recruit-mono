let Term = require('../db/mongoDB/models/term');
let { 
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
  endSession,
  startTransaction,
  abortTransaction,
} = require('../db/mongoDB/dbService')(Term);

module.exports = {
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
  endSession,
  startTransaction,
  abortTransaction,
};