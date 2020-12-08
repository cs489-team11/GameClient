import React from "react";
import LotteryGrid from "./LotteryGrid.js";

function Lottery({ title, description, prizeList, updateModalState, onClickHandler }) {
  return (
    <div className="simple-card">
      <h2 className="heading-secondary">{title}</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p className="card-with-input-description">{description}</p>
        <button className="info-button" onClick={updateModalState}>
          i
        </button>
      </div>
      <div id="grid">
        {prizeList.map((pair, index) => {
          return <LotteryGrid onClickHandler={() => onClickHandler(index + 1)} pair={pair} key={index}/>;
        })}
      </div>
      <br></br>
      <p>Wait for the cells to become "?" in order to be able to play.</p>
    </div>
  );
}

export default Lottery;
