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
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connectionString = process.env.MONGODB_CONNECTION_STRING;
        if (connectionString) {
            //asynchronous JavaScript code to pause the execution of a function until a promise is resolved or rejected
            const connect = yield mongoose_1.default.connect(connectionString);
            console.log("Database Connected !", connect.connection.host, connect.connection.name);
        }
        else {
            console.log("Cannot find the connection string !");
        }
    }
    catch (err) {
        console.log(err);
        //if there is an error exit the process
        process.exit(1);
    }
});
exports.default = connectDB;
