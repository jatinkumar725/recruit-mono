const { ROUTES } = require("../constants/routeConstant");
const { pluckList } = require("./objects");

const generatePostPermalink = (data) => {
    // Generate slugs
    const { postId, title, company, location } = data;

    if (postId, title, company, location) {
        const titleSlug = title.trim().replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '-').toLowerCase();
        const companySlug = company.trim().replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '-').toLowerCase();
        const locationCityArray = pluckList(location.slice(0, 2), 'city');
        const locationSlug = locationCityArray.join(' ').trim().replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '-').toLowerCase();

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
        const nameSlug = data.name.trim().replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '-').toLowerCase();

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