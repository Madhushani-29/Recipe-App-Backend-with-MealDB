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
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const favourites_1 = __importDefault(require("../models/favourites"));
const registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const userAvailable = yield user_1.default.findOne({ email });
    if (userAvailable) {
        res.status(400).json({ message: "User already registered." });
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const createdUser = yield user_1.default.create({ email, password: hashedPassword });
    if (createdUser) {
        yield favourites_1.default.create({
            userId: createdUser._id,
            favourites: [],
        });
        res.status(201).json({
            message: "User registered successfully",
        });
    }
    else {
        res.status(400);
        throw new Error("User data not valid");
    }
}));
const loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_1.default.findOne({ email });
    if (user && (yield bcrypt_1.default.compare(password, user.password))) {
        const accessToken = jsonwebtoken_1.default.sign({
            user: {
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "120m" });
        res.status(200).json({ accessToken });
    }
    else {
        res.status(401).json({ message: "Email or password not correct." });
    }
}));
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({ message: "Current User", userId: req.userID });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error finding the user" });
    }
});
exports.default = {
    getCurrentUser,
    registerUser,
    loginUser,
};
