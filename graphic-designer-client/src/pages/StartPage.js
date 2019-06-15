import React, { Component } from "react";
import StartPageNavBar from "../components/StartPageNavBar";

class StartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id="startPage">
        <StartPageNavBar />
        <button type="button" class="btn btn-primary">
          Primary
        </button>
      </div>
    );
  }
}

export default StartPage;
