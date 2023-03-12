const documentsResolvers = require('./documents');
const usersResolvers = require('./users');
const gadgetsResolvers = require('./gadgets');


module.exports = {
    Query: {
        ...usersResolvers.Query,
        ...documentsResolvers.Query,
        ...gadgetsResolvers.Query,
    },
    Mutation: {
        ...usersResolvers.Mutation,
        // ...documentsResolvers.Mutation
    },
};