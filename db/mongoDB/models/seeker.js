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
const { GENDER_TYPES, MARITAL_STATUS_TYPES, RELIGION_TYPES, NOTICE_PERIOD_TYPES } = require('../../../constants/userConstant.js');
const { JOB_TYPES } = require('../../../constants/postConstant.js');
const { generateSeekerProfilePermalink } = require('../../../utils/permaLink.js');
const { CLIENT } = require('../../../constants/routeConstant.js');
const { formatDate, formatDateTimeAgo } = require('../../../utils/date.js');

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
  headline: {
    type: String,
    maxLength: 250,
    trim: true,
  },
  overview: {
    type: String,
    maxLength: 1000,
    trim: true,
  },
  onlineProfiles: [{
    _id: false,
    ogId: { 
      type: String,
      // unique: true,
      required: true,
      default: uuidv4
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true
    }
  }],
  projects: [{
    _id: false,
    projectId: { 
      type: String,
      // unique: true,
      required: true,
      default: uuidv4
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true
    },
    imageURL: { type: String, }
  }],
  profileId: { 
    type: String,
    unique: true,
    required: true,
    default: crypto.randomBytes(16).toString('hex')
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
    // required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: { 
    type: String,
    required: true,
    trim: true,
  },
  addedBy: {
    type: Schema.Types.ObjectId,
    references: {
      type: [Schema.Types.ObjectId],
      refPath: 'model_type'
    },
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    references: {
      type: [Schema.Types.ObjectId],
      refPath: 'model_type'
    },
  },
  model_type: {
    type: String,
    // enum: ['Recruiter', 'System_User'],
  },
  userType: {
    type: Number,
    // enum: convertObjectToEnum(USER_TYPES),
    required: true
  },
  mobile: { type: String, },
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
  skills: {
    type: String,
    trim: true,
  },
  education: [{
    _id: false,
    educationId: {
      type: String,
      // unique: true,
      required: true,
      default: uuidv4
    },
    educationType: { 
      type: String,
      required: true,
      trim: true,
    },
    specialisation: { 
      type: String,
      trim: true,
    },
    examBoard: { 
      type: String,
      trim: true,
    },
    institute: { 
      type: String,
      trim: true,
    },
    startYear: { 
      type: Number,
      required: true,
    },
    endYear: { type: Number },
    description: { 
      type: String, 
      trim: true,
    },
  }],
  employment: [{
    _id: false,
    employmentId: {
      type: String,
      // unique: true,
      required: true,
      default: uuidv4
    },
    isYourCurrentCompany: { 
      type: Boolean,
      default: true,
    },
    company: { 
      type: String,
      required: true,
      trim: true,
    },
    designation: { 
      type: String,
      required: true,
      trim: true,
    },
    skills: { 
      type: String,
      required: true,
      trim: true,
    },
    startDate: { 
      type: String,
      required: true,
    },
    endDate: { 
      type: String,
    },
    description: { 
      type: String, 
      trim: true,
    },
  }],
  currentSalary: { type: String },
  experience: {
    year: {
      type: String,
    },
    month: {
      type: String,
    }
  },
  noticePeriod: {
    type: String,
    // enum: convertObjectToEnum(NOTICE_PERIOD_TYPES),
  },
  birthDate: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    // enum: convertObjectToEnum(GENDER_TYPES),
  },
  maritalStatus: {
    type: String,
    // enum: convertObjectToEnum(MARITAL_STATUS_TYPES),
  },
  religion: {
    type: String,
    // enum: convertObjectToEnum(RELIGION_TYPES),
  },
  isActive: { type: Boolean },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  isDeleted: { type: Boolean },
  isPrimaryEmailVerified: { 
    type: Boolean,
    default: false
  },
  isPrimaryMobileNoVerified: {
    type: Boolean,
    default: false
  },
  resetPasswordLink: {
    code: String,
    expireTime: Date
  },
  loginRetryLimit: {
    type: Number,
    default: 0
  },
  industry: { 
    type: String,
    trim: true,
  },
  designation: { 
    type: String,
    trim: true,
  },
  prefLocation: [{
    _id: false,
    locationId: {
      type: String,
      required: true,
      default: uuidv4
    },
    city: { 
      type: String,
      required: true,
      trim: true,
    },
  }],
  prefEmploymentType: [{ 
    type: String,
    // enum: convertObjectToEnum(JOB_TYPES, 'keys'),
  }],
  prefJobType: [{ 
    type: String,
    // enum: convertObjectToEnum(JOB_TYPES, 'keys'),
  }],
  expectedCtc: { type: String },
  staticUrl: { 
    type: String,
    trim: true,
    unique: true,
    default: function () {
      const staticUrl = generateSeekerProfilePermalink(this);
      return staticUrl;
    }
  },
  totalSearchAppearancesCount: {
    type: Number,
    default: 0
  },
  totalSearchAppearancesLatestDate: {
    type: Date,
    default: null
  },
  lastModDate: {
    type: String,
    trim: true,
    default: formatDate(new Date()),
  },
  lastModAgo: {
    type: String
  },
  loginReactiveTime: { type: Date },
  ssoAuth: { googleId: { type: String } }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});
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

  const currentDate = formatDate(new Date());

  // Set lastModDate to current date
  this.lastModDate = currentDate;

  // Update lastModAgo with the time difference
  this.lastModAgo = formatDateTimeAgo(currentDate);

  next();
});

schema.post('findOneAndUpdate', async function (doc, next) {
  try {
    const staticUrl = generateSeekerProfilePermalink(doc);
    doc.staticUrl = staticUrl;

    // Update lastModDate to current date
    doc.lastModDate = formatDate(new Date());

    doc.lastModAgo = formatDateTimeAgo(doc.lastModDate);
    
    doc.save();
    next();
  } catch (error) {
    next(error);
  }
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
    _id, __v, ssoAuth, ...object
  } = this.toObject({ virtuals: true });
  delete object.password;
  return object;
});

schema.method('toJSON', function () {
  const {
    _id, __v, ssoAuth, isActive, isDeleted, ...object
  } = this.toObject();

  delete object.password;
  return object;
});

// Method to project specific fields based on an array of field names
schema.method('projectFields', function (level) {

  const projection = {};
  
  const fields = authConstantEnum.USER_QUERY_TYPES[USER_TYPES.Seeker][level];

  const jsonThis = this.toJSON();

  // Iterate over the specified array of field names
  fields.forEach(field => {
    if (jsonThis[field] !== undefined) {
      // Add the field to the projection jsonThis
      projection[field] = jsonThis[field];
    }
  });

  // Handle staticUrl field
  if (fields.includes('staticUrl') && jsonThis.staticUrl) {
    projection.staticUrl = `${CLIENT}${jsonThis.staticUrl}`;
  } else {
    projection.staticUrl = null;
  }

  return projection;
});

schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

const seeker = mongoose.model('seeker', schema);
module.exports = seeker;
