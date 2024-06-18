const response = require("../../utils/response");
const { getDifferenceOfTwoDatesInTime } = require("../../utils/date");
const dayjs = require("dayjs");

/**
 * @description : verify email
 * @param {Object} user : user information.
 * @param {String} token : token.
 * @return {Object} : response for verify email {status, message, data}
*/
const verifyEmail =
  ({ userDb, codeDb }) =>
  async (user, code) => {
    let userCode = await codeDb.findOne({
      code,
      userId: user.id,
    });
    
    if (!userCode) {

      return response.badRequest({ message: "Invalid code provided" });

    }

    // Check if email is verified
    if (userCode.isCodeExpired && user.isPrimaryEmailVerified) {

      return response.success({ message: "Email already verified" });

    }

    // Check code expiration
    const codeExpirationTime = dayjs(userCode.codeExpirationTime);
    const currentComparisonDate = dayjs();

    if (codeExpirationTime <= currentComparisonDate) {

      return response.badRequest({ message: "Invalid code provided" });

    }

    // Update email verification
    let updatedDocument = { isCodeExpired: true };
    await codeDb.updateOne({ _id: userCode.id }, updatedDocument);
    await userDb.updateOne(
      { _id: user.id },
      { $set: { isPrimaryEmailVerified: true } }
    );
    return response.success({ message: "Email verified Successfully" });
  };
module.exports = verifyEmail;
