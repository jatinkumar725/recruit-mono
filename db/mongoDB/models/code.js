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
    userId: {
        type: Schema.Types.ObjectId,
        references: {
            type: [Schema.Types.ObjectId],
            refPath: 'model_type'
        },
    },
    model_type: {
        type: String,
        enum: ['Seeker', 'Recruiter', 'User'],
        required: true
    },
    code: { type: String },
    codeExpirationTime: { type: Date },
    isCodeExpired: {
        type: Boolean,
        default: false
    },
    isActive: { type: Boolean },
    addedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    isDeleted: { type: Boolean }
}, {
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

const code = mongoose.model('code', schema);
module.exports = code;