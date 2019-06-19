import React, { Component } from "react";
import "./ButtonsRegister.css";
import { Link } from "react-router-dom";

class ButtonRegisterClient extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Link
        to="/register/client"
        className="btn btn-outline-warning buttonRegister"
      >
        Szukam grafika
      </Link>
    );
  }
}

export default ButtonRegisterClient;
