import { Routes, Route } from "react-router";

import { AppLayout } from "../components/layouts/AppLayout";
import { MyTickets } from "../pages/technician/MyTickets";
import { NotFound } from "../pages/NotFound";

export function TechnicianRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<MyTickets />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}