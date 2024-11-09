import express from "express";
import RecipeController from "../controller/RecipeController";
import { validateUserRequest } from "../middleware/validation";
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

export default router;
