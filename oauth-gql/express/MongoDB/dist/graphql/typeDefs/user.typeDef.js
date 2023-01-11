"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = typeDefs;
