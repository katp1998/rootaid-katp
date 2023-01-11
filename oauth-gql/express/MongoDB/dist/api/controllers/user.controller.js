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
exports.findOrCreateUserController = void 0;
const passport_google_oauth20_1 = require("passport-google-oauth20");
const user_respository_1 = require("../../database/repository/user.respository");
const user_service_1 = require("../../services/user.service");
const config_1 = __importDefault(require("../../config"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
// Set up Google OAuth strategy
const googleStrategy = new passport_google_oauth20_1.Strategy({
    clientID: config_1.default.googleClient,
    clientSecret: config_1.default.googleClientSecret,
    callbackURL: config_1.default.googleRedirect,
}, (accessToken, refreshToken, profile, callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find or create the user in the database
        const user = yield (0, user_service_1.findOrCreateUser)(profile);
        // Save the access and refresh tokens in the database
        yield (0, user_respository_1.saveRefreshToken)(profile.id, refreshToken);
        return callback(null, user);
    }
    catch (error) {
        return callback(error);
    }
}));
// Handle the authentication process
const findOrCreateUserController = (rq, rs, callback) => {
    googleStrategy.authenticate(rq, (err, user, info) => {
        if (err)
            return callback(err);
        if (!user)
            return rs.redirect("/login"); //this part need to figure out in gql sense
        // Save the access and refresh tokens in the database
        (0, user_respository_1.saveRefreshToken)(user.id, info.refresh_token);
        // Set the refresh token as a cookie
        rs.cookie("refresh_token", info.refresh_token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        });
    });
};
exports.findOrCreateUserController = findOrCreateUserController;
