let mongoose = require('../connection.js');
const mongoosePaginate = require('mongoose-paginate-v2');
const idValidator = require('mongoose-id-validator');
const { USER_TYPES } = require('../../../constants/authConstant');

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
  userId: {
    type: Schema.Types.ObjectId,
    references: { 
      type: [Schema.Types.ObjectId], 
      refPath: 'model_type' 
    },
  },
  model_type: { 
    type: String, 
    enum: Object.keys(USER_TYPES), 
    required: true 
  },
  accessToken: { type: String },
  refreshToken: { type: String },
  tokenExpirationTime: { type: Date },
  isTokenExpired: {
    type: Boolean,
    default: false
  },
  isActive: { type: Boolean },
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: 'systemUser'
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'systemUser'
  },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  isDeleted: { type: Boolean }
}
  , {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
);
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
    _id, __v, ...object
  } = this.toObject({ virtuals: true });
  object.id = _id;
  return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

const userTokens = mongoose.model('userTokens', schema);
module.exports = userTokens;
