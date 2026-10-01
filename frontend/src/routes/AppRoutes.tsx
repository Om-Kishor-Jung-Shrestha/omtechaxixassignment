import { Routes } from "react-router-dom";

import { PublicRoutes } from "./PublicRoutes";
import { AuthRoutes } from "./AuthRoutes";
import { AdminRoutes } from "./AdminRoutes";

export function AppRoutes() {
  return (
    <Routes>
      <PublicRoutes />
      <AuthRoutes />
      <AdminRoutes />
    </Routes>
  );
}