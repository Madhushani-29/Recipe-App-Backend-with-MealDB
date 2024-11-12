"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const favourites_1 = __importDefault(require("../models/favourites"));
const getFavouriteRecipes = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userID;
    const favourite = yield favourites_1.default.findOne({ userId });
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
        const mealPromises = recipeIds.map((recipeId) => axios_1.default.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`));
        // waiting for all promises to finish
        const mealResponses = yield Promise.all(mealPromises);
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
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Error fetching meal details from API",
                error: error.message,
            });
        }
        else {
            res
                .status(500)
                .json({ message: "Unknown error occurred", error: String(error) });
        }
    }
}));
const addFavouriteRecipes = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { recipeId } = req.body;
    const userId = req.userID;
    const favourite = yield favourites_1.default.findOne({ userId });
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
    yield favourite.save();
    res.status(200).json({
        message: "Recipe added to favourites successfully",
        favourites: favourite.favourites,
    });
}));
const removeFavouriteRecipes = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { recipeId } = req.body;
    const userId = req.userID;
    const favourite = yield favourites_1.default.findOne({ userId });
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
    yield favourite.save();
    res.status(200).json({
        message: "Recipe removed from favourites successfully",
        favourites: favourite.favourites,
    });
}));
const getSingleRecipe = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { recipeId } = req.params;
    try {
        // Fetch recipe details from the API
        const mealResponse = yield axios_1.default.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
        const meal = mealResponse.data.meals[0];
        if (!meal) {
            res.status(404).json({ message: "Recipe not found" });
            return;
        }
        res.status(200).json({
            message: "Recipe fetched successfully",
            recipe: meal,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Error fetching meal details from API",
                error: error.message,
            });
        }
        else {
            res
                .status(500)
                .json({ message: "Unknown error occurred", error: String(error) });
        }
    }
}));
exports.default = {
    getFavouriteRecipes,
    addFavouriteRecipes,
    removeFavouriteRecipes,
    getSingleRecipe,
};
