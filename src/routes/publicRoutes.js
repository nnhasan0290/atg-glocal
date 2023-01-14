import React from "react";
import { Route } from "react-router-dom";

import { connect } from "react-redux";

const PublicRoute = ({ component: Component, user, ...rest }) => {
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}
export default connect(mapStateToProps)(PublicRoute);
