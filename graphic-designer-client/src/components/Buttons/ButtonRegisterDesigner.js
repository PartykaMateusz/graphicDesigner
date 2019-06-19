import React, { Component } from "react";
import "./ButtonsRegister.css";
import { Link } from "react-router-dom";

class ButtonRegisterDesigner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Link
        to="/register/designer"
        className="btn btn-outline-warning buttonRegister"
      >
        Zacznij Pracować
      </Link>
    );
  }
}

export default ButtonRegisterDesigner;
