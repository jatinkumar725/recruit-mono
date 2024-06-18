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
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   references: { 
  //     type: [Schema.Types.ObjectId], 
  //     refPath: 'model_type' 
  //   },
  // },
  userId: { type: String, },
  model_type: { 
    type: String, 
    enum: ['Seeker', 'Recruiter', 'User'], 
    required: true 
  },
  uploadName: { 
    type: String,
    required: true
  },
  uploadPath: { 
    type: String,
    required: true,
  },
  uploadType: { 
    type: Number,
    required: true,
  },
  fileSize: { 
    type: Number,
    required: true,
  },
  fileFormat: { 
    type: String,
    required: true,
  },
  isAvailable: { type:Boolean },
  createdAt: { type:Date },
  updatedAt: { type:Date },
  addedBy: {
    type:Schema.Types.ObjectId,
    ref:'user'
  },
  updatedBy: {
    type:Schema.Types.ObjectId,
    ref:'user'
  },
  isDeleted: { type:Boolean }
}
,{ 
  timestamps: { 
    createdAt: 'createdAt', 
    updatedAt: 'updatedAt' 
  } 
}
);
schema.pre('save', async function (next) {
  this.isDeleted = false;
  this.isAvailable = true;
  next();
});
schema.pre('insertMany', async function (next, docs) {
  if (docs && docs.length){
    for (let index = 0; index < docs.length; index++) {
      const element = docs[index];
      element.isDeleted = false;
      element.isAvailable = true;
    }
  }
  next();
});

schema.method('toJSON', function () {
  const object = this.toObject({ virtuals: true });
  return {
    fileFormat: object.fileFormat,
    fileSize: object.fileSize,
    uploadName: object.uploadName,
    uploadPath: object.uploadPath,
    isAvailable: object.isAvailable,
    createdAt: object.createdAt,
    updatedAt: object.updatedAt,
  };
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

const upload = mongoose.model('upload',schema);
module.exports = upload;