const convertSingleToDoubleDigitNumber = (number) => {
    if (number === 0) {
        return 0;
    }

    if (number < 10) {
        return `0${number}`
    }
    return number
};

module.exports = {
    convertSingleToDoubleDigitNumber
};