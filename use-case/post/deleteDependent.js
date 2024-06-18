const response = require('../../utils/response');

const getDependencyCount = ({
  postDb, appliedPostDb
}) => async (filter) => {
  let post = await postDb.findMany(filter);
  if (post.length) {
    let postIds = post.map((obj) => obj.id);

    const appliedPostFilter = { '$or': [{ postId: { '$in': postIds } }] };
    const appliedPostCnt = await appliedPostDb.count(appliedPostFilter);
    let result = { appliedPost: appliedPostCnt, };
    return response.success({
      message: 'No of Dependency found',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency found',
      data: { post: 0 }
    });
  }
};

const deleteWithDependency = ({
  postDb, appliedPostDb
}) => async (filter) => {
  let post = await postDb.findMany(filter);
  if (post.length) {
    let postIds = post.map((obj) => obj.id);

    const appliedPostFilter = { '$or': [{ postId: { '$in': postIds } }] };
    const appliedPostCnt = await appliedPostDb?.deleteMany(appliedPostFilter);

    let deleted = (await postDb.deleteMany(filter));
    let result = { appliedPost: appliedPostCnt, };
    return response.success({
      message: 'No of Dependency deleted',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency deleted',
      data: { post: 0 }
    });
  }
};

const softDeleteWithDependency = ({
  postDb, appliedPostDb
}) => async (filter, updateBody) => {
  let post = await postDb.findMany(filter);
  if (post.length) {
    let postIds = post.map((obj) => obj.id);

    const appliedPostFilter = { '$or': [{ postId: { '$in': postIds } }] };
    const appliedPostCnt = (await appliedPostDb.updateMany(appliedPostFilter, updateBody));
    let updated = (await postDb.updateMany(filter, updateBody));
    let result = { appliedPost: appliedPostCnt, };
    return response.success({
      message: 'No of Dependency deleted',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency deleted',
      data: { post: 0 }
    });
  }
};
module.exports = {
  getDependencyCount,
  deleteWithDependency,
  softDeleteWithDependency
};
