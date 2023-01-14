import React from "react";

import PublicRoute from "./publicRoutes";

import Login from "../components/auth/login.component";
import Register from "../components/auth/register.component";

import ForgotPassword from "../components/auth/forgot.component";
import ResetPassword from "../components/auth/reset.component";

import PrivacyPolicy from "../utils/privacyPolicy";
import Terms from "../utils/terms";
import { Switch, Route } from "react-router-dom";
import RFPPolicy from "../utils/rfpPolicy";
import JobsPolicy from "../utils/jobsPolicy";
import EventsPolicy from "../utils/eventsPolicy";

const UserRoutes = () => {
  return (
    <div>
      <Switch>
        <PublicRoute exact path={["/login", "/"]} component={Login} />
        <PublicRoute exact path='/register' component={Register} />
        <PublicRoute exact path='/forgotPassword' component={ForgotPassword} />
        <PublicRoute exact path='/resetPassword' component={ResetPassword} />

        <Route exact path='/privacyPolicy' component={PrivacyPolicy} />
        <Route exact path='/terms' component={Terms} />
        <Route exact path='/rfpPolicy' component={RFPPolicy} />
        <Route exact path='/jobsPolicy' component={JobsPolicy} />
        <Route exact path='/eventsPolicy' component={EventsPolicy} />
      </Switch>
    </div>
  );
};
export default UserRoutes;
