function cookieExtractor(req, name) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies[name];
    }
    return token;
};

module.exports = {
    cookieExtractor,
};