import express, { Express, request, Request, Response } from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";

import connection from "./database/connection";
import config from "./config";
import typeDefs from "./graphql/typeDefs/user.typeDef";
import resolvers from "./graphql/resolvers/user.resolver";
import { buildSchema, print } from "graphql";

const app: Express = express();

connection();

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());

const schema = buildSchema(typeDefs);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
    //context: ({req}) =>({req})
  })
);

app.listen(config.port, () => {
  console.log(`Server running at ${config.port}`);
});
