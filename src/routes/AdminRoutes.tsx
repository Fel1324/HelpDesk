import { Routes, Route } from "react-router";

import { TicketsList } from "../pages/admin/TicketsList";
import { NotFound } from "../pages/NotFound";

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TicketsList />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}