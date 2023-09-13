// REST API server (gRPC Client)

const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "../../config.env") });

/* REST API using Express */
const express = require("express");
const app = express();

const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// importing routes
const menuRouter = require("./routes/menu.routes");

// routes
app.use("/api/menus", menuRouter);

// starting a server
const port = process.env.REST_SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(
    `\n----------------\n REST API Server running on port ${port}...`
  );
});
