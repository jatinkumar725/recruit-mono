class TermMerger {
    constructor(termCollection, termTaxonomyCollection) {
        this.termCollection = termCollection;
        this.termTaxonomyCollection = termTaxonomyCollection;
    }

    mergeSingleTerm(fields = []) {
        const termData = {
            termId: this.termTaxonomyCollection.termId,
            taxonomy: this.termTaxonomyCollection.taxonomy,
            parentId: this.termTaxonomyCollection.parentId,
            count: this.termTaxonomyCollection.count,
            termTaxonomyId: this.termTaxonomyCollection.termTaxonomyId,
            name: this.termCollection.name
        };
        if (fields.length === 0) {
            return termData;
        } else {
            const filteredData = {};
            fields.forEach(field => {
                if (termData.hasOwnProperty(field)) {
                    filteredData[field] = termData[field];
                }
            });
            return filteredData;
        }
    }

    merge(fields = []) {
        const mergedData = [];

        this.termCollection.data.forEach(term => {
            const matchingTaxonomy = this.termTaxonomyCollection.data.find(taxonomy => taxonomy.termId === term.termId);
            if (matchingTaxonomy) {
                const termData = {
                    termId: matchingTaxonomy.termId,
                    taxonomy: matchingTaxonomy.taxonomy,
                    parentId: matchingTaxonomy.parentId,
                    count: matchingTaxonomy.count,
                    termTaxonomyId: matchingTaxonomy.termTaxonomyId,
                    name: term.name
                };
                if (fields.length === 0) {
                    mergedData.push(termData);
                } else {
                    const filteredData = {};
                    fields.forEach(field => {
                        if (termData.hasOwnProperty(field)) {
                            filteredData[field] = termData[field];
                        }
                    });
                    mergedData.push(filteredData);
                }
            }
        });

        return {
            data: mergedData,
            paginator: this.termCollection.paginator // Assuming both collections have the same pagination details
        };
    }
}

module.exports = TermMerger;