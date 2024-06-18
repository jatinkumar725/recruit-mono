function getObjectFromArray(arr, keys, value) {
    for (let i = 0; i < arr.length; i++) {
        let obj = arr[i];
        let nestedValue = keys.reduce((acc, key) => acc[key], obj);
        if (nestedValue === value) {
            return obj;
        }
    }
    return null;
}

module.exports = getObjectFromArray;