import React, { Component } from "react";
import StartPageNavBar from "../components/StartPage/StartPageNavBar";
import Banner from "../components/StartPage/Banner";
import BannerRegistar from "../components/StartPage/BannerRegister";

class StartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id="startPage">
        <StartPageNavBar />
        <BannerRegistar />
      </div>
    );
  }
}

export default StartPage;
