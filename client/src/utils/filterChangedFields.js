const filterChangedFields = (initialValues, changedValues) => {
    const filterChangedFieldsRecursive = (initialObj, changedObj, parentKey = '') => {
        return Object.keys(changedObj).reduce((filteredFields, key) => {
            const currentKey = parentKey ? `${parentKey}.${key}` : key;
            const initialValue = initialObj[key];
            const changedValue = changedObj[key];

            if (typeof changedValue === 'object' && typeof initialValue === 'object') {
                const nestedFilteredFields = filterChangedFieldsRecursive(initialValue, changedValue, currentKey);
                return { ...filteredFields, ...nestedFilteredFields };
            } else if (initialValue !== changedValue) {
                return { ...filteredFields, [currentKey]: changedValue };
            } else {
                return filteredFields;
            }
        }, {});
    };

    return filterChangedFieldsRecursive(initialValues, changedValues);
};

export default filterChangedFields;