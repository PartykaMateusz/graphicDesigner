import React, { Component } from "react";
import StartPageNavBar from "../../components/StartPage/StartPageNavBar";

import BannerRegister from "../../components/StartPage/BannerRegister";

class StartPage extends Component {
  constructor(props) {
    super(props);
    this.state = { AccountRole: "USER" };
  }
  render() {
    return (
      <div id="startPage">
        <StartPageNavBar history={this.props.history} />
        <BannerRegister
          history={this.props.history}
          accountRole={this.state.AccountRole}
        />
      </div>
    );
  }
}

export default StartPage;
