import React from "react";
import { ListGroup } from "react-bootstrap";
import "./log.css";

const Log = ({ h }) => {
  let height = "25vh";
  if (h) {
    height = h;
  }
  var dummy = [
    { event: "Player 1 deposited" },
    { event: "player2 took credit" },
    { event: "player3 deposited" },
    { event: "player4 deposited" },
    { event: "player5 is broke" },
  ];

  const generateLog = (dummy) => {
    dummy.array.forEach((element) => {});
  };

  return (
    <div style={{ height, borderRadius: "8px" }}>
      <h4 className="text-center">Log</h4>
      <ListGroup>
        {dummy.map((item, i) => (
          <ListGroup.Item style={{ textAlign: "center", padding: "6px  10px" }}>
            {item.event}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Log;
