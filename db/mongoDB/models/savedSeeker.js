let mongoose = require('../connection.js');
const mongoosePaginate = require('mongoose-paginate-v2');
const idValidator = require('mongoose-id-validator');
const { formatDate } = require('../../../utils/date.js');
const { v4: uuidv4 } = require('uuid');

const modelCustomLabels = {
  totalDocs: 'itemCount',
  docs: 'data',
  limit: 'perPage',
  page: 'currentPage',
  nextPage: 'next',
  prevPage: 'prev',
  totalPages: 'pageCount',
  pagingCounter: 'slNo',
  meta: 'paginator',
};
mongoosePaginate.paginate.options = { customLabels: modelCustomLabels };
const Schema = mongoose.Schema;
const schema = new Schema({
  sId: {
    type: String,
    required: true,
    default: uuidv4
  },
  seekerId: {
    type: Schema.Types.ObjectId,
    ref: 'seeker'
  },
  recruiterId: {
    type: Schema.Types.ObjectId,
    ref: 'recruiter'
  },
  savedDate: { 
    type: String, 
    required: true,
    immutable: true,
    default: formatDate( new Date() ),
  },
  isActive: { type: Boolean },
  isDeleted: { type: Boolean },
  createdAt: { type: Date },
  updatedAt: { type: Date },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});
schema.pre('save', async function (next) {
  this.isDeleted = false;
  this.isActive = true;

  next();
});
schema.pre('insertMany', async function (next, docs) {
  if (docs && docs.length) {
    for (let index = 0; index < docs.length; index++) {
      const element = docs[index];
      element.isDeleted = false;
      element.isActive = true;
    }
  }
  next();
});

schema.method('toJSObject', function () {
  const {
    _id, __v, ...object
  } = this.toObject({ virtuals: true });
  delete object.password;
  return object;
});

schema.method('toJSON', function () {
  const {
    _id, __v, createdAt, updatedAt, ...object
  } = this.toObject();
  return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

const savedSeeker = mongoose.model('savedSeeker', schema);
module.exports = savedSeeker;