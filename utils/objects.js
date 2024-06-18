function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function pluckList(array, key) {
    return array.map(item => item[key]);
}

module.exports = {
    getKeyByValue,
    pluckList,
};