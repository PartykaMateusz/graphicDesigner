import React, { Component } from "react";
import StartPageNavBar from "../components/StartPage/StartPageNavBar";
import Banner from "../components/StartPage/Banner";

class StartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  render() {
    return (
      <div id="startPage">
        <StartPageNavBar />
        <Banner />
      </div>
    );
  }
}

export default StartPage;
