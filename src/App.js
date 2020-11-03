import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";

function App() {
  const [user, setUser] = React.useState(null);

  function logInUser(nickname) {
    setUser({ nickname, id: "4335" });
  }
  return (
    <Switch>
      {user === null ? (
        <>
          <Route
            path="/login"
            exact
            render={() => <SignIn logFunc={logInUser} />}
          />
          <Redirect to="/login" />
        </>
      ) : (
        <>
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </>
      )}
    </Switch>
  );
}

export default App;
