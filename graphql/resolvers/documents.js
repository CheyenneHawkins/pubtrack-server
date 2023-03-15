const Document = require('../../models/Document');
const User = require('../../models/User');

const { ApolloError } = require('apollo-server-express');


module.exports = {
    Mutation: {
        deleteDocumentById: async (_, {id}) => {
            const deleteDoc = await Document.findByIdAndDelete({_id: id})
            return deleteDoc
        },
        addOwnerToDocument: async (_, {docId, userId}) => {
            try {
                const doc = await Document.findById({_id: docId})
                const user = await User.findOne({_id: userId})

                const newOwner = {_id: userId, name: user.name, email: user.email, added: Date.now(), percentage: null}
                doc.owner.push(newOwner)
                await doc.updateOne({$set: {owner: doc.owner}})

                return doc

            } catch (error) {
                console.error(err);
                throw new Error('Failed to update owner name');
            }
        }

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
            // const owners = doc.owner.user.map(owner => owner._id)
            return doc
        },
        getDocumentByTitle: async (_, {title}) => {
            const doc = await Document.findOne({title: title})
            return doc
        },
        getDocumentsByOwnerId: async (_, {id} ) => {
            const docs = await Document.find({ owner: { $elemMatch: { _id: id } } })
            return docs
        },
        //for single owner schema
        // getDocumentsByOwnerId: async (_, {id} ) => {
        //     const docs = await Document.find({ "owner._id": id})
        //     return docs
        // },
        getDocumentsByOwnerEmail: async (_, {email} ) => {
            const docs = await Document.find({ "owner.email": email})
            return docs
        },
    }
}