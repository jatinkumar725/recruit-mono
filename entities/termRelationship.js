module.exports = (termRelationship) => {

    let newTermRelationship = {
        objectId: termRelationship.objectId,
        termTaxonomyId: termRelationship.termTaxonomyId,
        model_type: termRelationship.model_type,
        termOrder: termRelationship.termOrder,
        objectGroup: termRelationship.objectGroup,
        addedBy: termRelationship.addedBy,
        updatedBy: termRelationship.updatedBy,
        isActive: termRelationship.isActive,
        isDeleted: termRelationship.isDeleted,
        postDate: termRelationship.postDate,
        createdAt: termRelationship.createdAt,
        updatedAt: termRelationship.updatedAt,
    };
  
    // remove undefined values
    Object.keys(newTermRelationship).forEach(key => newTermRelationship[key] === undefined && delete newTermRelationship[key]);
  
    // To validate Entity uncomment this block
    /*
     * const validate = (newTerm) => {
     *   if (!newTerm.field) {
     *       throw new Error("this field is required");
     *   }
     * }
     * validate(newTerm) 
     */
  
    return Object.freeze(newTermRelationship);
  };