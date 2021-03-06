import React from "react";
import ReactDOM from "react-dom";
import Countdown from "react-countdown";

const Completionist = () => (
  <span>
    Game is finished. Click{" "}
    <a target="_blank" href="https://cs489-team11.github.io/">
      here
    </a>{" "}
    for the explanation.
  </span>
);


const Timer = ({ time }) => {
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return <Completionist />;
    } else {
      if (minutes < 10) minutes = "0" + minutes;
      if (seconds < 10) seconds = "0" + seconds;
      // Render a countdown
      return (
        <span style={{ fontWeight: 400, fontSize: "20px" }}>
          {minutes}:{seconds}
        </span>
      );
    }
  };

  return <Countdown date={Date.now() + time} renderer={renderer} />;
};

export default Timer;
