import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/dbConnection";
import UserRoutes from "./routes/UserRoutes";
import MyRestaurantRoutes from "./routes/MyRestaurantRoutes";
import { v2 as cloudinary } from "cloudinary";
import RestaurantRoutes from "./routes/RestaurantRoutes";
import OrderRoutes from "./routes/OrderRoutes";

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
// app.use("/api/my/restaurant", MyRestaurantRoutes);
// app.use("/api/restaurant", RestaurantRoutes);
// app.use("/api/order", OrderRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
