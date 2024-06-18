const formatUnit = (value, unit) => {
    // Add 's' to the unit if value is not equal to 1
    const formattedUnit = value === 1 ? unit : unit + "s";
    return `${value} ${formattedUnit}`;
};

// Function to format number with commas
const formatNumber = (value) => {

    // Remove commas from the value
    const unformattedValue = value.replace(/,/g, "");

    // Convert value to string
    let stringValue = unformattedValue.toString();

    // Add commas as thousands separator
    stringValue = stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return stringValue;
};

export {
    formatUnit,
    formatNumber,
};