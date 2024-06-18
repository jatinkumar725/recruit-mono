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
  termId: { 
    type: Number,
    immutable: true,
    unique: true,
  },
  name: { 
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  alias: { type: String },
  termGroup: { 
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

// Apply auto-increment to termId
schema.plugin(AutoIncrement.plugin, { model: 'term', field: 'termId', startAt: 1 });

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
  const object = this.toObject();
  const returnTermObject = {
    id: object.termId,
    name: object.name,
    alias: object.alias,
  };
  return returnTermObject;
});

schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

const term = mongoose.model('term', schema);
module.exports = term;