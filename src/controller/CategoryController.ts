import axios from "axios";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

const getAllCategories = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const response = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );

    if (response.status !== 200) {
      res
        .status(response.status)
        .json({ message: "Failed to fetch categories from the API" });
    }

    // only get category name
    const categories = response.data.categories.slice(0, 5).map(category => category.strCategory);
    res.status(200).json({ categories: categories });
  }
);

const getRecipesByCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { category } = req.params;

    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

    const response = await axios.get(url);
    const recipes = response.data.meals;

    if (recipes) {
      res.status(200).json(recipes);
    } else {
      res
        .status(404)
        .json({ message: `No recipes found for category: ${category}` });
    }
  }
);

export default {
  getAllCategories,
  getRecipesByCategory,
};
