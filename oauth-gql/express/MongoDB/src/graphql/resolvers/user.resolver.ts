import { findUserByToken } from "../../database/repository/user.respository";

const resolvers = {
  Query: {
    login: async (_: any, __: any, { req }: any) => {
      // if user is not logged in, return null
      if (!req.user) return null;
      // otherwise, return the user object
      return req.user;
    },
  },
  Mutation: {
    refreshToken: async (_: any, { token }: any) => {
      const user = await findUserByToken(token);
      if (user) {
        return user;
      } else {
        throw new Error('Invalid token');
      }
    }
  }
};
export default resolvers;