import { Routes, Route } from "react-router";

import { AppLayout } from "../components/layouts/AppLayout";
import { TicketsList } from "../pages/admin/TicketsList";
import { Technicians } from "../pages/admin/Technicians";
import { NotFound } from "../pages/NotFound";

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<TicketsList />} />
        <Route path="/technicians" element={<Technicians />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}