import React from "react";

function CardWithInput({ title, description, value, clickEvent, helpContent }) {
  const [data, setData] = React.useState("");
  const [isShown, setIsShown] = React.useState(false);

  return (
    <div className="simple-card">
      <h2 className="heading-secondary">{title}</h2>
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="card-with-input"
      >
        <p className="card-with-input-description">{description}</p>
        <button
          className="info-button"
          onClick={() => {
            setIsShown(!isShown);
          }}
        >
          i
        </button>
        {isShown ? (
          <div className="info-popup">
            <p>{helpContent}</p>
          </div>
        ) : null}
      </div>
      <div>
        <input
          type="text"
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
