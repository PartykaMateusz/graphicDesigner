import React, { Component } from "react";
import "./RegisterClientForm.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerUser } from "../../actions/projectActions";

class RegisterClientForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      email: "",
      password: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeLogin(e) {
    this.setState({
      login: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      login: this.state.login,
      email: this.state.email,
      password: this.state.password
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    return (
      <form
        className="form-horizontal"
        role="form"
        id="registerForm"
        onSubmit={this.onSubmit}
      >
        <h2>Rejestracja</h2>
        <div className="form-group">
          <label htmlFor="login" className="col-sm-3 control-label">
            Login
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              id="login"
              name="login"
              placeholder="Login"
              className="form-control"
              value={this.state.login}
              onChange={this.onChangeLogin.bind(this)}
              autoFocus
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email" className="col-sm-3 control-label">
            Email*{" "}
          </label>
          <div className="col-sm-9">
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="form-control"
              name="email"
              required
              value={this.state.email}
              onChange={this.onChangeEmail.bind(this)}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password" className="col-sm-3 control-label">
            Hasło*
          </label>
          <div className="col-sm-9">
            <input
              type="password"
              id="password"
              placeholder="Hasło"
              className="form-control"
              required
              value={this.state.password}
              onChange={this.onChangePassword.bind(this)}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-9 col-sm-offset-3">
            <span className="help-block">*Wymagane pola</span>
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Zarejestruj
        </button>
      </form>
    );
  }
}

RegisterClientForm.propTypes = {
  registerUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { registerUser }
)(RegisterClientForm);
