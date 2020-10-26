import React from "react";
import { ListGroup } from "react-bootstrap";
import "./scoreboard.css";

const Scoreboard = ({ h }) => {
  let height = "50vh";
  if (h) {
    height = h;
  }
  var dummy = [
    { name: "player1", point: 34 },
    { name: "player2", point: 45 },
    { name: "player3", point: 56 },
    { name: "player4", point: 120 },
    { name: "player5", point: 21 },
  ];

  const generateScoreboard = (dummy) => {
    dummy.array.forEach((element) => {});
  };

  return (
    <div style={{ height, borderRadius: "8px" }}>
      <h4 className="text-center">Scoreboard</h4>
      <ListGroup>
        {dummy.map((item, i) => (
          <ListGroup.Item style={{ padding: "29px  10px" }}>
            {i + 1}. {item.name}----------------------------------{item.point}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Scoreboard;
