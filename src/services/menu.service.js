const grpc = require("@grpc/grpc-js");
const Menu = require("../models/menu.model");

async function GetMenus(call, callback) {
  try {
    const menus = await Menu.find();
    callback(null, { menus: menus });
  } catch (err) {
    callback({
      code: grpc.status.INTERNAL,
      details: "Failed to fetch menus",
    });
  }
}

async function GetMenu(call, callback) {
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
    callback(null, { menu: menu });
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
