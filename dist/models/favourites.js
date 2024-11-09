"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const favouriteSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    favourites: {
        type: [String],
        default: [],
        validate: {
            validator: (value) => value.every((item) => item === null || typeof item === "string"),
            message: "Favourites array can only contain strings or null",
        },
    },
});
const Favourites = mongoose_1.default.model("Favourites", favouriteSchema);
exports.default = Favourites;
