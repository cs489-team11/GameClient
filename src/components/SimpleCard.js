import React from "react";

function SimpleCard({ title, description, value }) {
  return (
    <div className="simple-card">
      <h2 className="heading-secondary">{title}</h2>
      {/* <p>{description}</p> */}
      <span className="card-value">{value}</span>
    </div>
  );
}

export default SimpleCard;
