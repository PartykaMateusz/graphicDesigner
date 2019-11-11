import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../StartPage/logo.png";
import "./Navbar.css";
import PropTypes from "prop-types";
import { logout } from "../../actions/securityActions";
import { getUserByUsername } from "../../actions/profileActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { ROLE_USER, ROLE_DESIGNER } from "../../actions/types";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { role: "", username: "" };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    if (this.props.security.validToken) {
      this.setState({
        username: this.props.security.user.user_name
      });
      //get user data
      this.props.getUserByUsername(this.props.security.user.user_name);
    } else {
      this.props.history.push("/");
    }
  }

  componentWillUpdate(nextProps) {
    if (!nextProps.security.validToken) {
      this.props.history.push("/");
    }
    if (this.state.username !== nextProps.security.user.user_name) {
      this.setState({
        username: nextProps.security.user.user_name
      });
    }
    if (this.state.role !== nextProps.profile.data.role) {
      this.setState({
        role: nextProps.profile.data.role
      });
    }
  }

  logout() {
    this.props.logout();
  }

  generatePanelLink = () => {
    if (this.state.role === ROLE_USER) {
      return (
        <Link to="/userPanel" className="navbar-notification float-right">
          <FontAwesomeIcon icon={faAddressCard} />
        </Link>
      );
    }
    if (this.state.role === ROLE_DESIGNER) {
      return (
        <Link to="/designerPanel" className="navbar-notification float-right">
          <FontAwesomeIcon icon={faAddressCard} />
        </Link>
      );
    }
  };

  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-default navbar-default"
        id="indexNavbar"
      >
        <Link className="nav-link text-light col-sm-3" to="/">
          <img className="logo" src={Logo} alt="logo" />
          GRAPHIC DESIGNER
        </Link>

        <div className="col-sm-2 offset-sm-5">{this.generatePanelLink()}</div>

        <div className="dropdown col-sm-2">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {this.state.username}
          </button>
          <div className="dropdown-menu">
            {this.generateProfileLink}
            <Link to="/profile" className="dropdown-item">
              Profil
            </Link>
            <div className="dropdown-item mousePointer" onClick={this.logout}>
              Wyloguj
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  getUserByUsername: PropTypes.func.isRequired,
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
  { logout, getUserByUsername }
)(Navbar);
