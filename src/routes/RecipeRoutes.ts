import express from "express";
import RecipeController from "../controller/RecipeController";
import { validateUserRequest } from "../middleware/validation";
import validateToken from "../middleware/auth";
import { param } from "express-validator";

const router = express.Router();

router.get(
  "/:category",
  param("category")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Category must be a valid string!"),
  validateToken,
  RecipeController.getRecipesByCategory
);

export default router;
