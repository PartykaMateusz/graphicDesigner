import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Navbar from "../components/Navbar/Navbar";
import { getProfileByUsername } from "../actions/profileActions";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {}
    };
  }

  componentDidMount() {
    this.setState({
      profile: this.props.security.user
    });
  }

  componentWillReceiveProps(nextProps) {}

  redirectToEditProdile() {
    this.props.history.push("/editProfile");
  }

  render() {
    return (
      <div class="profileContainer">
        <Navbar history={this.props.history} />

        <div class="row">
          <div class="col-md-8 offset-md-2 row profile border rounded">
            <div
              class="col-md-6 offset-md-3 alert alert-secondary text-center"
              role="alert"
            >
              <h3>{this.state.profile.user_name}</h3>
            </div>
            <div
              class="col-md-2 offset-md-1"
              onClick={() => this.redirectToEditProdile()}
            >
              <button type="button" class="btn btn-warning">
                Edytuj profil
              </button>
            </div>
            <div class="col-md-4">
              <img
                src="https://cdn.shoplo.com/1785/products/th1024/aaaf/137-piesek.jpg"
                alt="..."
                class="img-thumbnail"
              />
            </div>
            <div class="col-md-8 border rouded">
              <ul>
                <li>Imię : {this.state.profile.firstName}</li>
                <li>Nazwisko: {this.state.profile.lastName}</li>
                <li>E-mail: {this.state.profile.email}</li>
                <li>Numer telefonu: {this.state.profile.telNumber}</li>
                <li>Data rejestracji: {this.state.profile.registerDate}</li>
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
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  security: state.security
});

export default connect(
  mapStateToProps,
  {}
)(Profile);
