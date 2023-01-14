import React from "react";

import ReviewJob from "../components/admin/reviewJobs.component";
import News from "../components/admin/createNews.component";

import ProtectedRoute from "./protectedRoutes";
import { Switch } from "react-router-dom";
import AllNews from "../components/admin/allNews.component";
import AllEventsAdmin from "../components/admin/allEvents.component";
import AllFundingUpdatesAdmin from "../components/admin/allFU.component";
import AllRFP from "../components/admin/allRFP.component";
import KycList from "../components/admin/kycList.component";
import AllAcademics from "../components/admin/academics.component";
import ManageUser from "../components/admin/manageUsers.component";
import GcList from "../components/admin/gcList.component";
import UserList from "../components/admin/userList.component";
import AllJobsAdmin from "../components/admin/allJobs.component";
import ReviewEvents from "../components/admin/reviewEvents.component";
import ReviewFund from "../components/admin/reviewFund.component";
const AdminRoutes = () => {
  return (
    <div>
      <Switch>
        <ProtectedRoute exact path="/admin/reviewJob" component={ReviewJob} />
        {/* nazmul  hasan----------------- */}
        <ProtectedRoute
          exact
          path="/admin/reviewEvent"
          component={ReviewEvents}
        />
        <ProtectedRoute exact path="/admin/reviewFund" component={ReviewFund} />
        {/*End nazmul  hasan----------------- */}
        <ProtectedRoute exact path="/admin/createNews" component={News} />
        <ProtectedRoute exact path="/admin/allJobs" component={AllJobsAdmin} />
        <ProtectedRoute exact path="/admin/allNews" component={AllNews} />
        <ProtectedRoute
          exact
          path="/admin/events/:id"
          component={AllEventsAdmin}
        />
        <ProtectedRoute
          exact
          path="/admin/allFundingUpdates"
          component={AllFundingUpdatesAdmin}
        />
        <ProtectedRoute exact path="/admin/allRFP" component={AllRFP} />
        <ProtectedRoute exact path="/admin/kycList" component={KycList} />
        <ProtectedRoute
          exact
          path="/admin/academics"
          component={AllAcademics}
        />
        <ProtectedRoute
          exact
          path="/admin/manageUsers"
          component={ManageUser}
        />
        <ProtectedRoute exact path="/admin/gcData" component={GcList} />
        <ProtectedRoute exact path="/admin/newUserList" component={UserList} />
      </Switch>
    </div>
  );
};

export default AdminRoutes;
