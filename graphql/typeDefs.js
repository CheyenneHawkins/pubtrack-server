const { gql } = require('apollo-server-express');

module.exports = gql` 

type User {
    name: String
    email: String
    password: String
    token: String
}

type ops {
    insert: String
}

type DocumentData {
    ops: ops
}

type Document {
    _id: String
    title: String
    data: DocumentData
    owner: String
    createdAt: String
    updatedAt: String
}
type Gadget {
    _id: String
    title: String
    data: DocumentData
    owner: String
    createdAt: String
    updatedAt: String
}

input RegisterInput {
    name: String
    email: String
    password: String
}

input LoginInput {
    email: String
    password: String
}

input Email {
    email: String
}

type Message {
    text: String
    createdAt: String
    createdBy: String
}

input MessageInput {
    text: String
    username: String
}

type Query {
    getUserById(id: ID): User
    getUserByEmail(email: String!): User

    getDocumentById(id: String): Document
    getDocumentByTitle(title: String): Document
    getDocumentByOwner(owner: String): Document
    
    getGadgetByColor(title: String): Gadget

}

type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
}
`