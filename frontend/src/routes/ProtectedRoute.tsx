
// import { Navigate, Outlet } from "react-router-dom";
// import { useAppSelector } from "@/app/store/hooks";

// export function ProtectedRoute() {
//   const user = useAppSelector((state) => state.auth.user);

//   console.log("PROTECTED ROUTE USER:", user);

//   if (!user) {
//     console.log("PROTECTED ROUTE: NO USER -> LOGIN");
//     return <Navigate to="/login" replace />;
//   }

//   console.log("PROTECTED ROUTE: USER FOUND -> DASHBOARD");

//   return <Outlet />;
// }

import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "@/app/store/hooks";

export function ProtectedRoute() {
  const { user, initialized } = useAppSelector(
    (state) => state.auth
  );

  if (!initialized) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}