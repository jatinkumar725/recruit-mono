const bcrypt = require('bcrypt');
const authConstant = require('../constants/authConstant');
const userDb = require('../data-access/systemUserDb');
const roleDb = require('../data-access/roleDb');
const projectRouteDb = require('../data-access/projectRouteDb');
const routeRoleDb = require('../data-access/routeRoleDb');
const userRoleDb = require('../data-access/userRoleDb');
const replaceAll = require('../utils/replaceAll');

// Insert default users on project initialization
async function seedUser() {
  try {
    let userToBeInserted = {};
    userToBeInserted = {
      'password': 'QpPCXqEiR8eGjOj',
      'isDeleted': false,
      'username': 'Caleb.Erdman69',
      'email': 'Euna_Yundt@gmail.com',
      'isActive': true,
      'userType': authConstant.USER_TYPES.System_User
    };
    userToBeInserted.password = await bcrypt.hash(userToBeInserted.password, 8);
    let user = await userDb.updateOne({ 'username': 'Caleb.Erdman69' }, userToBeInserted, {
      upsert: true,
      new: true
    });
    console.info('Users seeded 🍺');
  } catch (error) {
    console.log('User seeder failed due to ', error.message);
  }
}

// Insert default roles on project initialization
async function seedRole() {
  try {
    const roles = Object.keys(authConstant.USER_TYPES);
    const insertedRoles = await roleDb.findMany({ code: { '$in': roles.map(role => role.toUpperCase()) } });
    const rolesToInsert = [];
    roles.forEach(role => {
      if (!insertedRoles.find(insertedRole => insertedRole.code === role.toUpperCase())) {
        rolesToInsert.push({
          name: role,
          code: role.toUpperCase(),
          weight: 1
        });
      }
    });
    if (rolesToInsert.length) {
      const result = await roleDb.create(rolesToInsert);
      if (result) console.log('Role seeded 🍺');
      else console.log('Role seeder failed!');
    } else {
      console.log('Role is upto date 🍺');
    }
  } catch (error) {
    console.log('Role seeder failed due to ', error.message);
  }
}

