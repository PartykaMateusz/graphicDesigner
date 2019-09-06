import React, { Component } from "react";
import "./Banner.css";
import RegisterForm from "../Forms/RegisterForm";

class BannerRegistar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountRole: this.props.accountRole
    };
  }
  render() {
    return (
      <div id="bannerRegister">
        <div id="registerForm">
          <RegisterForm
            history={this.props.history}
            accountRole={this.state.accountRole}
          />
        </div>
      </div>
    );
  }
}

export default BannerRegistar;
