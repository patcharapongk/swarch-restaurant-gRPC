# swarch-restaurant-gRPC

## 2110521 - Software Architecture - 2023/1 Class

This is a gRPC backend demo for restaurant menu management. The folder structure is researched from the internet, the naming of the in-class example is rather confusing.

## How to run?

Initially, you have to

- Set mongo.env for Mongo credentials
- Set config.env for gRPC and REST API server URLs and ports

Then, spawn two terminals

- First one for `gRPCServer.js`
- The other for `restServer.js`

## Code editing guidelines

Open your IDE in 3 panes

1. `restaurant.proto` to see the schema and single/stream/repeated types.
2. `menu.routes.js` to edit the REST API endpoints. This file corresponds to `restServer.js`. The rest server acts as a gRPC client, calling the methods from gRPC server.
3. `menu.services.js` to edit the gRPC Server methods. This file corresponds to `gRPCServer.js`. This gRPC server acts as a gRPC server providing the methods for gRPC clients to call.

## FAQ

Wait, there is a `gRPCClient.js` file. If the `restServer.js` is actually a gRPC client, then, what's this?

`gRPCClient.js` is an initialised gRPC client object. Since in every client, we need to specify the gRPC headers and I don't want that to pollute the cleanliness of the `restServer.js` code. So, I decided to make it a module instead.

### Done on 13 Sept 2023, 23.12

### Written at 14 Sept 2023, 09.04

Mill :)
