import express from "express";
import UserController from "../controller/UserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateUserRequest } from "../middleware/validation";

const router = express.Router();

router.post("/register", validateUserRequest, UserController.registerUser);

// router.get("/", jwtCheck, jwtParse, UserController.getCurrentUser);

// router.post("/", jwtCheck, UserController.createCurrentUser);

// router.put(
//   "/",
//   jwtCheck,
//   jwtParse,
//   validateMyUserRequest,
//   UserController.updateCurrentUser
// );

export default router;
