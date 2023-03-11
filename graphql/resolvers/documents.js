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
            const doc = await Document.findById({id: id})
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
}