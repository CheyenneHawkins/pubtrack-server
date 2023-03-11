const documentsResolvers = require('./documents');
const usersResolvers = require('./users');


module.exports = {
    Query: {
        ...usersResolvers.Query,
        ...documentsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        // ...documentsResolvers.Mutation
    },
};