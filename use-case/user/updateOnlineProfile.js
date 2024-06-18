/**
 * updateOnlineProfile.js
 */

const response = require('../../utils/response');
const onlineProfileEntity = require('../../entities/onlineProfile');

const updateOnlineProfile = ({
    userDb, updateValidation
}) => async (params) => {
    try {
        let {
            userId, onlineProfileData
        } = params;

        // Check if userId and onlineProfileData are provided
        if (userId && onlineProfileData && onlineProfileData.onlineProfiles) {

            const user = await userDb.findOne({ userId: userId });

            // Map onlineProfileData to entities
            let onlineProfileEntities = onlineProfileData.onlineProfiles.map(onlineProfile => onlineProfileEntity(onlineProfile));

            // Create an array to store the created online profiles
            let createdOnlineProfiles = [];

            // Loop through each online profile entity and create it
            for (let onlineProfileEntity of onlineProfileEntities) {

                if ( onlineProfileEntity.ogId ) {
                    await userDb.updateOne(
                        { userId: userId, "onlineProfiles.ogId": onlineProfileEntity.ogId },
                        { "$set": { "onlineProfiles.$": onlineProfileEntity } },
                    );

                    // Push the created online profile into the array
                    createdOnlineProfiles.push(onlineProfileEntity);

                } else {

                    // Push the newly created profile into the user's onlineProfiles array
                    user.onlineProfiles.push(onlineProfileEntity);
    
                    const createdOnlineProfile = user.onlineProfiles[user.onlineProfiles.length - 1];
    
                    // Save the user document to persist the changes
                    await user.save();
    
                    // Push the created online profile into the array
                    createdOnlineProfiles.push(createdOnlineProfile);

                }


            }

            return response.success({ data: createdOnlineProfiles });
        } else {
            return response.badRequest({ message: 'Missing userId or onlineProfileData' });
        }
    } catch (error) {
        // Handle any errors that occur during the process
        return response.internalServerError({ message: error.message });
    }
};

module.exports = updateOnlineProfile;