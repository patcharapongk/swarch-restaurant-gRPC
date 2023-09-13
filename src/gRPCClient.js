const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ override: true, path: path.join(__dirname, "../config.env") });

/* gRPC Client Headers */
const PROTO_PATH = path.join(__dirname, "..", "proto", "restaurant.proto");

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

const port = process.env.GRPC_SERVER_PORT;
console.log(`client port = ${port}`);

const client = new protoDescriptor.RestaurantService(
  `${process.env.GRPC_CLIENT_URL}:${port}`,
  grpc.credentials.createInsecure()
);
console.log(
  "\n----------------\ngRPC Client running at " +
    process.env.GRPC_CLIENT_URL +
    ":" +
    port +
    ""
);

module.exports = client;
