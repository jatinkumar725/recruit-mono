/**
 * Parses and merges provided arguments with default arguments.
 * @param {Object} args - Provided arguments.
 * @param {Object} defaults - Default arguments.
 * @returns {Object} - Merged arguments.
 */
function rp_parse_args(args, defaults) {
    args = args || {}; // Ensure args is an object
    defaults = defaults || {}; // Ensure defaults is an object

    // Loop through defaults
    for (let key in defaults) {
        // If the key is not in args, assign the default value
        if (!(key in args)) {
            args[key] = defaults[key];
        }
    }

    return args;
}

module.exports = {
    rp_parse_args,
};