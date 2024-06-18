let mongoose = require('../connection.js');
const mongoosePaginate = require('mongoose-paginate-v2');
const idValidator = require('mongoose-id-validator');
const convertObjectToEnum = require('../../../utils/convertObjectToEnum.js');
const { USER_TYPES } = require('../../../constants/authConstant.js');
const bcrypt = require('bcrypt');
const authConstantEnum = require('../../../constants/authConstant.js');
const crypto = require('crypto');
const generateRandomNumber = require('./../../../utils/generateRandomNumber');

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
  profileId: { type: String },
  userId: { type: String },
  username: { type: String },
  password: { type: String },
  email: { type: String },
  name: { type: String },
  isActive: { type: Boolean },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: 'systemUser'
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'systemUser'
  },
  permanentAddress: [{
    _id: false,
    pincode: { type: String },
    address1: { type: String },
    address2: { type: String },
    landmark: { type: String },
    city: { type: String },
    isDefault: { type: Boolean },
    state: { type: String },
    addressType: { type: String },
    addressNo: { type: Number }
  }],
  userType: {
    type: Number,
    enum: convertObjectToEnum(USER_TYPES),
    required: true
  },
  mobile: { type: String },
  isDeleted: { type: Boolean },
  resetPasswordLink: {
    code: String,
    expireTime: Date
  },
  loginRetryLimit: {
    type: Number,
    default: 0
  },
  loginReactiveTime: { type: Date },
},{
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
);
schema.pre('save', async function (next) {
  this.isDeleted = false;
  this.isActive = true;
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  if (!this.username) {
    this.username = this.email;
  }

  // Generate profileId if it doesn't exist
  if (!this.profileId) {
    this.profileId = crypto.randomBytes(32).toString('hex');
  }

  // Generate userId if it doesn't exist
  if (!this.userId) {
    this.userId = generateRandomNumber(9);
  }

  next();
});
schema.pre('insertMany', async function (next, docs) {
  if (docs && docs.length) {
    for (let index = 0; index < docs.length; index++) {
      const element = docs[index];
      element.isDeleted = false;
      element.isActive = true;

      if (!element.username) {
        element.username = element.email;
      }

      // Generate profileId if it doesn't exist
      if (!element.profileId) {
        element.profileId = crypto.randomBytes(32).toString('hex');
      }

      // Generate userId if it doesn't exist
      if (!element.userId) {
        element.userId = generateRandomNumber(9);
      }
    }
  }
  next();
});

schema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};
schema.method('toJSObject', function () {
  const {
    _id, __v, ...object
  } = this.toObject({ virtuals: true });
  delete object.password;
  return object;
});
schema.method('toJSON', function () {
  const {
    _id, __v, ...object
  } = this.toObject({ virtuals: true });
  object.id = _id;
  delete object.password;
  return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

const user = mongoose.model('systemUser', schema);
module.exports = user;
