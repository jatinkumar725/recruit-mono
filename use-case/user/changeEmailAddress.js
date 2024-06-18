/**
 * changeEmailAddress.js
 */
const { USER_QUERY_TYPES } = require('../../constants/authConstant');
const response = require('../../utils/response');
const sendEmailVerificationNotification = require('../common/sendEmailVerificationNotification');
const filterObjectFromArray = require("../../utils/filterObjectFromArray");

/**
 * @description : change email address.
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : response of change password. {status, message, data}
 */
const changeEmailAddress = ({ userDb, codeDb }) => async (params) => {
    if (!params.newEmail || !params.email) {
        return response.validationError({ message: 'Please provide valid parameters.' });
    }

    let email = params.email;
    let newEmail = params.newEmail;

    if (email === newEmail) {
        return response.badRequest({ message: 'Account is already registered with this email address.' });
    }

    let user = await userDb.findOne({ email: newEmail });
    if (user) {
        return response.badRequest({ message: 'Account is already registered with this email address.' });
    }

    let updatedUser = await userDb.updateOne(
        { email }, 
        { 
            'email': newEmail, 
            'username': newEmail, 
            'isPrimaryEmailVerified': false 
        }
    );

    console.log(updatedUser)

    if (updatedUser) {

        const makeSendEmailVerificationNotification = sendEmailVerificationNotification({ codeDb });
        await makeSendEmailVerificationNotification(updatedUser);

        const jsonResultData = updatedUser.toJSON();
        const userData = filterObjectFromArray(jsonResultData, USER_QUERY_TYPES[jsonResultData.userType][1]);

        return response.success({ data: userData });
    }
    return response.badRequest({ message: 'Email address not updated.' });
};

module.exports = changeEmailAddress;