import React from "react";
import CardWithInput from "../components/CardWithInput";
import ScoreBoard from "../components/Scoreboard";
import LogBoard from "../components/LogBoard";
import SimpleCard from "../components/SimpleCard";
import Timer from "../components/Timer";
import RiddleCard from "../components/RiddleCard";
import Lottery from "../components/Lottery";
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
      playerList: [
      ],
      logList: [
      ],
      time:0,
      riddle: {
        question: "Which is the first Pokemon?",
        variantA: "Bulbasaur",
        variantB: "Mew",
        variantC: "Rhydon",
        variantD: "Arceus",
      },
      points:0,
      prizeList: [
        { location: 1, prize: 45 },
        { location: 2, prize: 65 },
        { location: 3, prize: 1 },
        { location: 4, prize: 57 },
        { location: 5, prize: 0 },
        { location: 6, prize: 100 },
        { location: 7, prize: 15 },
        { location: 8, prize: 10 },
        { location: 9, prize: 25 },
      ],
    };
  }
  componentDidMount() {
    // If user hit start => join game, start stream, start the game
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
        this.parseJoin(response.array)

        // Start stream
        var stream = new StreamRequest();
        stream.setGameId(this.gameId);
        stream.setUserId(this.userId)
        this.game = client.stream(stream, {});
        this.game.on('data', data => {
          console.log(data.getMessage())
          this.setState(data.getMessage())
        })
        this.game.on('status', status => {
          console.log(status.details);
        })
        // If user hit start => start game, if join => do nothing
        if (window.started){ 
          var request = new StartRequest();
          window.req = request
          request.setGameId(this.gameId);
          client.start(request, {}, (error, response) => {
            if (error) {
              console.log(
                `An error with code: "${error.code}" and message: "${error.message}" ocurred. `
              );
            } else {
              console.log("Started game");
              this.depositHandler(100)
            }
          })
        }
      }
    });
  }

  parseJoin = response => {
    const playerList = [];
    response[2].forEach(player => {
      playerList.push({me: player[0] == this.userId, nickName: player[1], score: player[2]})
    })
    playerList.pop(playerList.length)
    this.setState({...this.state, playerList, time: response[3], points: response[4]})
  }

  depositHandler = amount => {
    if (!this.gameId) return alert("The game has not started yet")
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
        console.log(response);
      }
    });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <h1 className="heading-primary">Secret Game</h1>
          <div className="content">
            <div className="cards-section">
              <div className="simple-cards">
                <SimpleCard
                  title="Time Left"
                  description=""
                  value={<Timer time={this.state.time*1000} />}
                />
                <SimpleCard title="Total Points" description="" value={this.state.points} />
              </div>
              <div className="second-line-cards">
                <CardWithInput title="Credit" description="Request amount" />
                <CardWithInput title="Deposit" description="Deposit amount" />
              </div>
              <div className="third-line-cards">
                <Lottery
                  title="Lottery"
                  description="Try your luck"
                  prizeList={this.state.prizeList}
                />
                <RiddleCard
                  title="Play with bank"
                  description="What is your bid?"
                  value={this.state.riddle}
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
