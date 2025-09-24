import { Routes, Route } from "react-router";

import { AppLayout } from "../components/layouts/AppLayout";
import { TicketsList } from "../pages/admin/TicketsList";
import { NotFound } from "../pages/NotFound";

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<TicketsList />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}