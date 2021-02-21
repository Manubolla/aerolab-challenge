import React from "react";
import Home from "./Routes/Home";
import History from "./Routes/History";
import { Route, Switch } from "react-router-dom";
import TopBar from "./components/TopBar";

function App() {
  return (
    <Switch>
      <div>
        <Route path="/" component={TopBar} />
        <Route exact path="/" component={Home} />
        <Route exact path="/history" component={History} />
      </div>
    </Switch>
  );
}
export default App;
