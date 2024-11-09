import axios from "axios";
import { Request, Response } from "express";

const getRecipesByCategory = async (req: Request, res: Response) => {
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
};

export default {
  getRecipesByCategory,
};
