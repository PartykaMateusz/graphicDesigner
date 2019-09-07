import React, { Component } from "react";
import "./RegisterClientForm.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerUser } from "../../actions/securityActions";
import classnames from "classnames";

class RegisterClientForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      accountRole: this.props.accountRole,
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
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
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      role: this.state.accountRole
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <form
        className="form-horizontal"
        role="form"
        id="registerForm"
        onSubmit={this.onSubmit}
      >
        {this.header()}
        <div className="form-group">
          <label htmlFor="login" className="col-sm-3 control-label">
            Login
          </label>
          <div className="col-sm-11">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Login"
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername.bind(this)}
              autoFocus
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email" className="col-sm-3 control-label">
            Email*{" "}
          </label>
          <div className="col-sm-11">
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
          <div className="col-sm-11  ">
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
        {/* //error: */}
        <div
          className={classnames("form-control d-none", {
            "is-invalid": errors.error
          })}
        />
        {errors.error && <div className="invalid-feedback">{errors.error}</div>}
      </form>
    );
  }

  header() {
    if (this.state.accountRole === "USER") {
      return (
        <h2>
          REJESTRACJA <span className="badge badge-secondary">KLIENTA</span>
        </h2>
      );
    }
    if (this.state.accountRole === "DESIGNER") {
      return (
        <h2>
          REJESTRACJA <span className="badge badge-secondary">GRAFIKA</span>
        </h2>
      );
    }
  }
}

RegisterClientForm.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(RegisterClientForm);
