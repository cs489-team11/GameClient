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
        this.userId = /** @type {string} */ response.array[0];
        this.gameId = /** @type {string} */ response.array[1];
        console.log("Joined game");
        this.parseJoin(response.array)

        // Start stream
        var stream = new StreamRequest();
        stream.setGameId(this.gameId);
        stream.setUserId(this.userId)
        this.game = client.stream(stream, {});
        this.game.on('data', data => {
          console.log(data.array)
          this.parseStream(data.array)
          // this.setState(data.getMessage())
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
              window.deposit = this.depositHandler
            }
          })
        }
      }
    });
  }


  parseJoin = response => {
    const playerList = this.updateScoreboard(response[2]);
    this.setState({...this.state, playerList: playerList, time: response[3], points: response[4]})
  }
  

  updateScoreboard = scores => {
    const playerList = [];
    if (!this.players && this.started) {
      this.players = {}
      scores.forEach(player => {
        playerList.push({me: player[0] == this.userId, nickName: player[1], score: player[2]});
        this.players[player[0]] = player[1]
      })
      this.players[this.userId] = "You"
    }
    else
      scores.forEach(player => {
        playerList.push({me: player[0] == this.userId, nickName: player[1], score: player[2]});
      })
    // In case bank is not included in the game, uncomment the next line
    // playerList.pop(playerList.length)
    return playerList
  }

  depositHandler = amount => {
    if (!this.started) return alert("The game has not started yet")
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
  }

  creditHandler = amount => {
    if (!this.started) return alert("The game has not started yet")
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
  }

  parseStream = data => {
    window.dd = data
    const start = data[2]
    const scoreboardUpdate = data[4]
    console.log(data)
    var playerList
    var logList = []

    
    if (!this.started && start) {
      this.started = true
      logList.push({event: "The game has started"})
    }
    if (scoreboardUpdate && scoreboardUpdate[0]) playerList = this.updateScoreboard(scoreboardUpdate[0])
    
    this.setState({ ...this.state, playerList: playerList || this.state.playerList, logList: [...this.state.logList, ...logList] })
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
                <CardWithInput clickEvent={this.creditHandler} title="Credit" description="Request amount" />
                <CardWithInput clickEvent={this.depositHandler} title="Deposit" description="Deposit amount" />
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
