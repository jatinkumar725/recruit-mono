module.exports = (project) => {

    let newProject = {
        projectId: project.projectId,
        imageURL: project.imageURL,
        url: project.url,
        name: project.name,
    };

    // remove undefined values
    Object.keys(newProject).forEach(key => newProject[key] === undefined && delete newProject[key]);

    // To validate Entity uncomment this block
    /*
     * const validate = (newProject) => {
     *   if (!newProject.field) {
     *       throw new Error("this field is required");
     *   }
     * }
     * validate(newProject) 
     */

    return Object.freeze(newProject);
};
