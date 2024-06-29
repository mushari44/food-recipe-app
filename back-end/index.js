const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://musharizh56:admin@cluster0.clvs4os.mongodb.net/FoodRecipes"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

let schema = new mongoose.Schema({
  publisher: {
    type: String,
  },
  source_url: {
    type: String,
  },
  image_url: {
    type: String,
  },
  title: {
    type: String,
  },
  servings: {
    type: Number,
  },
  cooking_time: {
    type: Number,
  },
  id: {
    type: String,
    unique: true,
  },
});

const Favorites = mongoose.model("Favorite", schema);

app.get("/Favorites", function (req, res) {
  Favorites.find({}).then((favorites) => res.json(favorites));
});

app.get("/", function (req, res) {
  res.send("Welcome to the server!");
});

app.post("/Favorites/create", async function (req, res) {
  const {
    publisher,
    source_url,
    image_url,
    title,
    servings,
    cooking_time,
    id,
  } = req.body;

  const addFavorite = new Favorites({
    publisher,
    source_url,
    image_url,
    title,
    servings,
    cooking_time,
    id,
  });

  await addFavorite.save();
  res.status(201).json(addFavorite);
});

app.delete("/Favorites/delete/:id", async function (req, res) {
  try {
    const id = req.params.id;
    console.log(id);
    await Favorites.findOneAndDelete({ id });
    res.status(200).json({ message: "Favorite deleted successfully" });
  } catch (error) {
    console.log("ERROR: " + error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log("Server started on port ", PORT);
});
