import { Routes, Route } from "react-router";

import { AppLayout } from "../components/layouts/AppLayout";
import { NotFound } from "../pages/NotFound";
import { TicketsList } from "../pages/TicketsList";

export function TechnicianRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<TicketsList />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}