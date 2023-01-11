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
exports.findOrCreateUser = void 0;
const user_respository_1 = require("../database/repository/user.respository");
//findorcreateuser:
const findOrCreateUser = (profile) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //check if the user already exists:
        const existingUser = yield (0, user_respository_1.findUser)(profile.emails[0].value);
        if (!existingUser) {
            //create a new user:
            const newUser = {
                username: profile.displayName,
                email: profile.emails[0].value,
            };
            const createdNewUser = yield (0, user_respository_1.createUser)(newUser);
            return createdNewUser;
        }
        else {
            //return the existing user:
            return existingUser;
        }
    }
    catch (error) {
        return error;
    }
});
exports.findOrCreateUser = findOrCreateUser;
