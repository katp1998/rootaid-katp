"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connection_1 = __importDefault(require("./database/connection"));
const config_1 = __importDefault(require("./config"));
const user_typeDef_1 = __importDefault(require("./graphql/typeDefs/user.typeDef"));
const user_resolver_1 = __importDefault(require("./graphql/resolvers/user.resolver"));
const graphql_1 = require("graphql");
const app = (0, express_1.default)();
(0, connection_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
const schema = (0, graphql_1.buildSchema)(user_typeDef_1.default);
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    schema: schema,
    rootValue: user_resolver_1.default,
    graphiql: true,
    //context: ({req}) =>({req})
}));
app.listen(config_1.default.port, () => {
    console.log(`Server running at ${config_1.default.port}`);
});
