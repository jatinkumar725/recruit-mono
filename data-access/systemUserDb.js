let SystemUser = require('../db/mongoDB/models/systemUser');
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
} = require('../db/mongoDB/dbService')(SystemUser);

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
};