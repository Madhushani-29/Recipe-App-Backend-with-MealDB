import axios from "axios";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Favourites from "../models/favourites";

const getFavouriteRecipes = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.userID;

    const favourite = await Favourites.findOne({ userId });

    if (!favourite) {
      res.status(404).json({ message: "User's favourites not found" });
      return;
    }

    const recipeIds = favourite.favourites;

    if (recipeIds.length === 0) {
      res
        .status(200)
        .json({ message: "No favourite recipes found", favourites: [] });
      return;
    }

    try {
      const mealPromises = recipeIds.map((recipeId) =>
        axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
        )
      );

      // waiting for all promises to finish
      const mealResponses = await Promise.all(mealPromises);

      // processing an array of API responses and
      // extracting the relevant meal data from each response
      const meals = mealResponses.map((response) => {
        const meal = response.data.meals[0];
        return {
          // extract only need attributes
          strMeal: meal.strMeal,
          strMealThumb: meal.strMealThumb,
          idMeal: meal.idMeal,
          strCategory: meal.strCategory,
        };
      });

      res.status(200).json({
        message: "Favourite recipes fetched successfully",
        favourites: meals,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({
          message: "Error fetching meal details from API",
          error: error.message,
        });
      } else {
        res
          .status(500)
          .json({ message: "Unknown error occurred", error: String(error) });
      }
    }
  }
);

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

const removeFavouriteRecipes = asyncHandler(
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

    const recipeIndex = favourite.favourites.indexOf(recipeId);
    if (recipeIndex === -1) {
      res.status(400).json({
        message: "Recipe not found in favourites",
      });
      return;
    }

    favourite.favourites.splice(recipeIndex, 1);

    await favourite.save();

    res.status(200).json({
      message: "Recipe removed from favourites successfully",
      favourites: favourite.favourites,
    });
  }
);

const getSingleRecipe = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { recipeId } = req.params;

    try {
      // Fetch recipe details from the API
      const mealResponse = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
      );

      const meal = mealResponse.data.meals[0];

      if (!meal) {
        res.status(404).json({ message: "Recipe not found" });
        return;
      }

      res.status(200).json({
        message: "Recipe fetched successfully",
        recipe: meal,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({
          message: "Error fetching meal details from API",
          error: error.message,
        });
      } else {
        res
          .status(500)
          .json({ message: "Unknown error occurred", error: String(error) });
      }
    }
  }
);

export default {
  getFavouriteRecipes,
  addFavouriteRecipes,
  removeFavouriteRecipes,
  getSingleRecipe,
};
