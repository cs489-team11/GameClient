import React from "react";
import CardWithInput from "../components/CardWithInput";
import ScoreBoard from "../components/Scoreboard";
import LogBoard from "../components/LogBoard";
import SimpleCard from "../components/SimpleCard";
import Timer from "../components/Timer";
import RiddleCard from "../components/RiddleCard";
import Lottery from "../components/Lottery";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import Modal from "../components/Modal";
const {
  GameClient,
  StartRequest,
  DepositRequest,
  LeaveRequest,
  JoinRequest,
  CreditRequest,
  StreamRequest,
  GenerateQuestionRequest,
  AnswerQuestionRequest,
  LotteryRequest
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
      riddle: {},
      points: 0,
      prizeList: [1,2,3,4,5,6,7,8,9],
      modal: {
        isShown: false,
        infoContent:
          "Enter the amount you want to put in the bank. After k seconds n + x will be added to your score.",
      },
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
          this.parseStream(data.array);
          // this.setState(data.getMessage())
        });
      }
    });
  }

  updateModalState = (content) => {
    this.setState((state) => {
      return {
        ...state,
        modal: {
          isShown: true,
          infoContent: content,
        },
      };
    });
  };
  
// GAME START
  start = () => {
    var request = new StartRequest();
    request.setGameId(this.gameId);
    client.start(request, {}, (error, response) => {
      if (error) {
        console.log(
          `An error with code: "${error.code}" and message: "${error.message}" ocurred. `
        );
      } else {
        this.endTime = new Date().getTime() + 300000
        console.log("Started game");
        this.setState({
          ...this.state,
          started: true,
          logList: [{ event: "The game has started" }],
        });
      }
    });
  };

  // AFTER JOINING
  parseJoin = (response) => {
    const playerList = this.updateScoreboard(response[2]);
    this.setState({
      ...this.state,
      playerList: playerList,
      points: response[4],
    });
  };

  // SCOREBOARD UPDATE
  updateScoreboard = (scores) => {
    let playerList = [];
    let me;
    if (!this.players && this.state.started) {
      this.players = {};
      scores.forEach((player) => {
        if (player[1] != "bank") {
          me = false;
          if (player[0] == this.userId) {
            me = true;
            this.setState({...this.state, points: player[2] || 0})
          }
          playerList.push({
            id: player[0],
            me,
            nickName: player[1],
            score: player[2] || 0,
          });
          this.players[player[0]] = player[1];
        }
      });
      playerList = playerList.sort((a, b) => b.score - a.score);
      this.players[this.userId] = "You";
    } else
      scores.forEach((player) => {
        if (player[1] != "bank") {
          me = false;
          if (player[0] == this.userId) {
            me = true;
            this.setState({...this.state, points: player[2] || 0})
          }
          playerList.push({
            id: player[0],
            me,
            nickName: player[1],
            score: player[2] || 0,
          });
        }
      });
    playerList = playerList.sort((a, b) => b.score - a.score);
    return playerList;
  };

  // BUTTON HANDLERS

  // DEPOSIT
  depositHandler = (amount) => {
    if (!this.state.started) return this.updateModalState("The game has not started yet");
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
        if (response.array[0]) this.updateModalState(`You have deposited ${amount}$`)
      }
    });
  };
  
  // CREDIT
  creditHandler = (amount) => {
    if (!this.state.started) return this.updateModalState("The game has not started yet");
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
        if (response.array[0]) this.updateModalState(`You took a credit of ${amount}$`)
        else this.updateModalState(response.array[1])
      }
    });
  };

  // QUESTION 
  questionHandler = (amount) => {
    if (!this.state.started) return this.updateModalState("The game has not started yet");
    var request = new GenerateQuestionRequest();
    request.setBidPoints(amount)
    request.setUserId(this.userId)
    request.setGameId(this.gameId)
    client.generateQuestion(request, {}, (error, questions) => {
      if (error) {
        console.log(
          `An error with code: "${error.code}" and message: "${error.message}" ocurred. `
        );
        if (error.code == 3)
          this.updateModalState("You can't bid more than you have!")
      } else {
        this.setState({...this.state, riddle: {
          question: questions.array[1],
          variantA: questions.array[2][0],
          variantB: questions.array[2][1],
          variantC: questions.array[2][2],
          variantD: questions.array[2][3],
          onResponse: responseId => {
            var request = new AnswerQuestionRequest();
            request.setQuestionId(questions.array[0])
            request.setGameId(this.gameId)
            request.setAnswer(responseId)
            request.setUserId(this.userId)
            client.answerQuestion(request, {}, (error, response) => {
              if (error) console.log(`An error with code: "${error.code}" and message: "${error.message}" ocurred. `);
              else {
                if (response.array[0]) this.setState({...this.state, riddle: {question: `Correct! You won ${response.array[2]}$.`}})
                else this.setState({...this.state, riddle: {question: `Wrong! The correct answer was "${questions.array[2][[response.array[1]-1]]}".`}})
              }
            })
          }
        },})
      }
    })
  }

  // MANAGE THE WHOLE GAME SCREEN
  parseStream = (data) => {
    window.dd = data;
    const newJoin = data[0];
    const start = data[2];
    const transactions = data[4];
    var playerList = this.state.playerList
    var logList = [];

    if (newJoin) {
      playerList = [
        ...this.state.playerList,
        ...this.updateScoreboard(newJoin),
      ];
    }

    if (start && !this.state.started) {
      this.endTime = new Date().getTime() + 300000
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
      const question = transactions[7]
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
      if (creditReturnEvents)
        logList.unshift({
          event: `${this.players[creditReturnEvents[0]]} returned credit of ${
            creditReturnEvents[1]
          }$`,
        });
      if (depositReturnEvents)
        logList.unshift({
          event: `${this.players[depositReturnEvents[0]]} got a deposit return of ${
            depositReturnEvents[1]
          }$`,
        });

      if (thefts )
        {
        thefts[0].forEach(theft => {
          if (theft[0] == this.userId) {
            this.updateModalState(`Thief stole ${theft[1]}$ from You`)
          }
        })
      }
      if (question){
        let eventToAdd;
        console.log(question)
        if (question[3])  eventToAdd = `${this.players[question[0]]} won ${question[3]}$ playing with the bank`
        else eventToAdd = `${this.players[question[0]]} lost ${question[2]}$ playing with the bank`
        logList.unshift({
          event: eventToAdd
        });
      }
    }

    this.setState({
      ...this.state,
      playerList: playerList ,
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
                    value={<Timer time={this.endTime - new Date().getTime()} />}
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
                  updateModalState={() => {
                    this.updateModalState(
                      "Enter the amount you want to take from the bank. After n seconds n + x will be subtracted from your score."
                    );
                  }}
                />
                <CardWithInput
                  clickEvent={this.depositHandler}
                  title="Deposit"
                  description="Deposit amount"
                  updateModalState={() => {
                    this.updateModalState(
                      "Enter the amount you want to put in the bank. After k seconds n + x will be added to your score."
                    );
                  }}
                />
              </div>
              <div className="third-line-cards">
                <Lottery
                  title="Lottery"
                  description="Try your luck"
                  prizeList={this.state.prizeList}
                  updateModalState={() => {
                    this.updateModalState(
                      "If you click on on of the cards, the amount behind it will be added to your score."
                    );
                  }}
                />
                <RiddleCard
                  title="Play with bank"
                  description="What is your bid?"
                  value={this.state.riddle}
                  updateModalState={() => {
                    this.updateModalState(
                      "You will be given gift amount if you pick the correct answer."
                    );
                  }}
                  clickEvent={this.questionHandler}
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
        {this.state.modal.isShown && (
          <Modal
            infoContent={this.state.modal.infoContent}
            onClose={() => {
              this.setState((state) => {
                return {
                  ...state,
                  modal: {
                    isShown: false,
                    infoContent: "",
                  },
                };
              });
            }}
          />
        )}
      </div>
    );
  }
}

export default Home;
