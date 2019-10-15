import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Navbar from "../components/Navbar/Navbar";
import EditProfileForm from "../components/Forms/EditProfileForm";

class editProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      profile: {}
    };
  }

  componentDidMount() {
    this.setState({
      user: this.props.security.user
    });
    if (this.props.profile.data !== this.state.profile) {
      this.setState({
        profile: this.props.profile.data
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.data) {
      this.setState({
        profile: nextProps.profile.data
      });
    }
  }

  render() {
    return (
      <div className="profileContainer">
        <Navbar history={this.props.history} />

        <div className="row">
          <div className="col-md-8 offset-md-2 row profile border rounded">
            <div
              className="col-md-6 offset-md-3 alert alert-primary"
              role="alert"
            >
              <h3>Edycja profilu: {this.state.user.user_name}</h3>
            </div>
            <div className="col-md-8 offset-md-2">
              <EditProfileForm
                user={this.state.profile}
                history={this.props.history}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

editProfile.propTypes = {
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  security: state.security,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {}
)(editProfile);
