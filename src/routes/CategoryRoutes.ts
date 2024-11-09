import express from "express";
import CategoryController from "../controller/CategoryController";
import { validateUserRequest } from "../middleware/validation";
import validateToken from "../middleware/auth";

const router = express.Router();

router.get("/", validateToken, CategoryController.getAllCategories);

export default router;
