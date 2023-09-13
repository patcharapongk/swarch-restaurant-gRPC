const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });

/* gRPC Client Headers */
const PROTO_PATH = "../restaurant_proto.proto";

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

const client = new protoDescriptor.RestaurantService(
  `${process.env.GRPC_CLIENT_URL}:${process.env.GRPC_CLIENT_PORT}`,
  grpc.credentials.createInsecure()
);

module.exports = client;
