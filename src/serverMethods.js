const {
  GameClient,
  StartRequest,
  DepositRequest,
  LeaveRequest,
  JoinRequest,
  CreditRequest,
  StreamRequest,
} = require("./proto/game_grpc_web_pb");

const client = new GameClient("http://178.128.85.78:8080", null, null);

const join = (username) => {
  var request = new JoinRequest();
  request.setUsername(username);
  client.join(request, {}, (error, response) => {
    if (error) {
      console.log(
        `An error with code: "${error.code}" and message: "${error.message}" ocurred. `
      );
    } else {
      window.userId = response.array[0];
      window.gameId = response.array[1];
      console.log("Joined game");
    }
  });
};

const start = () => {
  var request = new StartRequest();
  request.setGameId(window.gameId);
  client.start(request, {}, (error, response) => {
    if (error) {
      console.log(
        `An error with code: "${error.code}" and message: "${error.message}" ocurred. `
      );
    } else {
      console.log("Started game");
    }
  });
};

const credit = (amount) => {
  var request = new CreditRequest();
  request.setGameId(window.gameId);
  request.setUserId(window.userId);
  request.setValue(amount);
  client.credit(request, {}, (error, response) => {
    if (error) {
      console.log(
        `An error with code: "${error.code}" and message: "${error.message}" ocurred. `
      );
    } else {
      console.log(response);
    }
  });
};

const deposit = (amount) => {
  var request = new DepositRequest();
  request.setGameId(window.gameId);
  request.setUserId(window.userId);
  request.setValue(amount);
  client.deposit(request, {}, (error, response) => {
    if (error) {
      console.log(
        `An error with code: "${error.code}" and message: "${error.message}" ocurred. `
      );
    } else {
      console.log(response);
    }
  });
};

const leave = (amount) => {
  var request = new LeaveRequest();
  request.setGameId(window.gameId);
  request.setUserId(window.userId);
  client.leave(request, {}, (error, response) => {
    if (error) {
      console.log(
        `An error with code: "${error.code}" and message: "${error.message}" ocurred. `
      );
    } else {
      console.log(response);
    }
  });
};

const startStream = () => {
  var stream = new StreamRequest();
  stream.setGameId(window.gameId);
  return client.stream(stream, {});
};

export { join, start, credit, deposit, leave, startStream };
