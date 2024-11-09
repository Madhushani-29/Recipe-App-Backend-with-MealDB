import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400).json({ message: "User already registered." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = await User.create({ email, password: hashedPassword });

  if (createdUser) {
    res.status(201).json({
      message: "User registered successfully",
    });
  } else {
    res.status(400);
    throw new Error("User data not valid");
  }
});

const loginUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: "120m" }
      );

      res.status(200).json({ accessToken });
    } else {
      res.status(401).json({ message: "Email or password not correct." });
    }
  }
);

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Current User", userId: req.userID });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error finding the user" });
  }
};

export default {
  getCurrentUser,
  registerUser,
  loginUser,
};
