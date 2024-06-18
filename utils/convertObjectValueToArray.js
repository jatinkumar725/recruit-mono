const convertObjectValueToArray = (data, name, levels) => {
    return levels.flatMap(level => {
        const specs = data[level]?.split(',');
        return specs;
    }).filter(item => item);
};

module.exports = convertObjectValueToArray;