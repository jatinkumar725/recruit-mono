const passport = require("passport");
const { USER_TYPES } = require("../constants/authConstant");

let seekerDb = require("../data-access/seekerDb");
let userDb = require("../data-access/systemUserDb");
let recruiterDb = require("../data-access/recruiterDb");
let userTokensDb = require("../data-access/userTokensDb");
let roleDb = require("../data-access/roleDb");
let userRoleDb = require("../data-access/userRoleDb");
let routeRoleDb = require("../data-access/routeRoleDb");
let projectRouteDb = require("../data-access/projectRouteDb");

const auth = require("./auth")({
  passport,
  userTokensDb,
});

const checkRolePermission = require("./checkRolePermission")({
  userRoleDb,
  routeRoleDb,
  projectRouteDb,
});

const clientSeekerPassportStrategy = require("./clientSeekerPassportStrategy")({
  userDb: seekerDb,
});
const clientRecruiterPassportStrategy = require("./clientRecruiterPassportStrategy")({
  userDb: recruiterDb,
});
const adminPassportStrategy = require("./adminPassportStrategy")({ userDb });

const googleClientSeekerPassportStrategy = require("./googlePassportStrategy")({
  userDb: seekerDb,
  roleDb,
  userRoleDb,
  userType: USER_TYPES.Seeker,
});

module.exports = {
  auth,
  checkRolePermission,
  clientSeekerPassportStrategy,
  clientRecruiterPassportStrategy,
  adminPassportStrategy,
  googleClientSeekerPassportStrategy,
};
