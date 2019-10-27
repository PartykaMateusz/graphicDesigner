import React, { Component } from "react";
import Navbar from "../components/Navbar/Navbar";
import "./index.css";
import { ROLE_USER } from "../actions/types";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AddWorkButton = ({ redirectToAddWork }) => (
  <button
    type="button"
    id="buttonAddWork"
    className="btn btn-primary btn-lg mt-4"
    onClick={redirectToAddWork}
  >
    Dodaj zlecenie
  </button>
);

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: null
    };

    this.redirectToAddWork = this.redirectToAddWork.bind(this);
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.data.role) {
      this.setState({
        role: nextProps.profile.data.role
      });
    }
  }

  redirectToAddWork() {
    this.props.history.push("/addWork");
  }

  AddWorkButtonIfRoleIsUser() {
    console.log("stejt role " + this.state.role);
    if (this.state.role === ROLE_USER) {
      return <AddWorkButton redirectToAddWork={this.redirectToAddWork} />;
    }
  }

  render() {
    return (
      <div className="indexContainer">
        <Navbar history={this.props.history} />

        <div className="row">
          <div className="col-md-3 offset-md-4">
            {this.AddWorkButtonIfRoleIsUser()}
          </div>
        </div>
      </div>
    );
  }
}

index.propTypes = {
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
)(index);
