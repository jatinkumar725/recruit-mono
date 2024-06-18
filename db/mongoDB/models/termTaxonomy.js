let mongoose = require('../connection.js');
const mongoosePaginate = require('mongoose-paginate-v2');
const idValidator = require('mongoose-id-validator');
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
  termTaxonomyId: {
    type: Number,
    immutable: true,
    unique: true,
  },
  termId: {
    type: Number,
    immutable: true
  },
  taxonomy: {
    type: String,
    required: true
  },
  parentId: {
    type: Number,
    default: 0,
  },
  count: {
    type: Number,
    default: 0
  },
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: 'systemUser',
    immutable: true
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'systemUser'
  },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  isActive: { type: Boolean },
  isDeleted: { type: Boolean }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

// Apply auto-increment to termTaxonomyId
schema.plugin(AutoIncrement.plugin, { model: 'termTaxonomy', field: 'termTaxonomyId', startAt: 1 });

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
    _id, __v, addedBy, updatedBy, createdAt, updatedAt, isActive, isDeleted, ...object
  } = this.toObject();
  return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

const termTaxonomy = mongoose.model('termTaxonomy', schema);
module.exports = termTaxonomy;