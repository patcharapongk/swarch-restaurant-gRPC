/* Headers */

const PROTO_PATH = "../restaurant_proto.proto";

const grpc = require("grpc");
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
dotenv.config({ path: "../config.env" });

// starting a server
const server_URL = process.env.SERVER_URL || "localhost";
const port = process.env.PORT || 50051;

server.bind(`${server_URL}:${port}`, grpc.ServerCredentials.createInsecure());
console.log(`Server running at ${server_URL}:${port}`);
server.start();
