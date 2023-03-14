const Document = require('../../models/Document');
const { ApolloError } = require('apollo-server-express');


module.exports = {
    Mutation: {
        deleteDocumentById: async (_, {id}) => {
            const deleteDoc = await Document.findByIdAndDelete({_id: id})
            return deleteDoc
        },
    },
    Query: {
        getDocumentByTitle: async (_, {title, owner}) => {
            const doc = await Document.findOne({title: title})
            if (doc.owner!== owner){
                throw new ApolloError('You are not the owner of this document')
            }
            return doc

        },
        getDocuments: async () => {
            const allDocuments = await Document.find()
            return allDocuments
        },
        getDocumentById: async (_, {id}) => {
            const doc = await Document.findById({_id: id})
            return doc
        },
        getDocumentByTitle: async (_, {title}) => {
            const doc = await Document.findOne({title: title})
            return doc
        },
        getDocumentsByOwnerId: async (_, {id} ) => {
            const docs = await Document.find({ "owner._id": id})
            return docs
        },
        getDocumentsByOwnerEmail: async (_, {email} ) => {
            const docs = await Document.find({ "owner.email": email})
            return docs
        },
    }
}