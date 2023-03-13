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
        getDocumentsByOwner: async (_, {owner}) => {
            const docs = await Document.find({owner: owner})
            return docs
        },
    }
}