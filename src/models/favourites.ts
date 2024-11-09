import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  favourites: {
    type: [String],
    default: [],
    validate: {
      validator: (value: any[]) =>
        value.every((item) => item === null || typeof item === "string"),
      message: "Favourites array can only contain strings or null",
    },
  },
});

const Favourites = mongoose.model("Favourites", favouriteSchema);

export default Favourites;
