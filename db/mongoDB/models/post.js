let mongoose = require('../connection.js');
const mongoosePaginate = require('mongoose-paginate-v2');
const idValidator = require('mongoose-id-validator');
const convertObjectToEnum = require('../../../utils/convertObjectToEnum.js');
const { JOB_TYPES, POST_ID_LENGTH, POST_QUERY_TYPE, EMPLOYMENT_TYPES, POST_ID_START_AT } = require('../../../constants/postConstant.js');
const { formatDate, calculateExpirationDate } = require('../../../utils/date.js');
const generateRandomNumber = require('../../../utils/generateRandomNumber.js');
const { v4: uuidv4 } = require('uuid');
const { CLIENT, ROUTES } = require('../../../constants/routeConstant.js');
const { pluckList } = require('../../../utils/objects.js');
const { generatePostPermalink } = require('../../../utils/permaLink.js');
const AutoIncrement = require('mongoose-auto-increment');

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
  postId: {
    type: Number,
    immutable: true,
    unique: true,
    // default: generateRandomNumber(POST_ID_LENGTH)
  },
  title: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  shortDescription: { type: String },
  employmentType: {
    type: Number,
    enum: convertObjectToEnum(EMPLOYMENT_TYPES),
    required: true
  },
  jobType: {
    type: Number,
    enum: convertObjectToEnum(JOB_TYPES),
    required: true
  },
  salaryDetails: {
    label: {
      type: String,
      trim: true,
      required: true,
    },
    minimum: {
      type: Number,
      required: true,
      default: 0
    },
    maximum: {
      type: Number,
      required: true,
      default: 0
    },
    hideSalary: {
      type: Boolean,
      default: false
    },
  },
  minimumExperience: {
    type: Number,
    required: true,
    default: 0
  },
  maximumExperience: {
    type: Number,
    required: true,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  totalOpening: {
    type: Number,
    required: true,
    default: 1
  },
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: 'recruiter'
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'recruiter'
  },
  totalApplicants: {
    type: Number,
    default: 0
  },
  postDate: {
    type: String,
    trim: true,
    required: true,
    default: formatDate(new Date())
  },
  industry: {
    type: String,
    trim: true,
    required: true,
  },
  designation: {
    type: String,
    trim: true,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
  location: [{
    _id: false,
    locationId: {
      type: String,
      unique: true,
      required: true,
      default: uuidv4
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
  company: {
    type: String,
    trim: true,
    required: true,
  },
  companyDescription: {
    type: String,
    required: true,
  },
  expireAfter: {
    type: String,
    trim: true,
    required: true,
  },
  expireAfterDate: {
    type: Date,
  },
  isActive: { type: Boolean },
  isDeleted: { type: Boolean },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  // Experience ( removed from taxonomy )
  education: {
    reqUg: {
      type: Boolean,
      required: true,
      default: false,
    },
    ug: {
      type: String,
      trim: true,
    },
    pg: {
      type: String,
      trim: true,
    },
    ppg: {
      type: String,
      trim: true,
    }
  },
  jdUrl: {
    type: String,
    required: true,
    trim: true,
    default: function () {
      const staticUrl = generatePostPermalink(this);
      return staticUrl;
    }
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

// Apply auto-increment to postId
schema.plugin(AutoIncrement.plugin, { model: 'post', field: 'postId', startAt: POST_ID_START_AT });

schema.pre('save', async function (next) {
  this.isDeleted = false;
  this.isActive = true;

  this.expireAfterDate = calculateExpirationDate(this.createdAt, this.expireAfter);

  next();
});

schema.pre('findOneAndUpdate', async function (next) {
  try {
    const filter = this.getFilter();
    const docToUpdate = await this.model.findOne(filter);
    if (!docToUpdate) {
      throw new Error('Document not found');
    }

    const update = this.getUpdate();
    if (update.expireAfter && !update.expireAfterDate) {
      update.expireAfterDate = calculateExpirationDate(docToUpdate.createdAt, update.expireAfter);
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

schema.post('findOneAndUpdate', async function (doc, next) {
  try {

    // Access the updated document using `this` within the hook
    const existedDoc = await this.model.findOne(this.getQuery());

    // Ensure required fields are populated from the original document if missing in the update
    const populatedDoc = {
      postId: doc?.postId || existedDoc.postId,
      title: doc?.title || existedDoc.title,
      company: doc?.company || existedDoc.company,
      location: doc?.location || existedDoc.location,
    };

    // Generate permalink URL using the populated document
    const staticUrl = generatePostPermalink(populatedDoc);
    doc.jdUrl = staticUrl;
    await doc.save();

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
      if (element.expireAfter && !element.expireAfterDate) {
        element.expireAfterDate = calculateExpirationDate(element.createdAt, element.expireAfter);
      }
    }
  }
  next();
});

schema.method('toVObject', function () {
  const {
    _id, __v, createdAt, ...object
  } = this.toObject({ virtuals: true });
  return object;
});

schema.method('toJSON', function () {
  const {
    _id, __v, createdAt, ...object
  } = this.toObject();
  return object;
});

// Method to generate static URL and attach to document
schema.methods.attachStaticUrl = function (clientUrl, routes) {
  const urlSlug = `${this.title}${this.company}${this.location.slice(0, 2).map(loc => loc.city).join('+')}${this.postId}`;
  this.staticUrl = `/${urlSlug}`;

  return this;
};

// Method to project specific fields based on an array of field names
schema.method('projectFields', function (level) {
  const projection = {};

  const fields = POST_QUERY_TYPE[level];

  const {
    company,
    companyDescription,
    _id,
    __v,
    createdAt,
    ...object
  } = this.toJSON();

  // Check if companyDetails object needs to be included in projection
  if (fields.includes('company') || fields.includes('companyDescription')) {
    projection.companyDetails = {};
    
    // Handle company field
    if (fields.includes('company') && company) {
      projection.companyDetails.name = company;
    }
  
    // Handle companyDescription field
    if (fields.includes('companyDescription') && companyDescription) {
      projection.companyDetails.details = companyDescription;
    }
  }


  // Handle staticUrl field
  if (fields.includes('staticUrl') && object.jdUrl) {
    projection.jdUrl = `${CLIENT}${object.jdUrl}`;
  } 
  
  // else {
  //   projection.jdUrl = null;
  // }

  // Iterate over the specified array of field names
  fields.forEach(field => {
    if (object[field] !== undefined) {
      // Add the field to the projection object
      projection[field] = object[field];
    }
  });

  return projection;
});

schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

const post = mongoose.model('post', schema);
module.exports = post;