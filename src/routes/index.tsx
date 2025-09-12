import { BrowserRouter } from "react-router";

import { useAuth } from "../hooks/useAuth";

import { AuthRoutes } from "./AuthRoutes";
import { AdminRoutes } from "./AdminRoutes";
import { TechnicianRoutes } from "./TechnicianRoutes";
import { CustomerRoutes } from "./CustomerRoutes";

const isLoading = false;

export function Routes() {
  const { session } = useAuth();

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

  if(isLoading) {
    return <h1>...Loading</h1>
  }

  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  );
}
