const Gadget = require('../../models/Gadget');
const { ApolloError } = require('apollo-server-express');


module.exports = {
    Mutation: {

    },
    Query: {
        getGadgetByColor: async (_, {title}) => {
            const gadget = await Gadget.findOne({title: title})
            return gadget
        },
    }
}