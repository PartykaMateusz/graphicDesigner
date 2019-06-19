import React, { Component } from "react";
import "./Banner.css";
import ButtonRegisterDesigner from "../Buttons/ButtonRegisterDesigner";
import ButtonRegisterClient from "../Buttons/ButtonRegisterClient";

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id="banner">
        <div id="bannerButtons">
          <ButtonRegisterClient />
          <ButtonRegisterDesigner />
        </div>
      </div>
    );
  }
}

export default Banner;
