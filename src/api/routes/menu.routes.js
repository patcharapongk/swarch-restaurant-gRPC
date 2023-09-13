const express = require("express");
const menuRouter = express.Router();

const client = require("../../gRPCClient.js");

/* menuRouter will have 5 endpoints, corresponding to the gRPC services
service RestaurantService {
    rpc GetMenus(void) returns (stream MenuItem);
    rpc GetMenu(MenuId) returns (MenuItem);
    rpc CreateMenu(MenuItem) returns (MenuItem);
    rpc UpdateMenu(MenuItem) returns (MenuItem);
    rpc DeleteMenu(MenuId) returns ();
}
We call the RPC methods in the gRPC server from the REST API server.
*/

// 1. GetMenus - Get all menus
menuRouter.get("/", (req, res) => {
  function callback(err, data) {
    console.log("get '/' callback running");
    if (err) {
      res.status(err.code).send(err.details);
    } else {
      res.json(data);
    }
  }
  // call the RPC method
  client.GetMenus({}, callback);
});

// 2. GetMenu - Get a menu by ID
menuRouter.get("/:id", (req, res) => {});
menuRouter.post("/", (req, res) => {});
menuRouter.put("/:id", (req, res) => {});
menuRouter.delete("/:id", (req, res) => {});

module.exports = menuRouter;
