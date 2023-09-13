const express = require("express");
const menuRouter = express.Router();

const client = require("../../gRPCClient.js");
const gRPCtoHTTPstatus = require("../../utils/gRPCtoHTTPstatus");

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
      let httpStatus = gRPCtoHTTPstatus(err.code);
      res.status(httpStatus).send(err.details);
    } else {
      res.json(data);
    }
  }
  // call the RPC method
  client.GetMenus({}, callback);
});

// 2. GetMenu - Get a menu by ID
menuRouter.get("/:id", (req, res) => {
  function callback(err, data) {
    console.log("get '/:id' callback running");
    console.log("req.params: ", req.params);
    console.log("req.params.id: ", req.params.id);
    if (err) {
      let httpStatus = gRPCtoHTTPstatus(err.code);
      res.status(httpStatus).send(err.details);
    } else {
      console.log(data);
      res.json(data);
    }
  }
  // call the RPC method
  client.GetMenu({ id: req.params.id.trim() }, callback);
});

// 3. CreateMenu - Create a new menu
menuRouter.post("/", (req, res) => {
  function callback(err, data) {
    console.log("post '/' callback running");
    if (err) {
      let httpStatus = gRPCtoHTTPstatus(err.code);
      res.status(httpStatus).send(err.details);
    } else {
      res.json(data);
    }
  }
  // call the RPC method
  client.CreateMenu(req.body, callback);
});
menuRouter.put("/:id", (req, res) => {
  function callback(err, data) {
    console.log("put '/:id' callback running");
    if (err) {
      let httpStatus = gRPCtoHTTPstatus(err.code);
      res.status(httpStatus).send(err.details);
    } else {
      res.json(data);
    }
  }
  client.UpdateMenu(req.body, callback);
});
menuRouter.delete("/:id", (req, res) => {
  function callback(err, data) {
    console.log("delete '/:id' callback running");
    if (err) {
      let httpStatus = gRPCtoHTTPstatus(err.code);
      res.status(httpStatus).send(err.details);
    } else {
      res.json(data);
    }
  }
  client.DeleteMenu({ id: req.params.id.trim() }, callback);
});

module.exports = menuRouter;
