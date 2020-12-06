import React from "react";

function CardWithInput({
  title,
  description,
  value,
  clickEvent,
  updateModalState,
}) {
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
          type="number"
          className="card-input"
          placeholder="enter the amount"
          value={data}
          onChange={(event) => setData(event.target.value)}
        />
        <button className="video-game-btn" onClick={() => clickEvent(data)}>
          ENTER
        </button>
      </div>
    </div>
  );
}

export default CardWithInput;
