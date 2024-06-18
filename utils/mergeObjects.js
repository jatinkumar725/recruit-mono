function mergeObjects(obj1, obj2) {
    const merged = {};

    for (const key in obj1) {
        if (key in obj2) {
            merged[key] = obj2[key];
        }
    }

    return merged;
}

module.exports = mergeObjects;