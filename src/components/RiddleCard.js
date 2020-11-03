import React from "react";

function RiddleCard({ title, description, value }) {
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
      <div style={{ marginTop: "2vh", marginBottom: "3vh" }}>
        {value.question}
      </div>
      <div className="variant"> {value.variantA}</div>
      <div className="variant">{value.variantB}</div>
      <div className="variant">{value.variantC}</div>
      <div className="variant">{value.variantD}</div>
    </div>
  );
}

export default RiddleCard;
