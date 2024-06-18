let mongoose = require('../connection.js');
const mongoosePaginate = require('mongoose-paginate-v2');
const idValidator = require('mongoose-id-validator');
const convertObjectToEnum = require('../../../utils/convertObjectToEnum.js');
const { formatDate } = require('../../../utils/date.js');
const { APPLICATION_STATUS } = require('../../../constants/postConstant.js');
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
  applicationId: {
    type: String,
    required: true,
    default: uuidv4
  },
  seekerId: {
    type: Schema.Types.ObjectId,
    ref: 'seeker'
  },
  postId: { 
    type: Number,
  },
  postMId: { 
    type: Schema.Types.ObjectId,
    ref: 'post'
  },
  applicationDate: { 
    type: String, 
    required: true,
    immutable: true,
    default: formatDate( new Date() ),
  },
  applicationStatus: { 
    type: Number, 
    enum: convertObjectToEnum(APPLICATION_STATUS),
    required: true,
    default: 1
  },
  unread: { 
    type: Boolean, 
    default: true,
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

schema.method('toJSON', function () {
  const {
    _id, __v, createdAt, updatedAt, ...object
  } = this.toObject();
  return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

const appliedPost = mongoose.model('appliedPost', schema);
module.exports = appliedPost;
