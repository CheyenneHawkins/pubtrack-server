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
        document: (_, {ID}) => Document.findById(ID),
    }
}
}