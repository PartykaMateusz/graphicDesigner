import React, { Component } from "react";
import "./Banner.css";
import RegisterClientForm from "../Forms/RegisterClientForm";

class BannerRegistar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id="bannerRegister">
        <div id="registerForm">
          <RegisterClientForm />
        </div>
      </div>
    );
  }
}

export default BannerRegistar;
