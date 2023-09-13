/* Headers */

const PROTO_PATH = "../proto/restaurant.proto";

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const pkgDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const protoDescriptor = grpc.loadPackageDefinition(pkgDefinition);

const restaurantProto = protoDescriptor;

/* Server */

// Node automatically looks for index.js files in folders
const services = require("./services");

// initing a server
const server = new grpc.Server();
server.addService(
  restaurantProto.RestaurantService.service,
  services.MenuService
);

const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ override: true, path: path.join(__dirname, "../config.env") });

// starting a server
const server_URL = process.env.SERVER_URL || "localhost";
const port = process.env.GRPC_SERVER_PORT || 6969;

server.bindAsync(
  `${server_URL}:${port}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
  }
);
console.log(`\n----------------\ngRPC Server running at ${server_URL}:${port}`);
