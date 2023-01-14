import React from "react";
import ProtectedRoute from "./protectedRoutes";
import KycStatus from "../components/user/kycStatus.component";
import CreateJob from "../components/user/createPost/createJobPost";
import AwardEvent from "../components/user/createPost/events/awardEvent";
import WorkshopEvent from "../components/user/createPost/events/workshopEvent";
import ExhibitionEvent from "../components/user/createPost/events/exhibitionEvent";
import RFP from "../components/user/forms/createRFP";
import UpdateKYC from "../components/user/forms/updateKYC";
import MyJobs from "../components/user/dashBoard/myJobs.component";
import UpdateJob from "../components/user/forms/updateJob";
import Academics from "../components/user/createPost/createAcademics";
import CSRForm from "../components/csr/csrForm";
import NgoFundingUpdate from "../components/user/apply/fundingUpdate/ngoFundingUpdate";
import FundingUpdateNew from "../components/user/createPost/createFundingupdateNew";
import FundingUpdateOld from "../components/user/forms/createFundingUpdateOld";
import MyFu from "../components/user/dashBoard/myFu.comonent";
import { Switch } from "react-router-dom";
import WorkshopsEventDetails from "../components/user/apply/events/workshopEventDetails";
import awardsEventDetails from "../components/user/apply/events/awardsEventDetails";
import exhibitionsEventDetails from "../components/user/apply/events/exhibitionsEventDetails";
import AllEvents from "../components/user/services/AllEvents";
import AllFundingUpdates from "../components/user/services/AllFU";
import allJobsComponent from "../components/user/services/AllJobs";
import MyEvents from "../components/user/dashBoard/myEvents";

const UserRoutes = () => {
  return (
    <div>
      <Switch>
        <ProtectedRoute exact path="/user/kycstatus" component={KycStatus} />
        <ProtectedRoute exact path="/user/create/job" component={CreateJob} />
        <ProtectedRoute exact path="/user/updateJob" component={UpdateJob} />
        <ProtectedRoute
          exact
          path="/user/create/event/workshopEvent"
          component={WorkshopEvent}
        />
        <ProtectedRoute
          exact
          path="/user/create/event/awardEvent"
          component={AwardEvent}
        />
        <ProtectedRoute
          exact
          path="/user/create/event/exhibitionEvent"
          component={ExhibitionEvent}
        />
        <ProtectedRoute exact path="/user/rfp" component={RFP} />
        <ProtectedRoute
          exact
          path="/user/create/fundingUpdate"
          component={FundingUpdateNew}
        />
        {/* <ProtectedRoute
          exact
          path="/user/create/fundingUpdateOld"
          component={FundingUpdateOld}
        /> */}
        <ProtectedRoute exact path="/user/academics" component={Academics} />
        <ProtectedRoute exact path="/user/updateKYC" component={UpdateKYC} />
        <ProtectedRoute
          exact
          path="/user/dashboard/myEvents"
          component={MyEvents}
        />
        <ProtectedRoute
          exact
          path="/user/dashboard/myFundingUpdate"
          component={MyFu}
        />
        <ProtectedRoute
          exact
          path="/user/dashboard/myJobs"
          component={MyJobs}
        />
        <ProtectedRoute exact path="/csrForm" component={CSRForm} />

        <ProtectedRoute exact path="/jobs/:id" component={allJobsComponent} />
        <ProtectedRoute
          exact
          path="/fundingUpdates/:id"
          component={AllFundingUpdates}
        />
        <ProtectedRoute
          exact
          path="/fundingUpdate/ngo/:id"
          component={NgoFundingUpdate}
        />

        <ProtectedRoute exact path="/event/:id" component={AllEvents} />
        <ProtectedRoute
          exact
          path="/event/:category/:id"
          component={WorkshopsEventDetails}
        />
        <ProtectedRoute
          exact
          path="/event/:category/:id"
          component={awardsEventDetails}
        />
        <ProtectedRoute
          exact
          path="/event/:category/:id"
          component={exhibitionsEventDetails}
        />
      </Switch>
    </div>
  );
};
export default UserRoutes;
