import React from "react";
import LotteryGrid from "./LotteryGrid.js";

function Lottery({ title, description, prizeList, updateModalState }) {
  return (
    <div className="simple-card">
      <h2 className="heading-secondary">{title}</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p className="card-with-input-description">{description}</p>
        <button className="info-button" onClick={updateModalState}>
          i
        </button>
      </div>
      <div>
        <input
          type="text"
          className="card-input"
          placeholder="enter the amount"
        />
        <button className="video-game-btn">ENTER</button>
      </div>
      <div id="grid">
        {prizeList.map((pair, index) => {
          return <LotteryGrid pair={pair} />;
        })}
      </div>
    </div>
  );
}

export default Lottery;
