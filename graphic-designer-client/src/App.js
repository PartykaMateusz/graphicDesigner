import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import StartPage from "./pages/StartPage";
import RegisterClient from "./pages/RegisterClient";
import RegisterDesigner from "./pages/RegisterDesigner";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={StartPage} />
          <Route exact path="/register/client" component={RegisterClient} />
          <Route exact path="/register/designer" component={RegisterDesigner} />
        </Switch>
      </Router>
    </Provider>
  );
}
export default App;
