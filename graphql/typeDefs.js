const { gql } = require('apollo-server-express');


module.exports = gql`

scalar Date

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
    created_at: Date
    updated_at: Date
}

type DocumentData {
    ops: ops
}

type ops {
    insert: String
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

input DocumentInput {
    content: String
    db: String
}


type Query {
    getUserById(id: ID): User
    getUserByEmail(email: String!): User

    getDocumentById(id: ID): Document
    getDocumentByTitle(title: String): Document
    getDocumentByOwner(owner: String): Document


}

type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
    # createDocument(input: DocumentInput ): Document

}
`