const { gql } = require('apollo-server-express');

module.exports = gql`

type User {
    name: String
    email: String
    password: String
    token: String
}

type Document {
    _id: String
    title: String
    data: String
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
    # user(id: ID): User
    user(email: String): User
    document(id: ID): Document
}


type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
    # findDocument(id: ID): Document
}
`