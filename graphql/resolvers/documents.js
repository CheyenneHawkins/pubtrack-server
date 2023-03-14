const Document = require('../../models/Document');
const { ApolloError } = require('apollo-server-express');


module.exports = {
    Mutation: {

    },
    Query: {
        getDocumentByTitle: async (_, {title, owner}) => {
            const doc = await Document.findOne({title: title})
            if (doc.owner!== owner){
                throw new ApolloError('You are not the owner of this document')
            }
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
        getDocumentsByOwner: async (_, {email}) => {
            const docs = await Document.where({owner: {email: email}})
            return docs
        },
    }
}