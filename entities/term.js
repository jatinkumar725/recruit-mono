module.exports = (term) => {

    let newTerm = {
        termId: term.termId,
        name: term.name,
        alias: term.alias,
        termGroup: term.termGroup,
        addedBy: term.addedBy,
        updatedBy: term.updatedBy,
        isActive: term.isActive,
        isDeleted: term.isDeleted,
        postDate: term.postDate,
        createdAt: term.createdAt,
        updatedAt: term.updatedAt,
    };
  
    // remove undefined values
    Object.keys(newTerm).forEach(key => newTerm[key] === undefined && delete newTerm[key]);
  
    // To validate Entity uncomment this block
    /*
     * const validate = (newTerm) => {
     *   if (!newTerm.field) {
     *       throw new Error("this field is required");
     *   }
     * }
     * validate(newTerm) 
     */
  
    return Object.freeze(newTerm);
  };