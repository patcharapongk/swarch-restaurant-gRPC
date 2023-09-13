/* Prepare the database connection */
const dotenv = require("dotenv");
dotenv.config({ path: "../mongo.env" });

const mongoose = require("mongoose");
const DB_URL = process.env.MONGODB_URL;
const DB_USER = process.env.MONGODB_USER;
const DB_PASSWORD = process.env.MONGODB_PASSWORD;
const DB_NAME = process.env.MONGODB_NAME;

/* Connect to MongoDB */
const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_URL}/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.set("strictQuery", true);

// creates a non-default connection to the database
// this is useful if you want to connect to multiple databases (or just future-proofing)
const restaurantDB = mongoose.createConnection(uri);
restaurantDB.on("error", console.error.bind(console, "connection error:"));
restaurantDB.once("open", function () {
  console.log("\n------------");
  console.log("File db.js - restaurantDB.once");
  console.log("Connected to DB");
});

module.exports = restaurantDB;
