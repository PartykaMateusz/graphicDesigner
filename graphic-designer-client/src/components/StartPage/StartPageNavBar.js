import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./StartPageNavBar.css";
import Logo from "./logo.png";
import LoginForm from "../Forms/LoginForm";

class StartPageNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-default navbar-default ">
        <Link className="nav-link text-warning" to="/">
          <img className="logo" src={Logo} height="40" />
          GRAPHIC DESIGNER
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar1"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbar1">
          <ul className="navbar-nav ml-auto">
            <LoginForm history={this.props.history} />
          </ul>
        </div>
      </nav>
    );
  }
}

export default StartPageNavBar;
