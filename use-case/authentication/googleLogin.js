// Dynamic Platform Type

const {
  JWT,
  JWT_TYPES,
  LOGIN_ACCESS,
  PLATFORM,
  MODEL_TYPE,
  USER_QUERY_TYPES,
} = require("../../constants/authConstant");
const dayjs = require("dayjs");
const generateToken = require("../../utils/generateToken");
const response = require("../../utils/response");

const googleLogin =
  ({ userDb, userTokensDb }) =>
  async (email, platform) => {
    if (platform == undefined) {
      return response.badRequest({ message: "Please login through platform" });
    }
    const user = await userDb.findOne({ email }, { projection: USER_QUERY_TYPES[1][1].join(' ') });
    if (!user || !user.email) {
      return response.failure({ message: "User/Email not exists" });
    }
    const { ...userData } = user.toJSON();
    let accessToken, refreshToken;
    if (!user.userType) {
      return response.badRequest({
        message: "You have not been assigned any role",
      });
    }
    if (platform == "client") {
      if (!LOGIN_ACCESS[user.userType].includes(PLATFORM.SEEKER_CLIENT)) {
        return {
          flag: true,
          data: "you are unable to access this platform",
        };
      }
      accessToken = await generateToken(userData, JWT_TYPES.Access, JWT[JWT_TYPES.Access][user.userType]);
      refreshToken = await generateToken(userData, JWT_TYPES.Refresh, JWT[JWT_TYPES.Refresh][user.userType]);
    }
    let refreshExpire = dayjs().add(JWT[JWT_TYPES.Refresh].EXPIRES_IN, "second").toISOString();
    await userTokensDb.create({
      userId: user.id,
      accessToken,
      refreshToken,
      model_type: MODEL_TYPE[user.userType],
      tokenExpirationTime: refreshExpire,
    });
    const userToReturn = {
      ...userData,
      accessToken,
      refreshToken,
    };
    return response.success({
      data: userToReturn,
      message: "Login Successful",
    });
  };

module.exports = googleLogin;
