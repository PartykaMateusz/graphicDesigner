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
import AddWork from "./pages/OrderActions/AddWork";
import Order from "./pages/Order/Order";
import OrderProposals from "./pages/OrderProposals/OrderProposals";
import UserPanel from "./pages/UserPanel/UserPanel";
import DesignerPanel from "./pages/DesignerPanel/DesignerPanel";
import JobComponent from "./pages/Job/Job";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import EditOrder from "./pages/OrderActions/EditOrder";
import SecureRoute from "./securityUtils/secureRoute";

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
          <SecureRoute exact path="/index" component={index} />
          <SecureRoute exact path="/profile" component={MyProfile} />
          <SecureRoute exact path="/profile/:id" component={Profile} />
          <SecureRoute exact path="/editProfile" component={editProfile} />
          <SecureRoute exact path="/addWork" component={AddWork} />
          <SecureRoute exact path="/order/:id" component={Order} />
          <SecureRoute exact path="/order/:id/edit" component={EditOrder} />
          <SecureRoute
            exact
            path="/order/:id/proposals"
            component={OrderProposals}
          />
          <SecureRoute exact path="/job/:id" component={JobComponent} />

          <SecureRoute exact path="/userPanel" component={UserPanel} />
          <SecureRoute exact path="/designerPanel" component={DesignerPanel} />
        </Switch>
      </Router>
    </Provider>
  );
}
export default App;
