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
const getAllCategories = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get("https://www.themealdb.com/api/json/v1/1/categories.php");
    if (response.status !== 200) {
        res
            .status(response.status)
            .json({ message: "Failed to fetch categories from the API" });
    }
    // only get category name
    const categories = response.data.categories.slice(0, 5).map(category => category.strCategory);
    res.status(200).json({ categories: categories });
}));
const getRecipesByCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.params;
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    const response = yield axios_1.default.get(url);
    const recipes = response.data.meals;
    if (recipes) {
        res.status(200).json(recipes);
    }
    else {
        res
            .status(404)
            .json({ message: `No recipes found for category: ${category}` });
    }
}));
exports.default = {
    getAllCategories,
    getRecipesByCategory,
};
