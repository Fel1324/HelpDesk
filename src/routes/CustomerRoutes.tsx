import { Routes, Route } from "react-router";

import { AppLayout } from "../components/layouts/AppLayout";
import { Tickets } from "../pages/customer/Tickets";
import { NotFound } from "../pages/NotFound";

export function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Tickets />} />
      </Route>


      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}