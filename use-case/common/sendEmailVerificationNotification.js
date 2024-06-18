const dayjs = require('dayjs');
const uuid = require('uuid').v4;
const ejs = require('ejs');
const { ACCOUNT_VERIFICATION, MODEL_TYPE, USER_TYPES } = require('../../constants/authConstant');
const response = require('../../utils/response');

const { sendMail } = require('../../services/email');
const { APP_PUBLIC_NAME } = require('../../constants/publicConstant');
const { getKeyByValue } = require('../../utils/objects');

const sendEmailVerificationNotification = ({ codeDb }) => async (user) => {
  let resultOfEmail = false;
  let token = uuid();
  let expires = dayjs().add(ACCOUNT_VERIFICATION.EXPIRE_TIME, "minute").toISOString();
  await codeDb.create({
    userId: user.id,
    model_type: MODEL_TYPE[user.userType],
    code: token,
    codeExpirationTime: expires,
  });

  let mailObj = {
    subject: `Email Verification | ${APP_PUBLIC_NAME}`,
    to: user.email,
  };
  let viewType = '/client/cloud-aggregator-sk/v1/auth/verifyEmail';
  let redirect = `https://recruit-mono.onrender.com/${ACCOUNT_VERIFICATION[user.userType].redirect}?data=${token}&email=verifyPrimaryEmail`;
  mailObj.template = `/views/email/Verification/${getKeyByValue(USER_TYPES, user.userType)}`;
  mailObj.data = {
    userName: user.username || '-',
    link: redirect,
  };
  try {
    await sendMail(mailObj);
    resultOfEmail = true;
  } catch (error) {
    console.log(error);
  }
  return response.success({
    data: {
      resultOfEmail,
    }
  });
};
module.exports = sendEmailVerificationNotification;