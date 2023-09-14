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

async function UpdateMenu(call, callback) {
  console.log("UpdateMenu callback running");
  const newmenu = call.request;
  const menuId = call.request.id;
  if (!menuId) {
    return callback({
      code: grpc.status.INVALID_ARGUMENT,
      details: "Menu ID is required for updating",
    });
  }
  if (!newmenu.name || !newmenu.price) {
    return callback({
      code: grpc.status.INVALID_ARGUMENT,
      details: "Menu name and price are required",
    });
  }

  try {
    filter = { _id: menuId };
    update = { name: newmenu.name, price: newmenu.price };
    const doc = await Menu.findOneAndUpdate(filter, update, {
      new: true,
    });
    if (!doc) {
      return callback({
        code: grpc.status.NOT_FOUND,
        details: "Menu not found",
      });
    }
    console.log("doc: ", doc);
    callback(null, doc);
  } catch (err) {
    callback({
      code: grpc.status.INTERNAL,
      details: "Failed to update the menu",
    });
  }
}
async function DeleteMenu(call, callback) {
  console.log("DeleteMenu callback running");
  const menuId = call.request.id;
  if (!menuId) {
    return callback({
      code: grpc.status.INVALID_ARGUMENT,
      details: "Menu ID is required for deleting",
    });
  }

  try {
    const menu = await Menu.findByIdAndDelete(menuId);
    if (!menu) {
      return callback({
        code: grpc.status.NOT_FOUND,
        details: "Menu not found",
      });
    }
    callback(null, {});
  } catch (err) {
    callback({
      code: grpc.status.INTERNAL,
      details: "Failed to delete the menu",
    });
  }
}
// ... other RPC method implementations

module.exports = {
  GetMenus,
  GetMenu,
  CreateMenu,
  UpdateMenu,
  DeleteMenu,
  // ... other exports
};
