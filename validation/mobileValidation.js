function validateIndianMobile(options = {}) {
    const { allowCountryCode = true } = options;

    let regexPattern = "^[6-9]\\d{9}$";

    if (allowCountryCode) {
        regexPattern = "^(?:\\+?91)?" + regexPattern;
    }

    return new RegExp(regexPattern);
};

module.exports = validateIndianMobile;