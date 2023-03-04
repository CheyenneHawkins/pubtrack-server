const { gql } = require('apollo-server-express');

module.exports = gql`

type User {
    email: String
    password: String
    token: String
}

input RegisterInput {
    email: String
    password: String
}

input LoginInput {
    email: String
    password: String
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
    user(id: ID!): User
}

type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
}
`