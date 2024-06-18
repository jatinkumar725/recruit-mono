/**
 * deleteProject.js
 */

const response = require('../../utils/response');
const deleteProject = ({
    userDb
}) => async (params) => {
    try {
        let {
            userId, projectId
        } = params;

        await userDb.updateOne(
            { userId: userId, "projects.projectId": projectId },
            { $pull: { "projects": { projectId: projectId } } }
        );

        return response.success({ message: 'Project deleted successfully' });

    } catch (error) {
        // Handle any errors that occur during the process
        return response.internalServerError({ message: error.message });
    }
};

module.exports = deleteProject;