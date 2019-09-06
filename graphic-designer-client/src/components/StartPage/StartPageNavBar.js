import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./StartPageNavBar.css";
import Logo from "./logo.png";

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
            <li className="nav-item active">
              <a className="nav-link" href="http://bootstrap-ecommerce.com">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="html-components.html">
                Documentation
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link  dropdown-toggle"
                href="#"
                data-toggle="dropdown"
              >
                {" "}
                Dropdown{" "}
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    {" "}
                    Menu item 1
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    {" "}
                    Menu item 2{" "}
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a
                className="btn ml-2 btn-warning"
                href="http://bootstrap-ecommerce.com"
              >
                Zaloguj
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default StartPageNavBar;
