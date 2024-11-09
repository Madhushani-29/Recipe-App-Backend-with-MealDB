import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/dbConnection";
import UserRoutes from "./routes/UserRoutes";
import CategoryRoutes from "./routes/CategoryRoutes";
import RecipeRoutes from "./routes/RecipeRoutes";

//create app
const app = express();

const port = process.env.PORT || 3001;

connectDB();

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