// Insert default project routes on project initialization
async function seedProjectRoutes(routes) {
  try {
    if (routes && routes.length) {
      let routeName = '';
      const dbRoutes = await projectRouteDb.findMany({});
      let routeArr = [];
      let routeObj = {};
      routes.forEach(route => {
        routeName = `${replaceAll((route.path).toLowerCase(), '/', '_')}`;
        route.methods.forEach(method => {
          routeObj = dbRoutes.find(dbRoute => dbRoute.route_name === routeName && dbRoute.method === method);
          if (!routeObj) {
            routeArr.push({
              'uri': route.path.toLowerCase(),
              'method': method,
              'route_name': routeName,
            });
          }
        });
      });
      if (routeArr.length) {
        const result = await projectRouteDb.create(routeArr);
        if (result) console.info('ProjectRoute model seeded 🍺');
        else console.info('ProjectRoute seeder failed.');
      } else {
        console.info('ProjectRoute is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('ProjectRoute seeder failed due to ', error.message);
  }
}

// Insert default route roles on project initialization
async function seedRouteRole() {
  try {
    const routeRoles = [
      // System User: Users
      {
        "route": "/admin/api/v1/user/create",
        "role": "System_User",
        "method": "POST"
      },
      {
        "route": "/admin/api/v1/user/addbulk",
        "role": "System_User",
        "method": "POST"
      },
      {
        "route": "/admin/api/v1/user/list",
        "role": "System_User",
        "method": "POST"
      },
      {
        "route": "/admin/api/v1/user/:id",
        "role": "System_User",
        "method": "GET"
      },
      {
        "route": "/admin/api/v1/user/count",
        "role": "System_User",
        "method": "POST"
      },
      {
        "route": "/admin/api/v1/user/update/:id",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/user/partial-update/:id",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/user/updatebulk",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/user/softdelete/:id",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/user/softdeletemany",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/user/delete/:id",
        "role": "System_User",
        "method": "DELETE"
      },
      {
        "route": "/admin/api/v1/user/deletemany",
        "role": "System_User",
        "method": "POST"
      },
      // System User: User Tokens
      {
        "route": "/admin/api/v1/usertokens/create",
        "role": "System_User",
        "method": "POST"
      },
      {
        "route": "/admin/api/v1/usertokens/addbulk",
        "role": "System_User",
        "method": "POST"
      },
      {
        "route": "/admin/api/v1/usertokens/list",
        "role": "System_User",
        "method": "POST"
      },
      {
        "route": "/admin/api/v1/usertokens/:id",
        "role": "System_User",
        "method": "GET"
      },
      {
        "route": "/admin/api/v1/usertokens/count",
        "role": "System_User",
        "method": "POST"
      },
      {
        "route": "/admin/api/v1/usertokens/update/:id",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/usertokens/partial-update/:id",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/usertokens/updatebulk",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/usertokens/softdelete/:id",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/usertokens/softdeletemany",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/usertokens/delete/:id",
        "role": "System_User",
        "method": "DELETE"
      },
      {
        "route": "/admin/api/v1/usertokens/deletemany",
        "role": "System_User",
        "method": "POST"
      },
      // System User: Roles
      {
        "route": "/admin/api/v1/role/create",
        "role": "System_User",
        "method": "POST"
      },
      {
        "route": "/admin/api/v1/role/addbulk",
        "role": "System_User",
        "method": "POST"
      },
      {
        "route": "/admin/api/v1/role/list",
        "role": "System_User",
        "method": "POST"
      },
      {
        "route": "/admin/api/v1/role/:id",
        "role": "System_User",
        "method": "GET"
      },
      {
        "route": "/admin/api/v1/role/count",
        "role": "System_User",
        "method": "POST"
      },
      {
        "route": "/admin/api/v1/role/update/:id",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/role/partial-update/:id",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/role/updatebulk",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/role/softdelete/:id",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/role/softdeletemany",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/role/delete/:id",
        "role": "System_User",
        "method": "DELETE"
      },
      {
        "route": "/admin/api/v1/role/deletemany",
        "role": "System_User",
        "method": "POST"
      },
      // System User: Project Routes
      {
        "route": "/admin/api/v1/projectroute/create",
        "role": "System_User",
        "method": "POST"
      },
      {
        "route": "/admin/api/v1/projectroute/addbulk",
        "role": "System_User",
        "method": "POST"
      },
      {
        "route": "/admin/api/v1/projectroute/list",
        "role": "System_User",
        "method": "POST"
      },
      {
        "route": "/admin/api/v1/projectroute/:id",
        "role": "System_User",
        "method": "GET"
      },
      {
        "route": "/admin/api/v1/projectroute/count",
        "role": "System_User",
        "method": "POST"
      },
      {
        "route": "/admin/api/v1/projectroute/update/:id",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/projectroute/partial-update/:id",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/projectroute/updatebulk",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/projectroute/softdelete/:id",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/projectroute/softdeletemany",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/projectroute/delete/:id",
        "role": "System_User",
        "method": "DELETE"
      },
      {
        "route": "/admin/api/v1/projectroute/deletemany",
        "role": "System_User",
        "method": "POST"
      },
      // System User: Route Roles
      {
        "route": "/admin/api/v1/routerole/create",
        "role": "System_User",
        "method": "POST"
      },
      {
        "route": "/admin/api/v1/routerole/addbulk",
        "role": "System_User",
        "method": "POST"
      },
      {
        "route": "/admin/api/v1/routerole/list",
        "role": "System_User",
        "method": "POST"
      },
      {
        "route": "/admin/api/v1/routerole/:id",
        "role": "System_User",
        "method": "GET"
      },
      {
        "route": "/admin/api/v1/routerole/count",
        "role": "System_User",
        "method": "POST"
      },
      {
        "route": "/admin/api/v1/routerole/update/:id",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/routerole/partial-update/:id",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/routerole/updatebulk",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/routerole/softdelete/:id",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/routerole/softdeletemany",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/routerole/delete/:id",
        "role": "System_User",
        "method": "DELETE"
      },
      {
        "route": "/admin/api/v1/routerole/deletemany",
        "role": "System_User",
        "method": "POST"
      },
      // System User: User Roles
      {
        "route": "/admin/api/v1/userrole/create",
        "role": "System_User",
        "method": "POST"
      },
      {
        "route": "/admin/api/v1/userrole/addbulk",
        "role": "System_User",
        "method": "POST"
      },
      {
        "route": "/admin/api/v1/userrole/list",
        "role": "System_User",
        "method": "POST"
      },
      {
        "route": "/admin/api/v1/userrole/:id",
        "role": "System_User",
        "method": "GET"
      },
      {
        "route": "/admin/api/v1/userrole/count",
        "role": "System_User",
        "method": "POST"
      },
      {
        "route": "/admin/api/v1/userrole/update/:id",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/userrole/partial-update/:id",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/userrole/updatebulk",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/userrole/softdelete/:id",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/userrole/softdeletemany",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/userrole/delete/:id",
        "role": "System_User",
        "method": "DELETE"
      },
      {
        "route": "/admin/api/v1/userrole/deletemany",
        "role": "System_User",
        "method": "POST"
      },
      // System User: Term Manipulation
      {
        "route": "/admin/api/v1/term/create",
        "role": "System_User",
        "method": "POST"
      },
      {
        "route": "/admin/api/v1/term/addbulk",
        "role": "System_User",
        "method": "POST"
      },
      {
        "route": "/admin/api/v1/term/list",
        "role": "System_User",
        "method": "POST"
      },
      {
        "route": "/admin/api/v1/term/:id",
        "role": "System_User",
        "method": "GET"
      },
      {
        "route": "/admin/api/v1/term/count",
        "role": "System_User",
        "method": "POST"
      },
      {
        "route": "/admin/api/v1/term/update/:id",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/term/partial-update/:id",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/term/updatebulk",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/term/softdelete/:id",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/term/softdeletemany",
        "role": "System_User",
        "method": "PUT"
      },
      {
        "route": "/admin/api/v1/term/delete/:id",
        "role": "System_User",
        "method": "DELETE"
      },
      {
        "route": "/admin/api/v1/term/deletemany",
        "role": "System_User",
        "method": "POST"
      },
      // System User: Orphan Post
      {
        "route": "/admin/api/v1/post/orphans/list",
        "role": "System_User",
        "method": "POST"
      },
      {
        "route": "/admin/api/v1/post/deleteOrphan/:postId",
        "role": "System_User",
        "method": "DELETE"
      },
      // Recruiter: Seeker Manipulation
      {
        "route": "/client/cloud-aggregator-rec/v1/user/add/seeker",
        "role": "Recruiter",
        "method": "POST"
      },
      {
        "route": "/client/cloud-aggregator-rec/v1/user/search/seeker",
        "role": "Recruiter",
        "method": "POST"
      },
      {
        "route": "/client/cloud-aggregator-rec/v1/user/addBulk/seeker",
        "role": "Recruiter",
        "method": "GET"
      },
      {
        "route": "/client/cloud-aggregator-rec/v1/user/search/seeker/:seekerId",
        "role": "Recruiter",
        "method": "POST"
      },
      {
        "route": "/client/cloud-aggregator-rec/v1/user/search/seeker/:profileId/resume",
        "role": "Recruiter",
        "method": "GET"
      },
      // Recruiter: Posting
      {
        "route": "/client/cloud-aggregator-rec/v1/post/add",
        "role": "Recruiter",
        "method": "POST"
      },
      {
        "route": "/client/cloud-aggregator-rec/v1/post/addBulk",
        "role": "Recruiter",
        "method": "POST"
      },
      {
        "route": "/client/cloud-aggregator-rec/v1/post/:postId",
        "role": "Recruiter",
        "method": "GET"
      },
      {
        "route": "/client/cloud-aggregator-rec/v1/post/list",
        "role": "Recruiter",
        "method": "POST"
      },
      {
        "route": "/client/cloud-aggregator-rec/v1/post/count",
        "role": "Recruiter",
        "method": "POST"
      },
      {
        "route": "/client/cloud-aggregator-rec/v1/post/update/:postId",
        "role": "Recruiter",
        "method": "PUT"
      },
      {
        "route": "/client/cloud-aggregator-rec/v1/post/delete/:postId",
        "role": "Recruiter",
        "method": "DELETE"
      },
      {
        "route": "/client/cloud-aggregator-rec/v1/post/partial-update/:postId",
        "role": "Recruiter",
        "method": "PUT"
      },
      {
        "route": "/client/cloud-aggregator-rec/v1/post/updateBulk",
        "role": "Recruiter",
        "method": "PUT"
      },
      {
        "route": "/client/cloud-aggregator-rec/v1/post/:postId/:entity/:entityId",
        "role": "Recruiter",
        "method": "POST"
      },
      // Seeker: Uploads
      {
        "route": "/client/cloud-aggregator-sk/v1/:profileId/profile",
        "role": "Seeker",
        "method": "POST"
      },
      {
        "route": "/client/cloud-aggregator-sk/v1/:profileId/resume",
        "role": "Seeker",
        "method": "POST"
      },
      {
        "route": "/client/cloud-aggregator-sk/v1/:profileId/profile",
        "role": "Seeker",
        "method": "GET"
      },
      {
        "route": "/client/cloud-aggregator-sk/v1/:profileId/resume",
        "role": "Seeker",
        "method": "GET"
      },
      {
        "route": "/client/cloud-aggregator-sk/v1/:profileId/profile",
        "role": "Seeker",
        "method": "DELETE"
      },
      {
        "route": "/client/cloud-aggregator-sk/v1/:profileId/resume",
        "role": "Seeker",
        "method": "DELETE"
      },
      // Seeker: Apply Post // ? Check route, I think its wrongs
      {
        "route": "/client/cloud-aggregator-rec/v1/post/apply",
        "role": "Seeker",
        "method": "POST"
      },
      {
        "route": "/client/cloud-aggregator-rec/v1/post/apply/list",
        "role": "Seeker",
        "method": "POST"
      },
    ];

    if (routeRoles && routeRoles.length) {
      const routes = [...new Set(routeRoles.map(routeRole => routeRole.route.toLowerCase()))];
      const routeMethods = [...new Set(routeRoles.map(routeRole => routeRole.method))];
      const roles = Object.keys(authConstant.USER_TYPES);
      const insertedProjectRoute = await projectRouteDb.findMany({
        uri: { '$in': routes },
        method: { '$in': routeMethods },
        'isActive': true,
        'isDeleted': false
      });
      const insertedRoles = await roleDb.findMany({
        code: { '$in': roles.map(role => role.toUpperCase()) },
        'isActive': true,
        'isDeleted': false
      });
      let projectRouteId = '';
      let roleId = '';
      let createRouteRoles = routeRoles.map(routeRole => {
        projectRouteId = insertedProjectRoute.find(pr => pr.uri === routeRole.route.toLowerCase() && pr.method === routeRole.method);
        roleId = insertedRoles.find(r => r.code === routeRole.role.toUpperCase());
        if (projectRouteId && roleId) {
          return {
            roleId: roleId.id,
            routeId: projectRouteId.id
          };
        }
      });
      createRouteRoles = createRouteRoles.filter(Boolean);
      const routeRolesToBeInserted = [];
      let routeRoleObj = {};

      await Promise.all(
        createRouteRoles.map(async routeRole => {
          routeRoleObj = await routeRoleDb.findOne({
            routeId: routeRole.routeId,
            roleId: routeRole.roleId,
          });
          if (!routeRoleObj) {
            routeRolesToBeInserted.push({
              routeId: routeRole.routeId,
              roleId: routeRole.roleId,
            });
          }
        })
      );
      if (routeRolesToBeInserted.length) {
        const result = await routeRoleDb.create(routeRolesToBeInserted);
        if (result) console.log('RouteRole seeded 🍺');
        else console.log('RouteRole seeder failed!');
      } else {
        console.log('RouteRole is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('RouteRole seeder failed due to ', error.message);
  }
}

async function seedUserRole() {
  try {
    const userRoles = [{
      'username': 'Caleb.Erdman69',
      'password': 'QpPCXqEiR8eGjOj'
    }];
    const defaultRoles = await roleDb.findMany();
    const insertedUsers = await userDb.findMany({ username: { '$in': userRoles.map(userRole => userRole.username) } });
    let user = {};
    const userRolesArr = [];
    userRoles.map(userRole => {
      user = insertedUsers.find(user => user.username === userRole.username && user.isPasswordMatch(userRole.password) && user.isActive && !user.isDeleted);
      if (user) {
        if (user.userType === authConstant.USER_TYPES.Seeker) {
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d) => d.code === 'SEEKER')?._id,
            model_type: authConstant.MODEL_TYPE[user.userType]
          });
        } else if (user.userType === authConstant.USER_TYPES.Recruiter) {
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d) => d.code === 'RECRUITER')?._id,
            model_type: authConstant.MODEL_TYPE[user.userType]
          });
        } else {
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d) => d.code === 'SYSTEM_USER')?._id,
            model_type: authConstant.MODEL_TYPE[user.userType]
          });
        }
      }
    });
    let userRoleObj = {};
    const userRolesToBeInserted = [];
    if (userRolesArr.length) {
      await Promise.all(
        userRolesArr.map(async userRole => {
          userRoleObj = await userRoleDb.findOne({
            userId: userRole.userId,
            roleId: userRole.roleId
          });
          if (!userRoleObj) {
            userRolesToBeInserted.push({
              userId: userRole.userId,
              roleId: userRole.roleId,
              model_type: userRole.model_type,
            });
          }
        })
      );
      if (userRolesToBeInserted.length) {
        const result = await userRoleDb.create(userRolesToBeInserted);
        if (result) console.log('UserRole seeded 🍺');
        else console.log('UserRole seeder failed');
      } else {
        console.log('UserRole is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('UserRole seeder failed due to ', error);
  }
}

const seedData = async (allRegisterRoutes) => {
  await seedUser();
  await seedRole();
  await seedProjectRoutes(allRegisterRoutes);
  await seedRouteRole();
  await seedUserRole();
};
module.exports = seedData;
