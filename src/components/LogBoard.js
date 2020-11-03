import React from "react";

function LogBoard({ event }) {
  return (
    <div className="ranking">
      <p>{event.event}</p>
    </div>
  );
}

export default LogBoard;
