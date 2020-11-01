import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import GeneralCard from "./GeneralCard";
import Form from "./InputAndButton";
import Timer from "./Timer";
import Slot from "./SlutMachine";
import Scoreboard from "./Scoreboard";
import Log from "./Log";

const MockPoint = (
  <span style={{ fontWeight: 400, fontSize: "x-large" }}>121</span>
);

class App extends React.Component {
  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Container
          style={{
            height: "95vh",
            width: "1920px",
            border: "solid",
            borderColor: "black",
            backgroundColor: "#343a40",
            borderRadius: "8px",
            margin: "2.5vh",
            paddingRight: "30px",
          }}
        >
          <Row className="justify-content-md-center">
            <Col xs="8">
              <Row
                style={{}}
                style={{ justifyContent: "center", marginTop: "20px" }}
              >
                <h1>SECRET GAME</h1>
              </Row>
              <Row>
                <Col>
                  <GeneralCard
                    h="14vh"
                    title="Time left:"
                    content={<Timer time={100000} />}
                  />
                </Col>
                <Col>
                  <GeneralCard
                    title="Total points:"
                    h="14vh"
                    content={MockPoint}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <GeneralCard
                    title="CREDIT"
                    label="Borrow from the bank"
                    content={<Form buttonText={"REQUEST CREDIT"} />}
                  />
                </Col>
                <Col>
                  <GeneralCard
                    title="DEPOSIT"
                    label="Deposit and withdraw at any time"
                    content={<Form buttonText={"DEPOSIT AMOUNT"} />}
                  />
                </Col>
              </Row>
              <Row>
                <Col style={{ height: "40vh" }}>
                  <Slot />
                </Col>
                <Col>
                  <GeneralCard
                    p={"20px"}
                    h="32vh"
                    title="GAME"
                    label="Play against the bank"
                    content={<Form buttonText={"PLAY"} />}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs="4">
              <Row>
                <Col
                  style={{
                    backgroundColor: "#152144",
                    marginTop: "86px",
                    marginBottom: "6px",
                    borderRadius: "10px",
                    // height: "50vh",
                  }}
                >
                  {" "}
                  <Scoreboard />
                </Col>
              </Row>
              <Row>
                <Col
                  style={{
                    backgroundColor: "#152144",
                    marginTop: "0px",
                    marginBottom: "6px",
                    borderRadius: "10px",
                    // height: "20vh",
                  }}
                >
                  <Log />
                </Col>
              </Row>
            </Col>
          </Row>
          <div></div>
        </Container>
      </div>
    );
  }
}

export default App;
