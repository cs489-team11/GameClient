import React from "react";

function RiddleCard({ title, description, value, updateModalState, clickEvent }) {
  
  const [data, setData] = React.useState("");
  
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
          max={2147483647}
          type="number"
          value={data}
          onChange={(event) => setData(event.target.value)}
          className="card-input"
          placeholder="enter the amount"
        />
        <button className="video-game-btn" onClick={() => clickEvent(data)}>ENTER</button>
      </div>
      <div style={{ marginTop: "2vh", marginBottom: "3vh" }}>
        {value.question}
      </div>
      <div className="variant" onClick={value.onResponse ? () => value.onResponse(1) : () => console.log("no response function")}> {value.variantA}</div>
      <div className="variant" onClick={value.onResponse ? () => value.onResponse(2) : () => console.log("no response function")}>{value.variantB}</div>
      <div className="variant" onClick={value.onResponse ? () => value.onResponse(3) : () => console.log("no response function")}>{value.variantC}</div>
      <div className="variant" onClick={value.onResponse ? () => value.onResponse(4) : () => console.log("no response function")}>{value.variantD}</div>
    </div>
  );
}

export default RiddleCard;
