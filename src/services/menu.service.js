const grpc = require("@grpc/grpc-js");
const Menu = require("../models/menu.model");

async function GetMenus(call, callback) {
  try {
    const menus = await Menu.find();
    callback(null, { menus: menus });
  } catch (err) {
    const error = new Error("Failed to fetch menus");
    error.code = grpc.status.INTERNAL;
    callback(error);
  }
}

async function GetMenu(call, callback) {
  console.log("GetMenu callback running");
  console.log("call: ", call);
  const menuId = call.request.id;
  if (!menuId) {
    return callback({
      code: grpc.status.INVALID_ARGUMENT,
      details: "Menu ID is required",
    });
  }

  try {
    const menu = await Menu.findById(menuId);
    if (!menu) {
      return callback({
        code: grpc.status.NOT_FOUND,
        details: "Menu not found",
      });
    }
    console.log("menu: ", menu._id.toString());
    const menuObject = {
      id: menu._id.toString(),
      name: menu.name,
      price: menu.price,
    };
    callback(null, menuObject);
  } catch (err) {
    callback({
      code: grpc.status.INTERNAL,
      details: "Failed to fetch the menu",
    });
  }
}

// ... other RPC method implementations

module.exports = {
  GetMenus,
  GetMenu,
  // ... other exports
};
