const Document = require('../../models/Document');
const { ApolloError } = require('apollo-server-express');

module.exports = {
    Mutation: {
        createDocument: async (_, { content }, { db }) => {
            // Convert the Quill.js document to a string
            const contentString = JSON.stringify(content.getContents());
        
            // Insert the document into MongoDB
            const result = await db.collection('documents').insertOne({ content: contentString });
        
            // Return the created document with its ID
            return { _id: result.insertedId, content };
          },

    Query: {
        getDocumentById: async (_, {id}) => {
            const doc = await Document.findOne({_id: id})
            return doc
        },
        getDocumentByTitle: async (_, {title}) => {
            const doc = await Document.findOne({title: title})
            return {
                _id: doc._id,
                title: doc.title,
                owner: doc.owner,
                created_at: doc.created_at,
                updated_at: doc.updated_at
            }
        },
        getDocumentByOwner: async (_, {owner}) => {
            const doc = await Document.findOne({owner: owner})
            return doc
        },
    }
}
}