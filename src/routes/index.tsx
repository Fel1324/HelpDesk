import { BrowserRouter } from "react-router";

import { AuthRoutes } from "./AuthRoutes";
import { AdminRoutes } from "./AdminRoutes";
import { TechnicianRoutes } from "./TechnicianRoutes";
import { CustomerRoutes } from "./CustomerRoutes";

export function Routes() {
  const session = {
    user: {
      role: ""
    }
  }

  function Route() {
    switch(session?.user.role) {
      case "admin":
        return <AdminRoutes />;
      case "technician":
        return <TechnicianRoutes />;
      case "customer":
        return <CustomerRoutes />;
      default:
        return <AuthRoutes />;
    }
  }

  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  );
}
