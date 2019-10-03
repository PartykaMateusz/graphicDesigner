import React, { Component } from "react";
import Navbar from "../components/Navbar/Navbar";
import "./index.css";

export default class index extends Component {
  render() {
    return (
      <div class="indexContainer">
        <Navbar history={this.props.history} />
      </div>
    );
  }
}
