import { Routes, Route } from "react-router";

import { Tickets } from "../pages/customer/Tickets";
import { NotFound } from "../pages/NotFound";

export function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Tickets />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}