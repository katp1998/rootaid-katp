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
Object.defineProperty(exports, "__esModule", { value: true });
const user_respository_1 = require("../../database/repository/user.respository");
const resolvers = {
    Query: {
        login: (_, __, { req }) => __awaiter(void 0, void 0, void 0, function* () {
            // if user is not logged in, return null
            if (!req.user)
                return null;
            // otherwise, return the user object
            return req.user;
        }),
    },
    Mutation: {
        refreshToken: (_, { token }) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield (0, user_respository_1.findUserByToken)(token);
            if (user) {
                return user;
            }
            else {
                throw new Error('Invalid token');
            }
        })
    }
};
exports.default = resolvers;
