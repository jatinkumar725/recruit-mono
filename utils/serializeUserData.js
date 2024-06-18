// Helper function to serialize user data into query parameters
const serializeUserData = (userData) => {
    const queryParams = new URLSearchParams();

    for (const key in userData) {
        if (Object.prototype.hasOwnProperty.call(userData, key)) {
            queryParams.append(key, userData[key]);
        }
    }

    return queryParams.toString();
};

module.exports = serializeUserData;