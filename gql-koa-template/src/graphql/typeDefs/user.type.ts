import {
  buildSchema,
  GraphQLID,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { signUp, logIn } from "../../services/user.services";

export const schema = buildSchema(`
    type Query {
        login(email:String!,password:String!) : AuthPayload
    }
    type Mutation {
        register(name:String!,email:String!,password:String!) : AuthPayload
        
    }
    type User {
        id: ID!
        name: String!
        email: String!
        token: String
    }
    type AuthPayload {
        token: String!
        id: ID!
    }
`);

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    token: { type: GraphQLString },
  },
});

const AuthPayload = new GraphQLObjectType({
  name: "Payload",
  fields: {
    token: { type: GraphQLString },
    id: { type: GraphQLID },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    login: {
      type: AuthPayload,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const data = await logIn(args.email, args.password);
        console.log(data);
        return data;
      },
    },
    privateRoute: {
      type: UserType,
      async resolve(parent, context) {
        //auth:
        // const user = await checkAuth(context)
        // return await userFind(user)
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: AuthPayload,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const data = await signUp(args.name, args.email, args.password);
        console.log(data);
        return data;
      },
    },
  },
});
