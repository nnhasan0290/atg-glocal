import React from "react";

import PublicRoutes from "./public.routes";
import UserRoutes from "./user.routes";
import AdminRoutes from "./admin.routes";
import Switch from "react-bootstrap/esm/Switch";

const Routes = () => {
  return (
    <Switch>
      <PublicRoutes />

      <UserRoutes />

      <AdminRoutes />
    </Switch>
  );
};
export default Routes;
