"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RecipeController_1 = __importDefault(require("../controller/RecipeController"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.get("/favourites", auth_1.default, RecipeController_1.default.getFavouriteRecipes);
router.patch("/favourites/add", auth_1.default, RecipeController_1.default.addFavouriteRecipes);
router.patch("/favourites/remove", auth_1.default, RecipeController_1.default.removeFavouriteRecipes);
router.get("/recipe/:recipeId", auth_1.default, RecipeController_1.default.getSingleRecipe);
exports.default = router;
