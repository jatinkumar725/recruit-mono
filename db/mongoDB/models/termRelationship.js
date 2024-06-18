let mongoose = require('../connection.js');
const mongoosePaginate = require('mongoose-paginate-v2');
const idValidator = require('mongoose-id-validator');

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
  objectId: { 
    type: Number,
    required: true
  },
  model_type: {
    type: String,
    required: true,
    enum: ['Recruiter', 'System_User', 'Seeker', 'Post'],
  },
  termTaxonomyId: { 
    type: Number,
  },
  termOrder: { 
    type: Number,
    default: 0
  },
  objectGroup: { type: String },
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: 'systemUser',
    immutable: true
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'systemUser'
  },
  createdAt: { 
    type: Date,
    immutable: true
  },
  updatedAt: { type: Date },
  isActive: { type: Boolean },
  isDeleted: { type: Boolean }
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

const termRelationship = mongoose.model('termRelationship', schema);
module.exports = termRelationship;
