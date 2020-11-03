import React from "react";

function CardWithInput({ title, description, value }) {
  return (
    <div className="simple-card">
      <h2 className="heading-secondary">{title}</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p className="card-with-input-description">{description}</p>
        <button className="info-button">i</button>
      </div>
      <div>
        <input
          type="text"
          className="card-input"
          placeholder="enter the amount"
        />
        <button className="video-game-btn">ENTER</button>
      </div>
    </div>
  );
}

export default CardWithInput;
