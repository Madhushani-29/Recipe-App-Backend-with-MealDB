import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/dbConnection";
import UserRoutes from "./routes/UserRoutes";
import RecipeRoutes from "./routes/RecipeRoutes";
import CategoryRoutes from "./routes/CategoryRoutes";

//create app
const app = express();

const port = process.env.PORT || 3001;

connectDB();

app.use((req, res, next) => {
  const allowedOrigins = ["http://localhost:5173", "https://recipe-app-frontend-with-meal-db.vercel.app"];
  
  if (allowedOrigins.includes(req.headers.origin)) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
  }

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

app.use(cors());

app.use(express.json());

//use to test the deployment success or not
app.get("/health", async (req: Request, res: Response) => {
  res.status(200).json({ message: "Health is ok" });
});

app.use("/api/user", UserRoutes);

app.use("/api/category", CategoryRoutes);

app.use("/api/recipes", RecipeRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
