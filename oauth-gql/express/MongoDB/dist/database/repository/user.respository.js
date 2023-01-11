"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeRefreshToken = exports.findUserById = exports.saveRefreshToken = exports.findUserByToken = exports.findUser = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const createUser = ({ username, email }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new user_model_1.default({
            username,
            email,
        });
        const userResult = yield user.save();
        return userResult;
    }
    catch (error) {
        return error;
    }
});
exports.createUser = createUser;
const findUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield user_model_1.default.findOne({ email: email });
        return existingUser;
    }
    catch (error) { }
});
exports.findUser = findUser;
const findUserByToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield user_model_1.default.findOne({
            refreshToken: refreshToken,
        });
        return existingUser;
    }
    catch (error) { }
});
exports.findUserByToken = findUserByToken;
const saveRefreshToken = (userID, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default
        .findById(userID)
        .findOneAndUpdate({ refreshToken: refreshToken });
    const result = yield (user === null || user === void 0 ? void 0 : user.save());
    //  console.log(result)
});
exports.saveRefreshToken = saveRefreshToken;
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield user_model_1.default
            .findById(id)
            .select("-password")
            .select("-refreshToken");
        console.log({ existingUser });
        return existingUser;
    }
    catch (error) {
        return {
            error: "error",
        };
    }
});
exports.findUserById = findUserById;
const removeRefreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, exports.findUserByToken)(refreshToken);
        if (user) {
            user.refreshToken = "";
            const result = yield user.save();
            console.log(result);
        }
    }
    catch (error) { }
});
exports.removeRefreshToken = removeRefreshToken;
