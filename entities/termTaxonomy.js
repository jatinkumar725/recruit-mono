module.exports = (termTaxonomy) => {

    let newTermTaxonomy = {
        termTaxonomyId: termTaxonomy.termTaxonomyId,
        termId: termTaxonomy.termId,
        taxonomy: termTaxonomy.taxonomy,
        parentId: termTaxonomy.parentId,
        count: termTaxonomy.count,
        addedBy: termTaxonomy.addedBy,
        updatedBy: termTaxonomy.updatedBy,
        isActive: termTaxonomy.isActive,
        isDeleted: termTaxonomy.isDeleted,
        postDate: termTaxonomy.postDate,
        createdAt: termTaxonomy.createdAt,
        updatedAt: termTaxonomy.updatedAt,
    };
  
    // remove undefined values
    Object.keys(newTermTaxonomy).forEach(key => newTermTaxonomy[key] === undefined && delete newTermTaxonomy[key]);
  
    // To validate Entity uncomment this block
    /*
     * const validate = (newTerm) => {
     *   if (!newTerm.field) {
     *       throw new Error("this field is required");
     *   }
     * }
     * validate(newTerm) 
     */
  
    return Object.freeze(newTermTaxonomy);
  };