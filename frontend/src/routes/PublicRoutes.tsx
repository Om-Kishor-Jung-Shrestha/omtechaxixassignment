import { Route } from "react-router-dom";

import { PublicLayout } from "@/layouts/PublicLayout/PublicLayout";
import { HomePage } from "@/pages/public/HomePage";

export function PublicRoutes() {
  return (
    <Route element={<PublicLayout />}>
      <Route path="/" element={<HomePage />} />
    </Route>
  );
}