const response = require('../../utils/response');

const getDependencyCount = ({
  userDb, userTokensDb, roleDb, projectRouteDb, routeRoleDb, userRoleDb, uploadDb, // postDb
}) => async (filter) => {
  let user = await userDb.findMany(filter);
  if (user.length) {
    let userIds = user.map((obj) => obj.id);

    const userFilter = { '$or': [{ addedBy: { '$in': userIds } }, { updatedBy: { '$in': userIds } }] };
    const userCnt = await userDb.count(userFilter);

    const userTokensFilter = { '$or': [{ userId: { '$in': userIds } }, { addedBy: { '$in': userIds } }, { updatedBy: { '$in': userIds } }] };
    const userTokensCnt = await userTokensDb.count(userTokensFilter);

    const roleFilter = { '$or': [{ addedBy: { '$in': userIds } }, { updatedBy: { '$in': userIds } }] };
    const roleCnt = await roleDb.count(roleFilter);

    const projectRouteFilter = { '$or': [{ addedBy: { '$in': userIds } }, { updatedBy: { '$in': userIds } }] };
    const projectRouteCnt = await projectRouteDb.count(projectRouteFilter);

    const routeRoleFilter = { '$or': [{ addedBy: { '$in': userIds } }, { updatedBy: { '$in': userIds } }] };
    const routeRoleCnt = await routeRoleDb.count(routeRoleFilter);

    const userRoleFilter = { '$or': [{ userId: { '$in': userIds } }, { addedBy: { '$in': userIds } }, { updatedBy: { '$in': userIds } }] };
    const userRoleCnt = await userRoleDb.count(userRoleFilter);

    const uploadsFilter = { '$or': [{ userId: { '$in': userIds } }, { addedBy: { '$in': userIds } }, { updatedBy: { '$in': userIds } }] };
    const uploadsCnt = (await uploadDb.count(uploadsFilter));

    // Delete user job post if its recruiter
    // const postsFilter = { '$or': [{ addedBy: { '$in': userIds } }] };
    // const postsCnt = (await postDb?.count(postsFilter));

    let result = {
      user: userCnt + 1,
      userTokens: userTokensCnt,
      role: roleCnt,
      projectRoute: projectRouteCnt,
      routeRole: routeRoleCnt,
      userRole: userRoleCnt,
      uploads: uploadsCnt,
      posts: postsCnt
    };
    return response.success({
      message: 'No of Dependency found',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency found',
      data: { user: 0 }
    });
  }
};

const deleteWithDependency = ({
  userDb, userTokensDb, roleDb, projectRouteDb, routeRoleDb, userRoleDb, uploadDb, // postDb
}) => async (filter) => {
  let user = await userDb.findMany(filter);
  if (user.length) {
    let userIds = user.map((obj) => obj.id);

    const userFilter = { '$or': [{ addedBy: { '$in': userIds } }, { updatedBy: { '$in': userIds } }] };
    const userCnt = (await userDb.deleteMany(userFilter));

    const userTokensFilter = { '$or': [{ userId: { '$in': userIds } }, { addedBy: { '$in': userIds } }, { updatedBy: { '$in': userIds } }] };
    const userTokensCnt = (await userTokensDb?.deleteMany(userTokensFilter));

    const roleFilter = { '$or': [{ addedBy: { '$in': userIds } }, { updatedBy: { '$in': userIds } }] };
    const roleCnt = (await roleDb?.deleteMany(roleFilter));

    const projectRouteFilter = { '$or': [{ addedBy: { '$in': userIds } }, { updatedBy: { '$in': userIds } }] };
    const projectRouteCnt = (await projectRouteDb?.deleteMany(projectRouteFilter));

    const routeRoleFilter = { '$or': [{ addedBy: { '$in': userIds } }, { updatedBy: { '$in': userIds } }] };
    const routeRoleCnt = (await routeRoleDb?.deleteMany(routeRoleFilter));

    const userRoleFilter = { '$or': [{ userId: { '$in': userIds } }, { addedBy: { '$in': userIds } }, { updatedBy: { '$in': userIds } }] };
    const userRoleCnt = (await userRoleDb?.deleteMany(userRoleFilter));

    const uploadsFilter = { '$or': [{ userId: { '$in': userIds } }, { addedBy: { '$in': userIds } }, { updatedBy: { '$in': userIds } }] };
    const uploadsCnt = (await uploadDb?.deleteMany(uploadsFilter));
    
    // Delete user job post if its recruiter
    // const postsFilter = { '$or': [{ addedBy: { '$in': userIds } }] };
    // const postsCnt = (await postDb?.deleteMany(postsFilter));

    let deleted = (await userDb.deleteMany(filter));
    let result = {
      user: userCnt + deleted,
      userTokens: userTokensCnt,
      role: roleCnt,
      projectRoute: projectRouteCnt,
      routeRole: routeRoleCnt,
      userRole: userRoleCnt,
      uploads: uploadsCnt,
      // posts: postsCnt,
    };
    return response.success({
      message: 'No of Dependency deleted',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency deleted',
      data: { user: 0 }
    });
  }
};

