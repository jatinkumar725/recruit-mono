/**
 *  getUserId.js
 * 
 */

const response = require('../../utils/response');

const getUserId = ({
    userDb
}) => async (params, req, res) => {
    try {

        const { query } = params;

        const user = await userDb.findOne(query, {}, '_id');

        if (user) {
            return user.toJSObject();
        }
    } catch (err) {
        console.log(err);
        return response.failure({
            res,
            message: err.message
        });
    }
};

module.exports = getUserId;