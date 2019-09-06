import React, { Component } from "react";
import StartPageNavBar from "../components/StartPage/StartPageNavBar";
import Banner from "../components/StartPage/Banner";
import BannerRegister from "../components/StartPage/BannerRegister";

class StartPage extends Component {
  constructor(props) {
    super(props);
    this.state = { AccountRole: "DESIGNER" };
  }
  render() {
    return (
      <div id="startPage">
        <StartPageNavBar />
        <BannerRegister
          history={this.props.history}
          accountRole={this.state.AccountRole}
        />
      </div>
    );
  }
}

export default StartPage;
