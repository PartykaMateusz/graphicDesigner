import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import AddWorkForm from "../../components/Forms/AddWorkForm";
import "../Index/index.css";

import { connect } from "react-redux";
import PropTypes from "prop-types";

class AddWork extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="indexContainer">
        <Navbar history={this.props.history} />
        <div className="row">
          <div className="col-md-8 offset-md-2 profile border rounded">
            <AddWorkForm history={this.props.history} />
          </div>
        </div>
      </div>
    );
  }
}

AddWork.propTypes = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {}
)(AddWork);
