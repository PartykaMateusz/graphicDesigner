import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const SecuredRoute = ({ component: Component, security, ...otherProps }) => (
  <Route
    {...otherProps}
    render={props =>
      security.validToken === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

SecuredRoute.propTypes = { security: PropTypes.object.isRequired };

const stateMapsToProps = state => ({
  security: state.security
});

export default connect(stateMapsToProps)(SecuredRoute);
