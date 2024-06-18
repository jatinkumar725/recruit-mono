module.exports = (socialProfile) => {

    let newSocialProfile = {
        ogId: socialProfile.ogId,
        name: socialProfile.name,
        url: socialProfile.url,
    };

    // remove undefined values
    Object.keys(newSocialProfile).forEach(key => newSocialProfile[key] === undefined && delete newSocialProfile[key]);

    // To validate Entity uncomment this block
    /*
     * const validate = (newSocialProfile) => {
     *   if (!newSocialProfile.field) {
     *       throw new Error("this field is required");
     *   }
     * }
     * validate(newSocialProfile) 
     */

    return Object.freeze(newSocialProfile);
};
