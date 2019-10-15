import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Navbar from "../components/Navbar/Navbar";
import { getUserAvatar } from "../actions/profileActions";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      avatar: {}
    };
  }

  componentDidMount() {
    if (this.props.profile.data !== this.state.profile) {
      this.setState({
        profile: this.props.profile.data
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.data !== this.state.profile) {
      this.setState({
        profile: nextProps.profile.data
      });
      if (nextProps.profile.data.id) {
        this.props.getUserAvatar(nextProps.profile.data.id);
      }
    }
    if (nextProps.profile.avatar) {
      this.setState({
        avatar: nextProps.profile.avatar
      });
    }
  }

  componentDidUpdate(nextProps) {}

  redirectToEditProdile() {
    this.props.history.push("/editProfile");
  }

  render() {
    return (
      <div className="profileContainer">
        <Navbar history={this.props.history} />

        <div className="row">
          <div className="col-md-8 offset-md-2 row profile border rounded">
            <div
              className="col-md-6 offset-md-3 alert alert-secondary text-center"
              role="alert"
            >
              <h3>{this.state.profile.username}</h3>
            </div>
            <div
              className="col-md-2 offset-md-1"
              onClick={() => this.redirectToEditProdile()}
            >
              <button type="button" className="btn btn-warning">
                Edytuj profil
              </button>
            </div>
            <div className="col-md-4">
              <img
                src={this.state.avatar.base64}
                alt="avatar"
                className="width100"
              />
            </div>
            <div className="col-md-8 border rouded">
              <ul>
                <li>Imię : {this.state.profile.firstName}</li>
                <li>Nazwisko: {this.state.profile.lastName}</li>
                <li>E-mail: {this.state.profile.email}</li>
                <li>Numer telefonu: {this.state.profile.telNumber}</li>
                <li>Data rejestracji: {this.state.profile.registerDate}</li>
                <li>avatar: {this.state.avatar.size}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getUserAvatar: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  security: state.security,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getUserAvatar }
)(Profile);
