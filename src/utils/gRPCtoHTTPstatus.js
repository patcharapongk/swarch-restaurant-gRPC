const grpc = require("@grpc/grpc-js");
function mapGrpcToHttpStatus(grpcCode) {
  switch (grpcCode) {
    case grpc.status.OK:
      return 200; // OK

    case grpc.status.CANCELLED:
      return 499; // Client Closed Request (common use case)

    case grpc.status.UNKNOWN:
      return 500; // Internal Server Error

    case grpc.status.INVALID_ARGUMENT:
      return 400; // Bad Request

    case grpc.status.DEADLINE_EXCEEDED:
      return 504; // Gateway Timeout

    case grpc.status.NOT_FOUND:
      return 404; // Not Found

    case grpc.status.ALREADY_EXISTS:
      return 409; // Conflict

    case grpc.status.PERMISSION_DENIED:
      return 403; // Forbidden

    case grpc.status.UNAUTHENTICATED:
      return 401; // Unauthorized

    case grpc.status.RESOURCE_EXHAUSTED:
      return 429; // Too Many Requests

    case grpc.status.FAILED_PRECONDITION:
      return 412; // Precondition Failed

    case grpc.status.ABORTED:
      return 409; // Conflict

    case grpc.status.OUT_OF_RANGE:
      return 400; // Bad Request

    case grpc.status.UNIMPLEMENTED:
      return 501; // Not Implemented

    case grpc.status.INTERNAL:
      return 500; // Internal Server Error

    case grpc.status.UNAVAILABLE:
      return 503; // Service Unavailable

    case grpc.status.DATA_LOSS:
      return 500; // Internal Server Error

    default:
      return 500; // default to Internal Server Error
  }
}

module.exports = mapGrpcToHttpStatus;
