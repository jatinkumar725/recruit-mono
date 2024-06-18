module.exports = (code) => {

    let newCode = {
        userId: code.userId,
        code: code.code,
        codeExpirationTime: code.codeExpirationTime,
        model_type: code.model_type,
        codeExpirationTime: code.codeExpirationTime,
        isCodeExpired: code.isCodeExpired,
        isActive: code.isActive,
        addedBy: code.addedBy,
        updatedBy: code.updatedBy,
        createdAt: code.createdAt,
        updatedAt: code.updatedAt,
        isDeleted: code.isDeleted,
    };

    // remove undefined values
    Object.keys(newCode).forEach(key => newCode[key] === undefined && delete newCode[key]);

    // To validate Entity uncomment this block
    /*
     * const validate = (newCode) => {
     *   if (!newCode.field) {
     *       throw new Error("this field is required");
     *   }
     * }
     * validate(newCode) 
     */

    return Object.freeze(newCode);
};
