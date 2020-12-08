import React from "react";

function LotteryGrid({pair, onClickHandler}) {
  const text = pair===false ? "?" : pair
  console.log(text)
  return <div onClick={onClickHandler}>{text}</div>;
}

export default LotteryGrid;
