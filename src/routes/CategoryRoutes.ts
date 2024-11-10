import express from "express";
import CategoryController from "../controller/CategoryController";
import validateToken from "../middleware/auth";
import { param } from "express-validator";

const router = express.Router();

router.get("/", validateToken, CategoryController.getAllCategories);

router.get(
  "/:category",
  param("category")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Category must be a valid string!"),
  validateToken,
  CategoryController.getRecipesByCategory
);

export default router;
