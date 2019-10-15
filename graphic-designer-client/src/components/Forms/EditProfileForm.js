import React, { Component } from "react";
import "./RegisterClientForm.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateProfile, updateAvatar } from "../../actions/profileActions";
import FileBase64 from "react-file-base64";
import classnames from "classnames";

class EditProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      telNumber: "",
      files: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.user) {
      this.setState({
        email: nextProps.user.email,
        firstName: nextProps.user.firstName,
        lastName: nextProps.user.lastName,
        telNumber: nextProps.user.telNumber
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // Callback~
  getFiles(files) {
    this.setState({ files: files });
  }

  onSubmit(e) {
    e.preventDefault();
    let actUserId = this.props.profile.data.id;

    const user = {
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      telNumber: this.state.telNumber
    };

    this.props
      .updateProfile(actUserId, user, this.props.history)
      .then(response => {
        if (this.state.files[0]) {
          const avatar = {
            name: this.state.files[0].name,
            size: this.state.files[0].size,
            type: this.state.files[0].type,
            base64: this.state.files[0].base64
          };

          this.props.updateAvatar(actUserId, avatar);
        }
      });
  }

  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Adres email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={this.state.email}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Imię</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={this.state.firstName}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Nazwisko</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={this.state.lastName}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="telNumber">Numer telefonu</label>
          <input
            type="text"
            className="form-control"
            id="telNumber"
            name="telNumber"
            value={this.state.telNumber}
            onChange={this.onChange}
          />
        </div>

        <FileBase64 multiple={true} onDone={this.getFiles.bind(this)} />

        <button type="submit" className="btn btn-primary">
          Zatwierdź
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
}

EditProfileForm.propTypes = {
  errors: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired,
  updateAvatar: PropTypes.func.isRequired,
  profile: PropTypes.object
};

const mapStateToProps = state => ({
  errors: state.errors,
  updateProfile: state.updateProfile,
  updateAvatar: state.updateAvatar,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { updateProfile, updateAvatar }
)(EditProfileForm);
