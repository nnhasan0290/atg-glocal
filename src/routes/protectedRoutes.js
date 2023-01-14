import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = ({ component: Component, user, ...rest }) => {
  const isLoggedIn = user;

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

function mapStateToProps(state) {
  const { user } = state.auth;

  return {
    user,
  };
}

export default connect(mapStateToProps)(ProtectedRoute);
