import React, { Component } from "react";
import StartPageNavBar from "../../components/StartPage/StartPageNavBar";
import Banner from "../../components/StartPage/Banner";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class StartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    // if (this.props.security.access_token) {
    //   this.props.history.push("/index");
    // }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.security.access_token) {
      this.props.history.push("/index");
    }
  }

  render() {
    return (
      <div id="startPage">
        <StartPageNavBar history={this.props.history} />
        <Banner />
      </div>
    );
  }
}

StartPage.propTypes = {
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  security: state.security
});

export default connect(
  mapStateToProps,
  {}
)(StartPage);
