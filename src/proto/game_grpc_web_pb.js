/**
 * @fileoverview gRPC-Web generated client stub for server
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.server = require('./game_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.server.GameClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.server.GamePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.server.JoinRequest,
 *   !proto.server.JoinResponse>}
 */
const methodDescriptor_Game_Join = new grpc.web.MethodDescriptor(
  '/server.Game/Join',
  grpc.web.MethodType.UNARY,
  proto.server.JoinRequest,
  proto.server.JoinResponse,
  /**
   * @param {!proto.server.JoinRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.server.JoinResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.server.JoinRequest,
 *   !proto.server.JoinResponse>}
 */
const methodInfo_Game_Join = new grpc.web.AbstractClientBase.MethodInfo(
  proto.server.JoinResponse,
  /**
   * @param {!proto.server.JoinRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.server.JoinResponse.deserializeBinary
);


/**
 * @param {!proto.server.JoinRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.server.JoinResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.server.JoinResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.server.GameClient.prototype.join =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/server.Game/Join',
      request,
      metadata || {},
      methodDescriptor_Game_Join,
      callback);
};


/**
 * @param {!proto.server.JoinRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.server.JoinResponse>}
 *     Promise that resolves to the response
 */
proto.server.GamePromiseClient.prototype.join =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/server.Game/Join',
      request,
      metadata || {},
      methodDescriptor_Game_Join);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.server.LeaveRequest,
 *   !proto.server.LeaveResponse>}
 */
const methodDescriptor_Game_Leave = new grpc.web.MethodDescriptor(
  '/server.Game/Leave',
  grpc.web.MethodType.UNARY,
  proto.server.LeaveRequest,
  proto.server.LeaveResponse,
  /**
   * @param {!proto.server.LeaveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.server.LeaveResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.server.LeaveRequest,
 *   !proto.server.LeaveResponse>}
 */
const methodInfo_Game_Leave = new grpc.web.AbstractClientBase.MethodInfo(
  proto.server.LeaveResponse,
  /**
   * @param {!proto.server.LeaveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.server.LeaveResponse.deserializeBinary
);


/**
 * @param {!proto.server.LeaveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.server.LeaveResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.server.LeaveResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.server.GameClient.prototype.leave =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/server.Game/Leave',
      request,
      metadata || {},
      methodDescriptor_Game_Leave,
      callback);
};


/**
 * @param {!proto.server.LeaveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.server.LeaveResponse>}
 *     Promise that resolves to the response
 */
proto.server.GamePromiseClient.prototype.leave =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/server.Game/Leave',
      request,
      metadata || {},
      methodDescriptor_Game_Leave);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.server.StartRequest,
 *   !proto.server.StartResponse>}
 */
const methodDescriptor_Game_Start = new grpc.web.MethodDescriptor(
  '/server.Game/Start',
  grpc.web.MethodType.UNARY,
  proto.server.StartRequest,
  proto.server.StartResponse,
  /**
   * @param {!proto.server.StartRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.server.StartResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.server.StartRequest,
 *   !proto.server.StartResponse>}
 */
const methodInfo_Game_Start = new grpc.web.AbstractClientBase.MethodInfo(
  proto.server.StartResponse,
  /**
   * @param {!proto.server.StartRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.server.StartResponse.deserializeBinary
);


/**
 * @param {!proto.server.StartRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.server.StartResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.server.StartResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.server.GameClient.prototype.start =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/server.Game/Start',
      request,
      metadata || {},
      methodDescriptor_Game_Start,
      callback);
};


/**
 * @param {!proto.server.StartRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.server.StartResponse>}
 *     Promise that resolves to the response
 */
proto.server.GamePromiseClient.prototype.start =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/server.Game/Start',
      request,
      metadata || {},
      methodDescriptor_Game_Start);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.server.CreditRequest,
 *   !proto.server.CreditResponse>}
 */
