import { Routes, Route } from "react-router";

import { AppLayout } from "../components/layouts/AppLayout";
import { NotFound } from "../pages/NotFound";

import { TicketsList } from "../pages/TicketsList";
import { CreateTicket } from "../pages/customer/CreateTicket";

export function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<TicketsList />} />
        <Route path="/ticket/create" element={<CreateTicket />} />
      </Route>


      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}