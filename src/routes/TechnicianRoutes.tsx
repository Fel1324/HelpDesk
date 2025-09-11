import { Routes, Route } from "react-router";

import { MyTickets } from "../pages/technician/MyTickets";
import { NotFound } from "../pages/NotFound";

export function TechnicianRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MyTickets />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}