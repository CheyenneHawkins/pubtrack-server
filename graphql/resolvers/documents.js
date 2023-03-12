const Document = require('../../models/Document');
const { ApolloError } = require('apollo-server-express');


module.exports = {
    Mutation: {

    },
    Query: {
        getDocumentByTitle: async (_, {title}) => {
            const doc = await Document.findOne({title: title})
            return doc
        },
        getDocumentById: async (_, {id}) => {
            const doc = await Document.findById({_id: id})
            return doc
        },
        getDocumentByTitle: async (_, {title}) => {
            const doc = await Document.findOne({title: title})
            return doc
        },
        getDocumentByOwner: async (_, {owner}) => {
            const doc = await Document.findOne({owner: owner})
            return doc
        },
    }
}