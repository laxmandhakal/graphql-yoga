/* building GraphQL Schema */
module.exports = `
type userData {
    _id: ID!
    username: String!
    createdAt:String!
    updatedAt:String!
    email: String!
	password: String!
    phonenumber: Float
    token:String!
}

type chatinfo{
    _id:ID!
    message:String!
    createdAt:String!
    updatedAt:String!
    }

input userInput{
    username: String!
    phonenumber: Float
    password: String!
	email: String!
	
}

type RootQuery {
    userList: [userData!]!
    chat:chatinfo
}

type DeleteRes{
    response:String!
}
type token{
    token:String!
}

type RootMutation {
    createUser(newUser: userInput): userData!
    deleteUser(username: String! password:String!): DeleteRes!
    login(username:String! password:String!):token!
    addMessage(message:String!):chatinfo!
}

type Subscription{
    chat: chatinfo!
}

schema {
    query: RootQuery
    mutation: RootMutation
    subscription: Subscription
}
`;