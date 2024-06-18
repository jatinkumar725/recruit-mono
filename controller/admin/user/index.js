const systemUserDb = require('../../../data-access/systemUserDb');
const userTokensDb = require('../../../data-access/userTokensDb');
const roleDb = require('../../../data-access/roleDb');
const projectRouteDb = require('../../../data-access/projectRouteDb');
const routeRoleDb = require('../../../data-access/routeRoleDb');
const userRoleDb = require('../../../data-access/userRoleDb');

const systemUserSchema = require('../../../validation/schema/systemUser');
const systemUserEntity = require('../../../entities/systemUser');

const createValidation = require('../../../validation')(systemUserSchema.createSchema);
const updateValidation = require('../../../validation')(systemUserSchema.updateSchema);
const filterValidation = require('../../../validation')(systemUserSchema.filterValidationSchema);

const addUserUsecase = require('../../../use-case/user/addUser')({
  userDb: systemUserDb,
  userEntity: systemUserEntity,
  createValidation,
});

const findAllUserUsecase = require('../../../use-case/user/findAllUser')({
  userDb: systemUserDb,
  filterValidation
});

const getUserCountUsecase = require('../../../use-case/user/getUserCount')({
  userDb: systemUserDb,
  filterValidation
});

const getUserUsecase = require('../../../use-case/user/getUser')({
  userDb: systemUserDb,
  filterValidation
});

const updateUserUsecase = require('../../../use-case/user/updateUser')({
  userDb: systemUserDb,
  userEntity: systemUserEntity,
  updateValidation,
});

const partialUpdateUserUsecase = require('../../../use-case/user/partialUpdateUser')({ userDb: systemUserDb });

const softDeleteUserUsecase = require('../../../use-case/user/softDeleteUser')({
  userDb: systemUserDb,
  userTokensDb,
  userRoleDb,
});

const softDeleteManyUserUsecase = require('../../../use-case/user/softDeleteManyUser')({
  userDb: systemUserDb,
  userTokensDb,
  userRoleDb,
});

const bulkInsertUserUsecase = require('../../../use-case/user/bulkInsertUser')({ 
  userDb: systemUserDb, 
  userEntity: systemUserEntity,
  createValidation,
});

const bulkUpdateUserUsecase = require('../../../use-case/user/bulkUpdateUser')({ userDb: systemUserDb });

const deleteUserUsecase = require('../../../use-case/user/deleteUser')({
  userDb: systemUserDb,
  userTokensDb,
  userRoleDb,
});

const deleteManyUserUsecase = require('../../../use-case/user/deleteManyUser')({
  userDb: systemUserDb,
  userTokensDb,
  userRoleDb,
});

const changePasswordUsecase = require('../../../use-case/user/changePassword')({ userDb: systemUserDb });

const updateProfileUsecase = require('../../../use-case/user/updateProfile')({
  userDb: systemUserDb,
  userEntity: systemUserEntity,
  updateValidation
});

const userController = require('./user');

const addUser = userController.addUser(addUserUsecase);
const findAllUser = userController.findAllUser(findAllUserUsecase);
const getUserCount = userController.getUserCount(getUserCountUsecase);
const getUserById = userController.getUser(getUserUsecase);
const updateUser = userController.updateUser(updateUserUsecase);
const partialUpdateUser = userController.partialUpdateUser(partialUpdateUserUsecase);
const softDeleteUser = userController.softDeleteUser(softDeleteUserUsecase);
const softDeleteManyUser = userController.softDeleteManyUser(softDeleteManyUserUsecase);
const bulkInsertUser = userController.bulkInsertUser(bulkInsertUserUsecase);
const bulkUpdateUser = userController.bulkUpdateUser(bulkUpdateUserUsecase);
const deleteUser = userController.deleteUser(deleteUserUsecase);
const deleteManyUser = userController.deleteManyUser(deleteManyUserUsecase);
const changePassword = userController.changePassword(changePasswordUsecase);
const updateProfile = userController.updateProfile(updateProfileUsecase);
const getLoggedInUserInfo = userController.getLoggedInUserInfo(getUserUsecase);

module.exports = {
  addUser,
  findAllUser,
  getUserCount,
  getUserById,
  updateUser,
  partialUpdateUser,
  softDeleteUser,
  softDeleteManyUser,
  bulkInsertUser,
  bulkUpdateUser,
  deleteUser,
  deleteManyUser,
  changePassword,
  updateProfile,
  getLoggedInUserInfo,
};