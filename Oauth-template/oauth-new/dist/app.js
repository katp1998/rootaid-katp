"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connection_1 = __importDefault(require("./api/database/connection"));
dotenv_1.default.config();
const PORT = 3000;
const app = (0, express_1.default)();
//Adding user routes:
app.get("/", (rq, rs) => {
    rs.send('<a href = "/auth/google">Authentication with google oauth</a>');
});
//Protected route:
app.get("/protected", (rq, rs) => {
    rs.send("this is a protected route");
});
//connecting to database:
(0, connection_1.default)();
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});
