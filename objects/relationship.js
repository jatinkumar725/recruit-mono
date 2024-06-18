const { TAXONOMY } = require('../constants/termConstant');

class TermRelationship {
    separateTerms(data) {
        let termFields = Object.keys(TAXONOMY);
        let termData = {}; // []
        let restData = {};

        for (let key in data) {
            if (termFields.includes(key.toLowerCase())) {
                termData[key.toLowerCase()] = data[key]; // termData.push(data[key]);
            } else {
                restData[key] = data[key];
            }
        }

        return { termData, restData };
    }
}

module.exports = TermRelationship;