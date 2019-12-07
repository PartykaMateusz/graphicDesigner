import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Navbar from "../../components/Navbar/Navbar";
import "./Profile.css";

import { Loading } from "../../components/Loading/Loading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";

import FavouriteCategories from "../../components/FavouriteCategories/FavouriteCategories";

import { getUserById } from "../../actions/profileActions";
import { ROLE_USER, ROLE_DESIGNER } from "../../actions/types";
import { UserStats, DesignerStats } from "../../components/Stats/UserStats";
import StarRatings from "../../../node_modules/react-star-ratings";
import RateList from "../../components/Tables/RateList";

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.profileInfo !== this.state.profile) {
      this.setState({
        profile: nextProps.profileInfo
      });
    }

    if (nextProps.profileInfo.avatar !== this.state.avatar) {
      this.setState({
        avatar: nextProps.profileInfo.avatar
      });
    }
  }

  componentWillUpdate(newProps) {
    if (this.state.userId !== newProps.match.params.id) {
      this.setState({
        userId: newProps.match.params.id
      });
      this.props.getUserById(newProps.match.params.id);
    }
  }

  redirectBack = () => {
    this.props.history.goBack();
  };

  generateStats = () => {
    if (this.state.profile.role === ROLE_USER) {
      return <UserStats profile={this.state.profile} />;
    } else if (this.state.profile.role === ROLE_DESIGNER) {
      return <DesignerStats profile={this.state.profile} />;
    }
  };

  generateRating = rating => {
    if (this.state.profile.role === ROLE_DESIGNER) {
      return (
        <StarRatings
          rating={rating}
          starDimension="30px"
          numberOfStars={10}
          starRatedColor="orange "
        />
      );
    }
  };

  render() {
    if (
      this.state.profile === undefined ||
      this.state.profile.avatar === undefined
    ) {
      return (
        <React.Fragment>
          <Navbar history={this.props.history} />
          <Loading />
        </React.Fragment>
      );
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
                    <img src={this.state.avatar.base64} alt="Avatar" />
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
                      {this.generateRating(this.state.profile.averageRating)}
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
                  <FavouriteCategories userId={this.state.profile.id} />
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

                      {this.generateStats()}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <RateList
            userId={this.state.profile.id}
            history={this.props.history}
          />
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

export default connect(mapStateToProps, { getUserById })(Profile);
