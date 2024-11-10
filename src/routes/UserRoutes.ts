import express from "express";
import UserController from "../controller/UserController";
import validateToken from "../middleware/auth";
import { validateLoginUserRequest, validateRegisterUserRequest } from "../middleware/validation";
const router = express.Router();

router.post(
  "/register",
  validateRegisterUserRequest,
  UserController.registerUser
);

router.post("/log-in", validateLoginUserRequest, UserController.loginUser);

// use to test authentication works properly
router.get("/current", validateToken, UserController.getCurrentUser);

export default router;
