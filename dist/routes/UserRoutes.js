"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controller/UserController"));
const validation_1 = require("../middleware/validation");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post("/register", validation_1.validateUserRequest, UserController_1.default.registerUser);
router.post("/log-in", validation_1.validateUserRequest, UserController_1.default.loginUser);
// use to test authentication works properly
router.get("/current", auth_1.default, UserController_1.default.getCurrentUser);
exports.default = router;
