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

async function CreateMenu(call, callback) {
  console.log("CreateMenu callback running");
  const menu = call.request;
  console.log("menu: ", menu);
  if (!menu.name || !menu.price) {
    return callback({
      code: grpc.status.INVALID_ARGUMENT,
      details: "Menu name and price are required",
    });
  }

  try {
    const newMenu = new Menu({
      name: menu.name,
      price: menu.price,
    });
    const savedMenu = await newMenu.save();
    console.log("savedMenu: ", savedMenu);
    const menuObject = {
      id: savedMenu._id.toString(),
      name: savedMenu.name,
      price: savedMenu.price,
    };
    callback(null, menuObject);
  } catch (err) {
    callback({
      code: grpc.status.INTERNAL,
      details: "Failed to create the menu",
    });
  }
}

// ... other RPC method implementations

module.exports = {
  GetMenus,
  GetMenu,
  CreateMenu,
  // ... other exports
};
