/**
 * deleteOnlineProfile.js
 */

const response = require('../../utils/response');
const deleteOnlineProfile = ({
    userDb
}) => async (params) => {
    try {
        let {
            userId, ogId
        } = params;

        await userDb.updateOne(
            { userId: userId, "onlineProfiles.ogId": ogId },
            { $pull: { "onlineProfiles": { ogId: ogId } } }
        );

        return response.success({ message: 'Online profile deleted successfully' });

    } catch (error) {
        // Handle any errors that occur during the process
        return response.internalServerError({ message: error.message });
    }
};

module.exports = deleteOnlineProfile;