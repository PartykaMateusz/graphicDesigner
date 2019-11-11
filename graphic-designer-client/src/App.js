import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import StartPage from "./pages/StartPage/StartPage";
import RegisterClient from "./pages/Register/RegisterClient";
import RegisterDesigner from "./pages/Register/RegisterDesigner";
import index from "./pages/Index/index";
import MyProfile from "./pages/MyProfile/MyProfile";
import Profile from "./pages/Profile/Profile";
import editProfile from "./pages/EditProfile/editProfile";
import AddWork from "./pages/AddWork/AddWork";
import Order from "./pages/Order/Order";
import UserPanel from "./pages/UserPanel/UserPanel";
import DesignerPanel from "./pages/DesignerPanel/DesignerPanel";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";

const jwtToken = localStorage.jwtToken;
if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={StartPage} />
          <Route exact path="/register/client" component={RegisterClient} />
          <Route exact path="/register/designer" component={RegisterDesigner} />
          <Route exact path="/index" component={index} />
          <Route exact path="/profile" component={MyProfile} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route exact path="/editProfile" component={editProfile} />
          <Route exact path="/addWork" component={AddWork} />
          <Route exact path="/order/:id" component={Order} />

          <Route exact path="/userPanel" component={UserPanel} />
          <Route exact path="/designerPanel" component={DesignerPanel} />
        </Switch>
      </Router>
    </Provider>
  );
}
export default App;
