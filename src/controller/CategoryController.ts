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

    const categories = response.data.categories.slice(0, 5);
    res.status(200).json({ categories: categories });
  }
);

export default {
  getAllCategories,
};
