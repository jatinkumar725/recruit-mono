let mongoose = require('../connection.js');
const mongoosePaginate = require('mongoose-paginate-v2');
const idValidator = require('mongoose-id-validator');
const convertObjectToEnum = require('../../../utils/convertObjectToEnum');
const { USER_TYPES } = require('../../../constants/authConstant.js');
const bcrypt = require('bcrypt');
const authConstantEnum = require('../../../constants/authConstant.js');
const crypto = require('crypto');
const generateRandomNumber = require('./../../../utils/generateRandomNumber');
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
  profileId: {
    type: String,
    unique: true,
    required: true,
    default: crypto.randomBytes(64).toString('hex')
  },
  userId: {
    type: Number,
    unique: true,
    required: true,
    default: generateRandomNumber(authConstantEnum.USER_ID_LENGTH)
  },
  username: { 
    type: String,
    unique: true,
  },
  password: { 
    type: String,
    required: true
  },
  email: { 
    type: String,
    unique: true,
    required: true
  },
  name: { 
    type: String,
    required: true
  },
  company: { 
    type: String,
    required: true
  },
  roleAtCompany: { 
    type: String ,
    required: true
  },
  companySize: { type: Number },
  industry: { 
    type: String,
    required: true
  },
  // Industry
  // Company Size
  location: [{
    _id: false,
    locationId: {
      type: String,
      // unique: true,
      required: true,
      default: uuidv4
    },
    address: { 
      type: String,
      required: true,
      trim: true,
    },
    city: { 
      type: String,
      required: true,
      trim: true,
    },
    pincode: { 
      type: String, // Number
      required: true,
      // trim: true,
    }
  }],
  userType: {
    type: Number,
    enum: convertObjectToEnum(USER_TYPES),
    required: true
  },
  mobile: { 
    type: String,
    unique: true,
    required: true
  },
  isActive: { type: Boolean },
  isDeleted: { type: Boolean },
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
  isPrimaryEmailVerified: { 
    type: Boolean,
    default: false
  },
  isPrimaryMobileNoVerified: { 
    type: Boolean,
    default: false
  },
  isKYCDocsUploaded: {
    type: Boolean,
    default: false
  },
  isProfileVerified: {
    type: Boolean,
    default: false
  },
  // totalSavedCandidates: {
  //   type: Number,
  //   default: 0
  // },
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
  
  // Set default values if they are not provided
  if (this.isNew || this.isModified('password')) {
    // Only hash the password if it's provided and modified
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 8);
    }
  }

  if (!this.username) {
    this.username = this.email;
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
  } = this.toObject();
  delete object.password;
  return object;
});

// Method to project specific fields based on an array of field names
schema.method('projectFields', function (level) {

  const projection = {};

  const fields = authConstantEnum.USER_QUERY_TYPES[authConstantEnum.USER_TYPES.Recruiter][level];

  // Iterate over the specified array of field names
  fields.forEach(field => {
    if (this[field] !== undefined) {
      // Add the field to the projection object
      projection[field] = this[field];
    }
  });

  return projection;
});

schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

const recruiter = mongoose.model('recruiter', schema);
module.exports = recruiter;