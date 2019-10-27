import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../StartPage/logo.png";
import "./Navbar.css";
import PropTypes from "prop-types";
import { logout } from "../../actions/securityActions";
import { getUserByUsername } from "../../actions/profileActions";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
  }

  logout() {
    this.props.logout();
  }

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

        <div className="dropdown col-sm-2 offset-sm-7">
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
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  security: state.security
});

export default connect(
  mapStateToProps,
  { logout, getUserByUsername }
)(Navbar);
