import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Navbar from "../../components/Navbar/Navbar";
import { getUserAvatar } from "../../actions/profileActions";
import "./MyProfile.css";
import "jquery";

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

  redirectToEditProfile() {
    this.props.history.push("/editProfile");
  }

  render() {
    console.log("render jeszcze raz");
    return (
      <div className="profileContainer">
        <Navbar history={this.props.history} />

        <div className="container emp-profile">
          <form method="post">
            <div className="row">
              <div className="col-md-4">
                <div className="profile-img">
                  <img src={this.state.avatar.base64} alt="Avatar" />
                </div>
              </div>

              <div className="col-md-6">
                <div className="profile-head">
                  <h5>{this.state.profile.username}</h5>
                  <h6>
                    {this.state.profile.firstName} {this.state.profile.lastName}
                  </h6>
                  <p className="proile-rating">
                    RANKINGS : <span>8/10</span>
                  </p>
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="home-tab"
                        data-toggle="tab"
                        href="#home"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                      >
                        Informacje
                      </a>
                    </li>
                    <li className="nav-item ml-2">
                      <a
                        className="nav-link"
                        id="profile-tab"
                        data-toggle="tab"
                        href="#profile"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                      >
                        Statystyki
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-2">
                <button
                  className="profile-edit-btn"
                  onClick={() => this.redirectToEditProfile()}
                >
                  Edytuj Profil
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="profile-work">
                  <p>WORK LINK</p>
                  <a href="">Website Link</a>
                  <br />
                  <a href="">Bootsnipp Profile</a>
                  <br />
                  <a href="">Bootply Profile</a>
                  <p>SKILLS</p>
                  <a href="">Web Designer</a>
                  <br />
                  <a href="">Web Developer</a>
                  <br />
                  <a href="">WordPress</a>
                  <br />
                  <a href="">WooCommerce</a>
                  <br />
                  <a href="">PHP, .Net</a>
                  <br />
                </div>
              </div>
              <div className="col-md-8">
                <div className="tab-content profile-tab" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <label>Nazwa użytkownika</label>
                      </div>
                      <div className="col-md-6">
                        <p>{this.state.profile.username}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Imię</label>
                      </div>
                      <div className="col-md-6">
                        <p>{this.state.profile.firstName}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Nazwisko</label>
                      </div>
                      <div className="col-md-6">
                        <p>{this.state.profile.lastName}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Email</label>
                      </div>
                      <div className="col-md-6">
                        <p>{this.state.profile.email}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Telefon</label>
                      </div>
                      <div className="col-md-6">
                        <p>{this.state.profile.telNumber}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <label>Data rejestracji</label>
                      </div>
                      <div className="col-md-6">
                        <p>{this.state.profile.registerDate}</p>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <label>Liczba projektów</label>
                      </div>
                      <div className="col-md-6">
                        <p>0</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
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
