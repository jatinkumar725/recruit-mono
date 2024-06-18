const {
  JWT,
  JWT_TYPES,
  LOGIN_ACCESS,
  PLATFORM,
  MAX_LOGIN_RETRY_LIMIT,
  LOGIN_REACTIVE_TIME,
  MODEL_TYPE,
  USER_TYPES,
  USER_QUERY_TYPES,
} = require("../../constants/authConstant");
const dayjs = require("dayjs");
const generateToken = require("../../utils/generateToken");
const { getDifferenceOfTwoDatesInTime } = require("../../utils/date");
const response = require("../../utils/response");
const responseStatus = require("../../utils/response/responseStatus");
const makeGetRoleAccess = require("../common/getRoleAccess");
const filterObjectFromArray = require('../../utils/filterObjectFromArray');

const loginUser =
  ({ userDb, userTokensDb, userRoleDb, routeRoleDb }) =>
  async (username, platform, password = null, roleAccess) => {
    // let where = { $or: [{ username: username }, { email: username }] };
    let where = { $or: [{ email: username }] };
    const options = {};
    where.isActive = true;
    where.isDeleted = false;
    let user = await userDb.findOne(where, options);
    if (user) {
      if (user.loginRetryLimit >= MAX_LOGIN_RETRY_LIMIT) {
        let now = dayjs();
        if (user.loginReactiveTime) {
          let limitTime = dayjs(user.loginReactiveTime);
          if (limitTime > now) {
            let expireTime = dayjs().add(LOGIN_REACTIVE_TIME, "minute");
            if (!(limitTime > expireTime)) {
              return response.badRequest({
                message: `You have exceed the number of limit. You can login after ${getDifferenceOfTwoDatesInTime(
                  now,
                  limitTime
                )}.`,
              });
            }
            await userDb.updateOne(
              { _id: user.id },
              {
                loginReactiveTime: expireTime.toISOString(),
                loginRetryLimit: user.loginRetryLimit + 1,
              }
            );
            return response.badRequest({
              message: `You have exceed the number of limit. You can login after ${getDifferenceOfTwoDatesInTime(
                now,
                expireTime
              )}.`,
            });
          } else {
            user = await userDb.updateOne(
              { _id: user.id },
              {
                loginReactiveTime: "",
                loginRetryLimit: 0,
              },
              { new: true }
            );
          }
        } else {
          // send error
          let expireTime = dayjs().add(LOGIN_REACTIVE_TIME, "minute");
          const n = await userDb.updateOne(
            { _id: user.id },
            {
              loginReactiveTime: expireTime.toISOString(),
              loginRetryLimit: user.loginRetryLimit + 1,
            }
          );
          return response.badRequest({
            message: `You have exceed the number of limit. You can login after ${getDifferenceOfTwoDatesInTime(
              now,
              expireTime
            )}.`,
          });
        }
      }

      if (password) {
        const isPasswordMatched = await user.isPasswordMatch(password);

        if (!isPasswordMatched) {
          await userDb.updateOne(
            { _id: user.id },
            { loginRetryLimit: user.loginRetryLimit + 1 }
          );
          return response.badRequest({ message: "Please provide a valid email address and password." });
        }
      }
      const jsonUserData = user.toJSON();
      const userData = filterObjectFromArray(jsonUserData, USER_QUERY_TYPES[jsonUserData.userType][1]);

      if (!user.userType) {
        return response.badRequest({
          message: "You have not been assigned role.",
        });
      }
      if (platform == PLATFORM.SEEKER_CLIENT) {
        if (!LOGIN_ACCESS[user.userType].includes(PLATFORM.SEEKER_CLIENT)) {
          return response.badRequest({
            message: "You are unable to access this platform",
          });
        }
      } else if (platform == PLATFORM.RECRUITER_CLIENT) {
        if (!LOGIN_ACCESS[user.userType].includes(PLATFORM.RECRUITER_CLIENT)) {
          return response.badRequest({
            message: "You are unable to access this platform",
          });
        }
      } else if (platform == PLATFORM.SYSTEM_USER) {
        if (!LOGIN_ACCESS[user.userType].includes(PLATFORM.SYSTEM_USER)) {
          return response.badRequest({
            message: "You are unable to access this platform",
          });
        }
      }
      let accessToken = await generateToken(userData, JWT_TYPES.Access, JWT[JWT_TYPES.Access][user.userType]);
      let refreshToken = await generateToken(userData, JWT_TYPES.Refresh, JWT[JWT_TYPES.Refresh][user.userType]);
      if (user.loginRetryLimit) {
        await userDb.updateOne(
          { _id: user.id },
          {
            loginRetryLimit: 0,
            loginReactiveTime: "",
          }
        );
      }
      let refreshExpire = dayjs().add(JWT[JWT_TYPES.Refresh].EXPIRES_IN, "second").toISOString();
      await userTokensDb.create({
        userId: user.id,
        model_type: MODEL_TYPE[user.userType],
        accessToken,
        refreshToken,
        tokenExpirationTime: refreshExpire,
      });
      let userToReturn = {
        ...userData,
        accessToken,
        refreshToken,
      };
      if (roleAccess) {
        const getRoleAccessData = makeGetRoleAccess({
          userRoleDb,
          routeRoleDb,
        });
        userToReturn.roleAccess = await getRoleAccessData(user.id).data;
      }
      return response.success({
        data: userToReturn,
        message: "Login Successful",
      });
    } else {
      return response.badRequest({ message: "Please provide a valid email address and password." });
      // return response.badRequest({ message: "User not exists" });
    }
  };

module.exports = loginUser;
