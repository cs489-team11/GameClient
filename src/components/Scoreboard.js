import React from "react";

function ScoreBoard({ player }) {
  return (
    <div className="ranking">
      <p>{player.nickName}</p>
      <p>{player.score}</p>
    </div>
  );
}

export default ScoreBoard;
