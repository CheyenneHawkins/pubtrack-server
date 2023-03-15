const { gql } = require('apollo-server-express');


module.exports = gql`

scalar Date

type User {
    _id: String
    name: String
    email: String
    password: String
    token: String
}

type Document {
    _id: String
    title: String
    data: String
    owner: [Owner]
    created_at: Date
    updated_at: Date
}


type DocumentData {
    ops: ops
}

type ops {
    insert: String
}

type Owner {
    _id: String
    name: String
    email: String
    added: Date
    # user: User
    percentage: Int
}

input OwnerInput {
    _id: String
    name: String
    email: String
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

    getDocuments: [Document]
    getDocumentById(id: ID): Document
    getDocumentByTitle(title: String, owner: String): Document

    getDocumentsByOwnerId(id: String): [Document]
    getDocumentsByOwnerEmail(email: String): [Document]

    getDocumentByEmail(email: String!): Document


}

type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
    deleteDocumentById(id: String): Document
    addOwnerToDocument(docId: String, userId: String): Document
    # createDocument(input: DocumentInput ): Document

}
`