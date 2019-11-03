import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Navbar from "../../components/Navbar/Navbar";
import "./Profile.css";
import "jquery";
import { Loading } from "../../components/Loading/Loading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";

import { getUserById } from "../../actions/profileActions";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.match.params.id,
      profile: {},
      avatar: {}
    };
  }

  componentDidMount() {
    this.props.getUserById(this.state.userId);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.profileInfo !== this.state.profile) {
      this.setState({
        profile: nextProps.profileInfo
      });
    }
  }

  redirectBack = () => {
    this.props.history.goBack();
  };

  render() {
    if (
      this.state.profile === undefined ||
      this.state.profile.avatar === undefined
    ) {
      return <Loading />;
    } else {
      return (
        <div className="profileContainer">
          <Navbar history={this.props.history} />
          <div className="arrowIcon pt-5">
            <FontAwesomeIcon
              icon={faArrowAltCircleLeft}
              onClick={() => this.redirectBack()}
            />
          </div>
          <div className="container emp-profile">
            <form method="post">
              <div className="row">
                <div className="col-md-4">
                  <div className="profile-img">
                    <img src={this.state.profile.avatar.base64} alt="Avatar" />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="profile-head">
                    <h5>{this.state.profile.username}</h5>
                    <h6>
                      {this.state.profile.firstName}{" "}
                      {this.state.profile.lastName}
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
}

Profile.propTypes = {
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
  getUserById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  security: state.security,
  profileInfo: state.profileInfo
});

export default connect(
  mapStateToProps,
  { getUserById }
)(Profile);