const methodDescriptor_Game_Credit = new grpc.web.MethodDescriptor(
  '/server.Game/Credit',
  grpc.web.MethodType.UNARY,
  proto.server.CreditRequest,
  proto.server.CreditResponse,
  /**
   * @param {!proto.server.CreditRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.server.CreditResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.server.CreditRequest,
 *   !proto.server.CreditResponse>}
 */
const methodInfo_Game_Credit = new grpc.web.AbstractClientBase.MethodInfo(
  proto.server.CreditResponse,
  /**
   * @param {!proto.server.CreditRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.server.CreditResponse.deserializeBinary
);


/**
 * @param {!proto.server.CreditRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.server.CreditResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.server.CreditResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.server.GameClient.prototype.credit =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/server.Game/Credit',
      request,
      metadata || {},
      methodDescriptor_Game_Credit,
      callback);
};


/**
 * @param {!proto.server.CreditRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.server.CreditResponse>}
 *     Promise that resolves to the response
 */
proto.server.GamePromiseClient.prototype.credit =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/server.Game/Credit',
      request,
      metadata || {},
      methodDescriptor_Game_Credit);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.server.DepositRequest,
 *   !proto.server.DepositResponse>}
 */
const methodDescriptor_Game_Deposit = new grpc.web.MethodDescriptor(
  '/server.Game/Deposit',
  grpc.web.MethodType.UNARY,
  proto.server.DepositRequest,
  proto.server.DepositResponse,
  /**
   * @param {!proto.server.DepositRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.server.DepositResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.server.DepositRequest,
 *   !proto.server.DepositResponse>}
 */
const methodInfo_Game_Deposit = new grpc.web.AbstractClientBase.MethodInfo(
  proto.server.DepositResponse,
  /**
   * @param {!proto.server.DepositRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.server.DepositResponse.deserializeBinary
);


/**
 * @param {!proto.server.DepositRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.server.DepositResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.server.DepositResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.server.GameClient.prototype.deposit =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/server.Game/Deposit',
      request,
      metadata || {},
      methodDescriptor_Game_Deposit,
      callback);
};


/**
 * @param {!proto.server.DepositRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.server.DepositResponse>}
 *     Promise that resolves to the response
 */
proto.server.GamePromiseClient.prototype.deposit =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/server.Game/Deposit',
      request,
      metadata || {},
      methodDescriptor_Game_Deposit);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.server.LotteryRequest,
 *   !proto.server.LotteryResponse>}
 */
const methodDescriptor_Game_Lottery = new grpc.web.MethodDescriptor(
  '/server.Game/Lottery',
  grpc.web.MethodType.UNARY,
  proto.server.LotteryRequest,
  proto.server.LotteryResponse,
  /**
   * @param {!proto.server.LotteryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.server.LotteryResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.server.LotteryRequest,
 *   !proto.server.LotteryResponse>}
 */
const methodInfo_Game_Lottery = new grpc.web.AbstractClientBase.MethodInfo(
  proto.server.LotteryResponse,
  /**
   * @param {!proto.server.LotteryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.server.LotteryResponse.deserializeBinary
);


/**
 * @param {!proto.server.LotteryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.server.LotteryResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.server.LotteryResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.server.GameClient.prototype.lottery =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/server.Game/Lottery',
      request,
      metadata || {},
      methodDescriptor_Game_Lottery,
      callback);
};


/**
 * @param {!proto.server.LotteryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.server.LotteryResponse>}
 *     Promise that resolves to the response
 */
proto.server.GamePromiseClient.prototype.lottery =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/server.Game/Lottery',
      request,
      metadata || {},
      methodDescriptor_Game_Lottery);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.server.StreamRequest,
 *   !proto.server.StreamResponse>}
 */
const methodDescriptor_Game_Stream = new grpc.web.MethodDescriptor(
  '/server.Game/Stream',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.server.StreamRequest,
  proto.server.StreamResponse,
  /**
   * @param {!proto.server.StreamRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.server.StreamResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.server.StreamRequest,
 *   !proto.server.StreamResponse>}
 */
const methodInfo_Game_Stream = new grpc.web.AbstractClientBase.MethodInfo(
  proto.server.StreamResponse,
  /**
   * @param {!proto.server.StreamRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.server.StreamResponse.deserializeBinary
);


/**
 * @param {!proto.server.StreamRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.server.StreamResponse>}
 *     The XHR Node Readable Stream
 */
proto.server.GameClient.prototype.stream =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/server.Game/Stream',
      request,
      metadata || {},
      methodDescriptor_Game_Stream);
};


/**
 * @param {!proto.server.StreamRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.server.StreamResponse>}
 *     The XHR Node Readable Stream
 */
proto.server.GamePromiseClient.prototype.stream =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/server.Game/Stream',
      request,
      metadata || {},
      methodDescriptor_Game_Stream);
};


module.exports = proto.server;

