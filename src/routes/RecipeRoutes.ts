import express from "express";
import RecipeController from "../controller/RecipeController";
import validateToken from "../middleware/auth";
import { param } from "express-validator";

const router = express.Router();

router.get("/favourites", validateToken, RecipeController.getFavouriteRecipes);

router.patch(
  "/favourites/add",
  validateToken,
  RecipeController.addFavouriteRecipes
);

router.patch(
  "/favourites/remove",
  validateToken,
  RecipeController.removeFavouriteRecipes
);

router.get(
  "/recipe/:recipeId",
  validateToken,
  RecipeController.getSingleRecipe
);
export default router;
