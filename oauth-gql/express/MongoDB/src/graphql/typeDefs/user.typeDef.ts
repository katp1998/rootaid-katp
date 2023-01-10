const typeDefs = `
  type User {
    username: String!
    email: String!
  }
  
  type Query {
    me: User
  }

  type Mutation {
    refreshToken(token: String!): User
  }
`;
export default typeDefs;