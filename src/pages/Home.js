import React from "react";
import CardWithInput from "../components/CardWithInput";
import ScoreBoard from "../components/Scoreboard";
import LogBoard from "../components/LogBoard";
import SimpleCard from "../components/SimpleCard";
import Timer from "../components/Timer";
import RiddleCard from "../components/RiddleCard";
import Lottery from "../components/Lottery";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
const {
  GameClient,
  StartRequest,
  DepositRequest,
  LeaveRequest,
  JoinRequest,
  CreditRequest,
  StreamRequest,
} = require("../proto/game_grpc_web_pb");

const client = new GameClient("http://178.128.85.78:8080", null, null);

// TODO: use credit and deposit as part of onclick method for buttons, passing the value in the forms

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      started: false,
      playerList: [],
      logList: [],
      time: 0,
      riddle: {
        question: "Which is the first Pokemon?",
        variantA: "Bulbasaur",
        variantB: "Mew",
        variantC: "Rhydon",
        variantD: "Arceus",
      },
      points: 0,
      prizeList: [],
    };

    var request = new JoinRequest();
    request.setUsername(window.nickname);
    client.join(request, {}, (error, response) => {
      if (error) {
        console.log(
          `An error with code: "${error.code}" and message: "${error.message}" ocurred. `
        );
      } else {
        this.userId = response.array[0];
        this.gameId = response.array[1];
        console.log("Joined game");
        this.parseJoin(response.array);

        // Start stream
        var stream = new StreamRequest();
        stream.setGameId(this.gameId);
        stream.setUserId(this.userId);
        this.game = client.stream(stream, {});
        this.game.on("data", (data) => {
          console.log(data.array);
          this.parseStream(data.array);
          // this.setState(data.getMessage())
        });
      }
    });
  }

  start = () => {
    var request = new StartRequest();
    request.setGameId(this.gameId);
    client.start(request, {}, (error, response) => {
      if (error) {
        console.log(
          `An error with code: "${error.code}" and message: "${error.message}" ocurred. `
        );
      } else {
        console.log("Started game");
        this.setState({
          ...this.state,
          started: true,
          logList: [{ event: "The game has started" }],
        });
      }
    });
  };

  parseJoin = (response) => {
    const playerList = this.updateScoreboard(response[2]);
    this.setState({
      ...this.state,
      playerList: playerList,
      time: response[3],
      points: response[4],
    });
  };

  updateScoreboard = (scores) => {
    let playerList = [];
    if (!this.players && this.state.started) {
      this.players = {};
      scores.forEach((player) => {
        if (player[1] != "bank") {
          playerList.push({
            id: player[0],
            me: player[0] == this.userId,
            nickName: player[1],
            score: player[2],
          });
          this.players[player[0]] = player[1];
        }
      });
      playerList = playerList.sort((a, b) => b.score - a.score);
      this.players[this.userId] = "You";
    } else
      scores.forEach((player) => {
        if (player[1] != "bank") {
          playerList.push({
            id: player[0],
            me: player[0] == this.userId,
            nickName: player[1],
            score: player[2],
          });
        }
      });
    playerList = playerList.sort((a, b) => b.score - a.score);
    return playerList;
  };

  depositHandler = (amount) => {
    if (!this.state.started) return alert("The game has not started yet");
    var request = new DepositRequest();
    request.setGameId(this.gameId);
    request.setUserId(this.userId);
    request.setValue(amount);
    client.deposit(request, {}, (error, response) => {
      if (error) {
        console.log(
          `An error with code: "${error.code}" and message: "${error.message}" ocurred. `
        );
      } else {
        console.log(response.array);
      }
    });
  };

  creditHandler = (amount) => {
    if (!this.state.started) return alert("The game has not started yet");
    var request = new CreditRequest();
    request.setGameId(this.gameId);
    request.setUserId(this.userId);
    request.setValue(amount);
    client.credit(request, {}, (error, response) => {
      if (error) {
        console.log(
          `An error with code: "${error.code}" and message: "${error.message}" ocurred. `
        );
      } else {
        console.log(response.array);
      }
    });
  };

  // TODO: edit this function
  parseStream = (data) => {
    window.dd = data;
    const newJoin = data[0];
    const start = data[2];
    const transactions = data[4];
    var playerList;
    var logList = [];

    if (newJoin) {
      playerList = [
        ...this.state.playerList,
        ...this.updateScoreboard(newJoin),
      ];
    }

    if (start && !this.state.started) {
      this.setState({ ...this.state, started: true });
      logList.unshift({ event: "The game has started" });
    }

    if (transactions) {
      const newScores = transactions[0];
      const creditEvents = transactions[1];
      const depositEvents = transactions[2];
      const creditReturnEvents = transactions[3];
      const depositReturnEvents = transactions[4];
      const thefts = transactions[5];

      if (newScores) playerList = this.updateScoreboard(newScores);
      if (creditEvents)
        logList.unshift({
          event: `${this.players[creditEvents[0]]} received a credit of ${
            creditEvents[1]
          }$`,
        });
      if (depositEvents)
        logList.unshift({
          event: `${this.players[depositEvents[0]]} deposited ${
            depositEvents[1]
          }$`,
        });
    }

    this.setState({
      ...this.state,
      playerList: playerList || this.state.playerList,
      logList: [...logList, ...this.state.logList],
    });
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <h1 className="heading-primary">Secret Game</h1>
          <div className="content">
            <div className="cards-section">
              <div className="simple-cards">
                {this.state.started ? (
                  <SimpleCard
                    title="Time Left"
                    description=""
                    value={<Timer time={300000} />}
                  />
                ) : (
                  <button
                    className="sign-in-button"
                    onClick={() => {
                      this.start();
                    }}
                  >
                    START
                  </button>
                )}
                <SimpleCard
                  title="Total Points"
                  description=""
                  value={this.state.points}
                />
              </div>
              <div className="second-line-cards">
                <CardWithInput
                  clickEvent={this.creditHandler}
                  title="Credit"
                  description="Request amount"
                  helpContent="Enter the amount you want to take from the bank. After k seconds n + x will be subtracted from your score."
                />
                <CardWithInput
                  clickEvent={this.depositHandler}
                  title="Deposit"
                  description="Deposit amount"
                  helpContent="Enter the amount you want to put in the bank. After k seconds n + x will be added to your score."
                />
              </div>
              <div className="third-line-cards">
                <Lottery
                  title="Lottery"
                  description="Try your luck"
                  prizeList={this.state.prizeList}
                  helpContent="If you click on on of the cards, the amount behind it will be added to your score."
                />
                <RiddleCard
                  title="Play with bank"
                  description="What is your bid?"
                  value={this.state.riddle}
                  helpContent="You will be given gift amount if you pick the correct answer."
                />
              </div>
            </div>
            <div className="sidebar">
              <div className="score-board">
                <h2 className="heading-secondary">SCOREBOARD</h2>
                <div className="wrapper">
                  {this.state.playerList.map((player, index) => {
                    return <ScoreBoard key={index} player={player} />;
                  })}
                </div>
              </div>
              <div className="log-board">
                <h2 className="heading-secondary">LOGBOARD</h2>
                <div className="wrapper">
                  {this.state.logList.map((event, index) => {
                    return <LogBoard key={index} event={event} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
