import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import StartPage from "./pages/StartPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={StartPage} />
      </Switch>
    </Router>
  );
}
export default App;
