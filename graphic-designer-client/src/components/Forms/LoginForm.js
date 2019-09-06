import React, { Component } from "react";
import "./LoginForm.css";

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
    return (
      <div>
        <form className="form-inline" onSubmit={this.onSubmit}>
          <input
            type="text"
            id="login"
            placeholder="Login"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
          />

          <input
            type="password"
            id="password"
            placeholder="Hasło"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />

          <button type="submit">Zaloguj</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
