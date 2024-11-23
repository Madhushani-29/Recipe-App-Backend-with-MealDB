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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const dbConnection_1 = __importDefault(require("./config/dbConnection"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const RecipeRoutes_1 = __importDefault(require("./routes/RecipeRoutes"));
const CategoryRoutes_1 = __importDefault(require("./routes/CategoryRoutes"));
//create app
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
(0, dbConnection_1.default)();
app.use((req, res, next) => {
    const allowedOrigins = ["http://localhost:5173", "https://recipe-app-frontend-with-meal-db.vercel.app"];
    if (allowedOrigins.includes(req.headers.origin)) {
        res.header("Access-Control-Allow-Origin", req.headers.origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//use to test the deployment success or not
app.get("/health", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: "Health is ok" });
}));
app.use("/api/user", UserRoutes_1.default);
app.use("/api/category", CategoryRoutes_1.default);
app.use("/api/recipes", RecipeRoutes_1.default);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
