import React from "react";
import { useHistory } from "react-router";

function SignIn({ logFunc }) {
  const [nickname, setNickname] = React.useState("");
  const history = useHistory();
  return (
    <div className="sign-in-wrapper">
      <div className="sign-in-card">
        <h2 className="heading-secondary">Secret game</h2>
        <p className="card-with-input-description">
          Pick a nickname for public display
        </p>
        <div className="input-wrapper">
          <input
            type="text"
            className="card-input"
            placeholder="enter the nickname"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
          />
          <button
            className="sign-in-button"
            onClick={() => {
              logFunc(nickname);
              window.nickname = nickname;
              history.push("/");
            }}
          >
            ENTER
          </button>
          <button
            className="sign-in-button"
            onClick={() => {
              logFunc(nickname);
              window.nickname = nickname;
              window.started = true;
              history.push("/");
            }}
          >
            START
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
