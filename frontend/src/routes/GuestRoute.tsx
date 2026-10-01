

// import { Navigate, Outlet } from "react-router-dom";
// import { useAppSelector } from "@/app/store/hooks";

// export function GuestRoute() {
//   const user = useAppSelector((state) => state.auth.user);

//   if (user) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return <Outlet />;
// }


import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "@/app/store/hooks";

export function GuestRoute() {
  const { user, initialized } = useAppSelector(
    (state) => state.auth
  );

  if (!initialized) {
    return null;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}