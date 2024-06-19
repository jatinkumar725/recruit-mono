const { ROUTES } = require("../constants/routeConstant");
const { pluckList } = require("./objects");

const cleanString = (string) => {

    /**
     * - Remove whitespaces from both ends
     * - Remove all characters other than alphabet and numbers 
     * - Remove consecutive whitespaces with a single space
     * - Replace spaces with hyphens
     * - Convert to lowercase
     */

    return string.trim().replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, ' ').replace(/ /g, '-').toLowerCase();
};

const generatePostPermalink = (data) => {
    // Generate slugs
    const { postId, title, company, location } = data;

    if (postId, title, company, location) {
        const titleSlug = cleanString(title);
        const companySlug = cleanString(company);
        const locationCityArray = pluckList(location.slice(0, 2), 'city');
        const locationSlug = cleanString(locationCityArray.join(' '));

        // Generate static URL
        const urlSlug = `${titleSlug}-${companySlug}-${locationSlug}-${postId}`;
        const staticUrl = `${ROUTES.singleJob}/${urlSlug}`;
        return staticUrl;
    }

};

const generateSeekerProfilePermalink = (data) => {

    const { userId, name } = data;

    if (userId, name) {
        // Generate slugs
        const userId = data.userId;
        const nameSlug = cleanString(data.name);

        // Generate static URL
        const urlSlug = `${nameSlug}-${userId}`;
        const staticUrl = `${ROUTES.candidate}/${urlSlug}`;

        return staticUrl;
    }

};

module.exports = {
    generatePostPermalink,
    generateSeekerProfilePermalink,
};