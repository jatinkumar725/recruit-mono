const response = require('../../../utils/response');
const responseHandler = require('../../../utils/response/responseHandler');

const checkLoginStatus = async (req, res) => {
    try {

        const user = req.user;

        let loggedIn = false;
        if (user) loggedIn = true;

        const result = {
            loggedIn,
        };

        return res.status(200).json(result);
    } catch (error) {
        return responseHandler(res, response.internalServerError({ message: error.message }));
    }
};

module.exports = {
    checkLoginStatus,
};