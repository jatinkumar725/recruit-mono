const decodeJWT = (jwt) => {
    const base64 = jwt.split('.')[1];
    const jsonPayload = atob(base64);
    return JSON.parse(jsonPayload);
};

export {
    decodeJWT
}