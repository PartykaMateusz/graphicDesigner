import React, { Component } from "react";
import "./StartPageNavBar.css";

class StartPageNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">
          <img
            class="logo"
            src="http://bootstrap-ecommerce.com/main/images/logo-white.png"
            height="40"
          />
          LOGO
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar1"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse" id="navbar1">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="http://bootstrap-ecommerce.com">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="html-components.html">
                Documentation
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link  dropdown-toggle"
                href="#"
                data-toggle="dropdown"
              >
                {" "}
                Dropdown{" "}
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="#">
                    {" "}
                    Menu item 1
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    {" "}
                    Menu item 2{" "}
                  </a>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <a
                class="btn ml-2 btn-warning"
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
