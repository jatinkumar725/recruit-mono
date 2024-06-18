const filterFields = (obj, fields) => {
    return Object.keys(obj)
        .filter(key => fields.includes(key))
        .reduce((filteredObj, key) => {
            filteredObj[key] = obj[key];
            return filteredObj;
        }, {});
};

module.exports = filterFields;