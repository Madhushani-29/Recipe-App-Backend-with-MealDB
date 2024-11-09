import axios from "axios";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Favourites from "../models/favourites";

const getFavouriteRecipes = async (req: Request, res: Response) => {
  res.status(200).json({ message: "Favourite recipes." });
};

const addFavouriteRecipes = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { recipeId } = req.body;
    const userId = req.userID;

    const favourite = await Favourites.findOne({ userId });

    if (!favourite) {
      res.status(404).json({
        message: "User's favourites not found",
      });
      return;
    }

    if (favourite.favourites.includes(recipeId)) {
      res.status(400).json({ message: "Recipe is already in the favourites" });
      return;
    }

    favourite.favourites.push(recipeId);

    await favourite.save();

    res.status(200).json({
      message: "Recipe added to favourites successfully",
      favourites: favourite.favourites,
    });
  }
);

const removeFavouriteRecipes = async (req: Request, res: Response) => {
  res.status(200).json({ message: "Remove recipes." });
};

export default {
  getFavouriteRecipes,
  addFavouriteRecipes,
  removeFavouriteRecipes,
};
