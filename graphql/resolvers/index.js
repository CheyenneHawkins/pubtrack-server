const usersResolvers = require('./users');
const documentsResolvers = require('./documents');



module.exports = {
    Query: {
        ...usersResolvers.Query,
        ...documentsResolvers.Query,
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...documentsResolvers.Mutation,
    },
};