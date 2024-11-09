"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CategoryController_1 = __importDefault(require("../controller/CategoryController"));
const auth_1 = __importDefault(require("../middleware/auth"));
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router.get("/", auth_1.default, CategoryController_1.default.getAllCategories);
router.get("/:category", (0, express_validator_1.param)("category")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Category must be a valid string!"), auth_1.default, CategoryController_1.default.getRecipesByCategory);
exports.default = router;