const softDeleteWithDependency = ({
  userDb, userTokensDb, roleDb, projectRouteDb, routeRoleDb, userRoleDb, // postDb
}) => async (filter, updateBody) => {
  let user = await userDb.findMany(filter);
  if (user.length) {
    let userIds = user.map((obj) => obj.id);

    const userFilter = { '$or': [{ addedBy: { '$in': userIds } }, { updatedBy: { '$in': userIds } }] };
    const userCnt = (await userDb.updateMany(userFilter, updateBody));

    const userTokensFilter = { '$or': [{ userId: { '$in': userIds } }, { addedBy: { '$in': userIds } }, { updatedBy: { '$in': userIds } }] };
    const userTokensCnt = (await userTokensDb.updateMany(userTokensFilter, updateBody));

    const roleFilter = { '$or': [{ addedBy: { '$in': userIds } }, { updatedBy: { '$in': userIds } }] };
    const roleCnt = (await roleDb.updateMany(roleFilter, updateBody));

    const projectRouteFilter = { '$or': [{ addedBy: { '$in': userIds } }, { updatedBy: { '$in': userIds } }] };
    const projectRouteCnt = (await projectRouteDb.updateMany(projectRouteFilter, updateBody));

    const routeRoleFilter = { '$or': [{ addedBy: { '$in': userIds } }, { updatedBy: { '$in': userIds } }] };
    const routeRoleCnt = (await routeRoleDb.updateMany(routeRoleFilter, updateBody));

    const userRoleFilter = { '$or': [{ userId: { '$in': userIds } }, { addedBy: { '$in': userIds } }, { updatedBy: { '$in': userIds } }] };
    const userRoleCnt = (await userRoleDb.updateMany(userRoleFilter, updateBody));

    const uploadsFilter = { '$or': [{ userId: { '$in': userIds } }, { addedBy: { '$in': userIds } }, { updatedBy: { '$in': userIds } }] };
    const uploadsCnt = (await postDb?.updateMany(uploadsFilter, updateBody));

    // Delete user job post if its recruiter
    // const postsFilter = { '$or': [{ addedBy: { '$in': userIds } }] };
    // const postsCnt = (await postDb?.updateMany(postsFilter, updateBody));
    
    let updated = (await userDb.updateMany(filter, updateBody));
    let result = {
      user: userCnt + updated,
      userTokens: userTokensCnt,
      role: roleCnt,
      projectRoute: projectRouteCnt,
      routeRole: routeRoleCnt,
      userRole: userRoleCnt,
      uploads: uploadsCnt,
      posts: postsCnt,
    };
    return response.success({
      message: 'No of Dependency deleted',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency deleted',
      data: { user: 0 }
    });
  }
};
module.exports = {
  getDependencyCount,
  deleteWithDependency,
  softDeleteWithDependency
};
