"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongo_uri = "mongodb+srv://kethmieperera:kat123@kattesting.xeri85k.mongodb.net/test" ||
    process.env.MONGO_URI;
exports.default = () => {
    mongoose_1.default.set("strictQuery", true);
    mongoose_1.default.connect(`${mongo_uri}`);
    console.log("Database Connected");
    mongoose_1.default.connection.on("error", (e) => {
        console.error(`Database connection unsuccessful: Error ${e}`);
    });
};
