import express from "express";
import UserController from "../controller/UserController";
import { validateUserRequest } from "../middleware/validation";
import validateToken from "../middleware/auth";

const router = express.Router();

router.post("/register", validateUserRequest, UserController.registerUser);

router.post("/log-in", validateUserRequest, UserController.loginUser);

// use to test authentication works properly
router.get("/current", validateToken, UserController.getCurrentUser);

export default router;
