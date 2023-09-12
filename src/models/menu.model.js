const mongoose = require("mongoose");
const restaurantDB = require("../utils/db");

const restaurantMenuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = restaurantDB.model("Menu", restaurantMenuSchema);
