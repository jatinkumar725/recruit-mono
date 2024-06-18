const { UPLOAD_TYPES } = require('../../../../constants/authConstant');
const getObjectFromArray = require('../../../../utils/getObjectFromArray');
const response = require('../../../../utils/response');
const responseHandler = require('../../../../utils/response/responseHandler');

const saveSeeker = (addSavedSeekerUsecase, getUserIdUsecase) => async (req, res) => {
    try {

        if (!req.body.id) {
            return responseHandler(res, response.badRequest());
        }

        const userId = req.user.id;

        const seekerProfile = await getUserIdUsecase({
            profileId: req.body.id
        });

        const dataToCreate = {
            seekerId: seekerProfile.id,
            recruiterId: userId,
        };

        const result = await addSavedSeekerUsecase(dataToCreate);

        if (result.data && result.data.profile) {
            result.data.profile = result.data.profile.projectFields(1);
        }

        return responseHandler(res, result);
    } catch (error) {
        console.error('error', error);
        return responseHandler(res, response.internalServerError({ message: error.message }));
    }
};

const getSavedSeekers = (getSavedSeekersUsecase, getUserUploadsUsecase) => async (req, res) => {
    try {
        if (!req.params.profileId) {
            return responseHandler(res, response.badRequest());
        }

        const result = await getSavedSeekersUsecase({
            query: {
                recruiterId: req.user.id
            },
            options: {
                populate: 'seekerId',
                select: 'seekerId sId',
                sort: { createdAt: -1 }
            }
        });

        console.log('result', result)

        if (result.data.data) {
            // Use Promise.all to await all promises returned by map
            result.data.data = await Promise.all(result.data.data.map(async (item) => {
                const data = {
                    seeker: item.seekerId.projectFields(3),
                    sId: item.sId
                };

                const uploadQuery = {
                    userId: data.seeker.profileId,
                    uploadType: { "$in": [UPLOAD_TYPES.Profile.type, UPLOAD_TYPES.Resume.type] },
                    isDeleted: false,
                    isActive: true
                };

                const uploadResult = await getUserUploadsUsecase({ query: uploadQuery });

                // Profile picture
                const profileUpload = getObjectFromArray(uploadResult?.data || [], ['uploadType'], UPLOAD_TYPES.Profile.type)?.toJSON();
                data.seeker.profilePhoto = profileUpload || null;

                return data;
            }));
        }

        return responseHandler(res, result);
    } catch (error) {
        console.error('error', error);
        return responseHandler(res, response.internalServerError({ message: error.message }));
    }
};

const deleteSavedSeeker = (deleteSavedSeekerUsecase) => async (req, res) => {
    try {

        if (!req.params.savedSeekerId) {
            return responseHandler(res, response.badRequest());
        }

        const query = {
            sId: req.params.savedSeekerId
        };

        const result = await deleteSavedSeekerUsecase({
            query
        });

        if (result.data.profile) {
            result.data.profile = result.data.profile.projectFields(1);
        }

        return responseHandler(res, result);
    } catch (error) {
        console.error('error', error);
        return responseHandler(res, response.internalServerError({ message: error.message }));
    }
};

module.exports = {
    saveSeeker,
    getSavedSeekers,
    deleteSavedSeeker
};