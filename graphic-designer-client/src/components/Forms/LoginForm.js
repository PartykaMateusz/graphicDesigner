import React, { Component } from "react";
import "./LoginForm.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/securityActions";
import classnames from "classnames";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.security.validToken) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const User = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.login(User);
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <form className="form-inline" onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="usernameLoginForm"
              placeholder="Login"
              name="username"
              value={this.state.username}
              onChange={this.onChange}
              className={classnames("form-control ", {
                "is-invalid": errors.error
              })}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="passwordLoginForm"
              placeholder="Hasło"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
              className={classnames("form-control ", {
                "is-invalid": errors.error
              })}
            />
            {errors.error && (
              <div className="invalid-feedback">{errors.error_description}</div>
            )}
          </div>
          <div className="form-group">
            <button type="submit">Zaloguj</button>
          </div>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  security: state.security
});

export default connect(
  mapStateToProps,
  { login }
)(LoginForm);
