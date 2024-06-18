/**
 * updateProject.js
 */

const response = require('../../utils/response');
const projectEntity = require('../../entities/project');

const updateProject = ({
    userDb, updateValidation
}) => async (params) => {
    try {
        let {
            userId, projectData
        } = params;

        // Check if userId and projectData are provided
        if (userId && projectData && projectData.projects) {

            const user = await userDb.findOne({ userId: userId });

            // Map projectData to entities
            let projectEntities = projectData.projects.map(project => projectEntity(project));

            // Create an array to store the created online profiles
            let createdProjects = [];

            // Loop through each online profile entity and create it
            for (let projectEntity of projectEntities) {

                if ( projectEntity.projectId ) {
                    await userDb.updateOne(
                        { userId: userId, "projects.projectId": projectEntity.projectId },
                        { "$set": { "projects.$": projectEntity } },
                    );

                    // Push the created online profile into the array
                    createdProjects.push(projectEntity);

                } else {

                    // Push the newly created profile into the user's projects array
                    user.projects.push(projectEntity);
    
                    const createdProject = user.projects[user.projects.length - 1];
    
                    // Save the user document to persist the changes
                    await user.save();
    
                    // Push the created online profile into the array
                    createdProjects.push(createdProject);

                }

            }

            return response.success({ data: createdProjects });
        } else {
            return response.badRequest({ message: 'Missing userId or projectData' });
        }
    } catch (error) {
        // Handle any errors that occur during the process
        return response.internalServerError({ message: error.message });
    }
};

module.exports = updateProject;