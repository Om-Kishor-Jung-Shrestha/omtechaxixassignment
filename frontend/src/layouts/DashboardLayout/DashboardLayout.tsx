// import { useEffect, useRef, useState } from "react";

// import {
//   Bell,
//   BookOpen,
//   ChevronDown,
//   ClipboardList,
//   FileText,
//   LayoutDashboard,
//   LogOut,
//   Menu,
//   Moon,
//   Settings,
//   Sun,
//   UserRound,
//   Users,
//   X,
// } from "lucide-react";

// import {
//   Link,
//   NavLink,
//   Outlet,
//   useNavigate,
// } from "react-router-dom";

// import {
//   useAppDispatch,
//   useAppSelector,
// } from "@/app/store/hooks";

// import { clearAuth } from "@/app/store/slices/auth/auth.slice";

// import { useLogoutMutation } from "@/features/auth/api/auth.api";

// /* =========================================================
//    NAVIGATION
// ========================================================= */

// const commonNavigation = [
//   {
//     label: "Dashboard",
//     to: "/dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     label: "Applications",
//     to: "/applications",
//     icon: ClipboardList,
//   },
//   {
//     label: "Profile",
//     to: "/profile",
//     icon: UserRound,
//   },
// ];

// const administrationNavigation = [
//   {
//     label: "Programs",
//     to: "/admin/programs",
//     icon: BookOpen,
//   },
//   {
//     label: "Courses",
//     to: "/admin/courses",
//     icon: FileText,
//   },
//   {
//     label: "Users",
//     to: "/admin/users",
//     icon: Users,
//   },
//   {
//     label: "Settings",
//     to: "/admin/settings",
//     icon: Settings,
//   },
// ];

// /* =========================================================
//    HELPERS
// ========================================================= */

// function getInitials(
//   firstName?: string,
//   lastName?: string
// ) {
//   return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`
//     .toUpperCase();
// }

// /* =========================================================
//    NAVIGATION LINK
// ========================================================= */

// function NavigationLink({
//   to,
//   label,
//   icon: Icon,
// }: {
//   to: string;
//   label: string;
//   icon: React.ElementType;
// }) {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         [
//           "flex items-center gap-3 rounded-xl px-3 py-2.5",
//           "text-sm font-medium transition-colors",
//           isActive
//             ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
//             : "text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-900 dark:hover:text-white",
//         ].join(" ")
//       }
//     >
//       <Icon className="h-[18px] w-[18px] shrink-0" />

//       <span>{label}</span>
//     </NavLink>
//   );
// }

// /* =========================================================
//    SIDEBAR CONTENT
// ========================================================= */

// function SidebarContent({
//   onNavigate,
// }: {
//   onNavigate?: () => void;
// }) {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();

//   const user = useAppSelector(
//     (state) => state.auth.user
//   );

//   const [logout] = useLogoutMutation();

//   const isAdmin =
//     user?.role === "admin" ||
//     user?.role === "superadmin";

//   const fullName =
//     `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();

//   const roleLabel =
//     user?.role === "superadmin"
//       ? "Super Administrator"
//       : user?.role === "admin"
//         ? "Administrator"
//         : "Admission Counselor";

//   const initials = getInitials(
//     user?.firstName,
//     user?.lastName
//   );

//   async function handleLogout() {
//     try {
//       await logout().unwrap();
//     } catch {
//       // Clear local auth even if API logout fails.
//     } finally {
//       dispatch(clearAuth());

//       onNavigate?.();

//       navigate("/login", {
//         replace: true,
//       });
//     }
//   }

//   return (
//     <div className="flex h-full flex-col">
//       {/* =====================================================
//           BRAND
//       ===================================================== */}

//       <div className="flex h-[72px] shrink-0 items-center border-b border-stone-200 px-5 dark:border-stone-800">
//         <Link
//           to="/dashboard"
//           onClick={onNavigate}
//           className="flex items-center gap-3"
//         >
//           <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-xs font-bold text-white">
//             CA
//           </div>

//           <div>
//             <p className="text-sm font-bold leading-tight text-stone-900 dark:text-stone-100">
//               College Admission
//             </p>

//             <p className="text-[10px] leading-tight text-stone-500">
//               Management System
//             </p>
//           </div>
//         </Link>
//       </div>

//       {/* =====================================================
//           NAVIGATION
//       ===================================================== */}

//       <div className="flex-1 overflow-y-auto px-3 py-5">
//         {/* Common navigation */}
//         <nav className="space-y-1">
//           {commonNavigation.map((item) => (
//             <NavigationLink
//               key={item.to}
//               {...item}
//             />
//           ))}
//         </nav>

//         {/* Admin navigation */}
//         {isAdmin && (
//           <div className="mt-8">
//             <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400">
//               Administration
//             </p>

//             <nav className="space-y-1">
//               {administrationNavigation.map(
//                 (item) => (
//                   <NavigationLink
//                     key={item.to}
//                     {...item}
//                   />
//                 )
//               )}
//             </nav>
//           </div>
//         )}
//       </div>

//       {/* =====================================================
//           BOTTOM ACCOUNT
//       ===================================================== */}

//       <div className="shrink-0 border-t border-stone-200 p-3 dark:border-stone-800">
//         {/* Profile */}
//         <button
//           type="button"
//           onClick={() => navigate("/profile")}
//           className="flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition hover:bg-stone-100 dark:hover:bg-stone-900"
//         >
//           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
//             {initials || "U"}
//           </div>

//           <div className="min-w-0 flex-1">
//             <p className="truncate text-sm font-semibold text-stone-900 dark:text-stone-100">
//               {fullName || "User"}
//             </p>

//             <p className="text-xs text-stone-500">
//               {roleLabel}
//             </p>
//           </div>
//         </button>

//         {/* Logout */}
//         <button
//           type="button"
//           onClick={handleLogout}
//           className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-900 dark:hover:text-white"
//         >
//           <LogOut className="h-[18px] w-[18px]" />

//           <span>Logout</span>
//         </button>
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    DESKTOP SIDEBAR
// ========================================================= */

// function Sidebar() {
//   return (
//     <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r border-stone-200 bg-white lg:flex dark:border-stone-800 dark:bg-stone-950">
//       <SidebarContent />
//     </aside>
//   );
// }

// /* =========================================================
//    MOBILE SIDEBAR
// ========================================================= */

// function MobileSidebar({
//   open,
//   onClose,
// }: {
//   open: boolean;
//   onClose: () => void;
// }) {
//   if (!open) {
//     return null;
//   }

//   return (
//     <div className="fixed inset-0 z-50 lg:hidden">
//       {/* Overlay */}
//       <button
//         type="button"
//         aria-label="Close navigation"
//         onClick={onClose}
//         className="absolute inset-0 bg-black/30"
//       />

//       {/* Drawer */}
//       <aside className="absolute inset-y-0 left-0 flex w-72 flex-col bg-white shadow-xl dark:bg-stone-950">
//         {/* Close button */}
//         <div className="absolute right-3 top-4 z-10">
//           <button
//             type="button"
//             onClick={onClose}
//             className="flex h-9 w-9 items-center justify-center rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-900"
//             aria-label="Close navigation"
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>

//         <SidebarContent
//           onNavigate={onClose}
//         />
//       </aside>
//     </div>
//   );
// }

// /* =========================================================
//    DASHBOARD HEADER
// ========================================================= */

// function DashboardHeader({
//   onMenuClick,
// }: {
//   onMenuClick: () => void;
// }) {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();

//   const user = useAppSelector(
//     (state) => state.auth.user
//   );

//   const [logout] = useLogoutMutation();

//   const [profileOpen, setProfileOpen] =
//     useState(false);

//   const [notificationOpen, setNotificationOpen] =
//     useState(false);

//   /* =======================================================
//      THEME
//   ======================================================= */

//   const [darkMode, setDarkMode] = useState(() => {
//     const savedTheme =
//       localStorage.getItem("dashboard-theme");

//     if (savedTheme === "dark") {
//       return true;
//     }

//     if (savedTheme === "light") {
//       return false;
//     }

//     return window.matchMedia(
//       "(prefers-color-scheme: dark)"
//     ).matches;
//   });

//   const profileRef =
//     useRef<HTMLDivElement>(null);

//   const notificationRef =
//     useRef<HTMLDivElement>(null);

//   const isAdmin =
//     user?.role === "admin" ||
//     user?.role === "superadmin";

//   const fullName =
//     `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();

//   const roleLabel =
//     user?.role === "superadmin"
//       ? "Super Administrator"
//       : user?.role === "admin"
//         ? "Administrator"
//         : "Admission Counselor";

//   const initials = getInitials(
//     user?.firstName,
//     user?.lastName
//   );

//   /* =======================================================
//      THEME EFFECT
//   ======================================================= */

//   useEffect(() => {
//     document.documentElement.classList.toggle(
//       "dark",
//       darkMode
//     );

//     localStorage.setItem(
//       "dashboard-theme",
//       darkMode ? "dark" : "light"
//     );
//   }, [darkMode]);

//   /* =======================================================
//      CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
//   ======================================================= */

//   useEffect(() => {
//     function handleOutsideClick(
//       event: MouseEvent
//     ) {
//       const target = event.target as Node;

//       if (
//         profileRef.current &&
//         !profileRef.current.contains(target)
//       ) {
//         setProfileOpen(false);
//       }

//       if (
//         notificationRef.current &&
//         !notificationRef.current.contains(target)
//       ) {
//         setNotificationOpen(false);
//       }
//     }

//     document.addEventListener(
//       "mousedown",
//       handleOutsideClick
//     );

//     return () => {
//       document.removeEventListener(
//         "mousedown",
//         handleOutsideClick
//       );
//     };
//   }, []);

//   /* =======================================================
//      LOGOUT
//   ======================================================= */

//   async function handleLogout() {
//     try {
//       await logout().unwrap();
//     } catch {
//       // Clear local state regardless of API result.
//     } finally {
//       dispatch(clearAuth());

//       setProfileOpen(false);
//       setNotificationOpen(false);

//       navigate("/login", {
//         replace: true,
//       });
//     }
//   }

//   return (
//     <header className="sticky top-0 z-30 h-[72px] border-b border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
//       <div className="flex h-full items-center px-4 sm:px-6 lg:px-8">
//         {/* =================================================
//             MOBILE MENU
//         ================================================= */}

//         <button
//           type="button"
//           onClick={onMenuClick}
//           className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg text-stone-600 hover:bg-stone-100 lg:hidden dark:text-stone-300 dark:hover:bg-stone-900"
//           aria-label="Open navigation"
//         >
//           <Menu className="h-5 w-5" />
//         </button>

//         {/* =================================================
//             RIGHT SIDE CONTROLS
//         ================================================= */}

//         <div className="ml-auto flex items-center gap-2">
//           {/* =================================================
//               THEME SWITCHER
//           ================================================= */}

//           <button
//             type="button"
//             onClick={() =>
//               setDarkMode(
//                 (current) => !current
//               )
//             }
//             className="flex h-10 w-10 items-center justify-center rounded-lg text-stone-500 transition hover:bg-stone-100 hover:text-stone-800 dark:text-stone-300 dark:hover:bg-stone-900"
//             aria-label={
//               darkMode
//                 ? "Switch to light theme"
//                 : "Switch to dark theme"
//             }
//             title={
//               darkMode
//                 ? "Switch to light theme"
//                 : "Switch to dark theme"
//             }
//           >
//             {darkMode ? (
//               <Sun className="h-[19px] w-[19px]" />
//             ) : (
//               <Moon className="h-[19px] w-[19px]" />
//             )}
//           </button>

//           {/* =================================================
//               NOTIFICATIONS
//           ================================================= */}

//           <div
//             ref={notificationRef}
//             className="relative"
//           >
//             <button
//               type="button"
//               onClick={() => {
//                 setNotificationOpen(
//                   (current) => !current
//                 );

//                 setProfileOpen(false);
//               }}
//               className="relative flex h-10 w-10 items-center justify-center rounded-lg text-stone-500 transition hover:bg-stone-100 hover:text-stone-800 dark:text-stone-300 dark:hover:bg-stone-900"
//               aria-label="Notifications"
//               aria-expanded={
//                 notificationOpen
//               }
//             >
//               <Bell className="h-[19px] w-[19px]" />

//               {/* Notification indicator */}
//               <span className="absolute right-[9px] top-[8px] h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-stone-950" />
//             </button>

//             {notificationOpen && (
//               <div className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xl dark:border-stone-800 dark:bg-stone-950">
//                 <div className="flex items-center justify-between border-b border-stone-200 px-4 py-3 dark:border-stone-800">
//                   <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
//                     Notifications
//                   </p>

//                   <span className="text-xs text-stone-400">
//                     0 new
//                   </span>
//                 </div>

//                 <div className="p-4">
//                   <div className="rounded-lg bg-stone-50 p-4 dark:bg-stone-900">
//                     <p className="text-sm font-medium text-stone-800 dark:text-stone-100">
//                       No new notifications
//                     </p>

//                     <p className="mt-1 text-xs leading-5 text-stone-500">
//                       You are all caught up.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* =================================================
//               DIVIDER
//           ================================================= */}

//           <div className="mx-1 hidden h-9 w-px bg-stone-200 sm:block dark:bg-stone-800" />

//           {/* =================================================
//               PROFILE
//           ================================================= */}

//           <div
//             ref={profileRef}
//             className="relative"
//           >
//             <button
//               type="button"
//               onClick={() => {
//                 setProfileOpen(
//                   (current) => !current
//                 );

//                 setNotificationOpen(false);
//               }}
//               className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-stone-50 dark:hover:bg-stone-900"
//               aria-haspopup="menu"
//               aria-expanded={profileOpen}
//             >
//               {/* Name */}
//               <div className="hidden text-right sm:block">
//                 <p className="text-sm font-semibold text-stone-800 dark:text-stone-100">
//                   {fullName || "User"}
//                 </p>

//                 <p className="text-xs text-stone-400">
//                   {roleLabel}
//                 </p>
//               </div>

//               {/* Avatar */}
//               <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
//                 {initials || "U"}
//               </div>

//               {/* Arrow */}
//               <ChevronDown
//                 className={`hidden h-4 w-4 text-stone-400 transition sm:block ${
//                   profileOpen
//                     ? "rotate-180"
//                     : ""
//                 }`}
//               />
//             </button>

//             {/* =================================================
//                 PROFILE DROPDOWN
//             ================================================= */}

//             {profileOpen && (
//               <div
//                 className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xl dark:border-stone-800 dark:bg-stone-950"
//                 role="menu"
//               >
//                 {/* User information */}
//                 <div className="border-b border-stone-200 px-4 py-4 dark:border-stone-800">
//                   <div className="flex items-center gap-3">
//                     <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
//                       {initials || "U"}
//                     </div>

//                     <div className="min-w-0">
//                       <p className="truncate text-sm font-semibold text-stone-900 dark:text-stone-100">
//                         {fullName || "User"}
//                       </p>

//                       <p className="truncate text-xs text-stone-500">
//                         {user?.email}
//                       </p>

//                       <p className="mt-0.5 text-xs text-stone-400">
//                         {roleLabel}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Menu items */}
//                 <div className="p-2">
//                   {/* My Profile */}
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setProfileOpen(false);

//                       navigate("/profile");
//                     }}
//                     className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-stone-700 transition hover:bg-stone-100 dark:text-stone-200 dark:hover:bg-stone-900"
//                     role="menuitem"
//                   >
//                     <UserRound className="h-4 w-4 text-stone-400" />

//                     <span>My Profile</span>
//                   </button>

//                   {/* Settings - Admin only */}
//                   {isAdmin && (
//                     <button
//                       type="button"
//                       onClick={() => {
//                         setProfileOpen(false);

//                         navigate(
//                           "/admin/settings"
//                         );
//                       }}
//                       className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-stone-700 transition hover:bg-stone-100 dark:text-stone-200 dark:hover:bg-stone-900"
//                       role="menuitem"
//                     >
//                       <Settings className="h-4 w-4 text-stone-400" />

//                       <span>Settings</span>
//                     </button>
//                   )}

//                   {/* Divider */}
//                   <div className="my-1 border-t border-stone-200 dark:border-stone-800" />

//                   {/* Logout */}
//                   <button
//                     type="button"
//                     onClick={handleLogout}
//                     className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
//                     role="menuitem"
//                   >
//                     <LogOut className="h-4 w-4" />

//                     <span>Logout</span>
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// /* =========================================================
//    DASHBOARD LAYOUT
// ========================================================= */

// export function DashboardLayout() {
//   const [mobileOpen, setMobileOpen] =
//     useState(false);

//   return (
//     <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
//       {/* ===================================================
//           DESKTOP SIDEBAR
//       =================================================== */}

//       <Sidebar />

//       {/* ===================================================
//           MOBILE SIDEBAR
//       =================================================== */}

//       <MobileSidebar
//         open={mobileOpen}
//         onClose={() => setMobileOpen(false)}
//       />

//       {/* ===================================================
//           MAIN AREA
//       =================================================== */}

//       <div className="min-h-screen lg:ml-72">
//         {/* Header */}
//         <DashboardHeader
//           onMenuClick={() =>
//             setMobileOpen(true)
//           }
//         />

//         {/* Page content */}
//         <main className="min-h-[calc(100vh-72px)]">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

import { useEffect, useRef, useState } from "react";

import {
  Bell,
  BookOpen,
  ChevronDown,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  UserRound,
  Users,
  X,
} from "lucide-react";

import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import {
  useAppDispatch,
  useAppSelector,
} from "@/app/store/hooks";

import { clearAuth } from "@/app/store/slices/auth/auth.slice";
import { useLogoutMutation } from "@/features/auth/api/auth.api";

/* =========================================================
   NAVIGATION
========================================================= */

const commonNavigation = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Applications",
    to: "/applications",
    icon: ClipboardList,
  },
  {
    label: "Profile",
    to: "/profile",
    icon: UserRound,
  },
];

const administrationNavigation = [
  {
    label: "Programs",
    to: "/admin/programs",
    icon: BookOpen,
  },
  {
    label: "Courses",
    to: "/admin/courses",
    icon: FileText,
  },
  {
    label: "Users",
    to: "/admin/users",
    icon: Users,
  },
  {
    label: "Settings",
    to: "/admin/settings",
    icon: Settings,
  },
];

/* =========================================================
   HELPERS
========================================================= */

function getInitials(
  firstName?: string,
  lastName?: string
) {
  return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`
    .toUpperCase();
}

/* =========================================================
   USER AVATAR
========================================================= */

function UserAvatar({
  url,
  initials,
  size = "md",
}: {
  url?: string;
  initials: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass =
    size === "sm"
      ? "h-9 w-9 text-xs"
      : size === "lg"
        ? "h-11 w-11 text-sm"
        : "h-10 w-10 text-xs";

  if (url) {
    return (
      <img
        src={url}
        alt="Profile"
        className={`${sizeClass} shrink-0 rounded-full object-cover`}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} flex shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300`}
    >
      {initials || "U"}
    </div>
  );
}

/* =========================================================
   NAVIGATION LINK
========================================================= */

function NavigationLink({
  to,
  label,
  icon: Icon,
}: {
  to: string;
  label: string;
  icon: React.ElementType;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "flex items-center gap-3 rounded-xl px-3 py-2.5",
          "text-sm font-medium transition-colors",
          isActive
            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
            : "text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-900 dark:hover:text-white",
        ].join(" ")
      }
    >
      <Icon className="h-[18px] w-[18px] shrink-0" />
      <span>{label}</span>
    </NavLink>
  );
}

/* =========================================================
   SIDEBAR CONTENT
========================================================= */

function SidebarContent({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector(
    (state) => state.auth.user
  );

  const [logout] = useLogoutMutation();

  const isAdmin =
    user?.role === "admin" ||
    user?.role === "superadmin";

  const fullName =
    `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();

  const roleLabel =
    user?.role === "superadmin"
      ? "Super Administrator"
      : user?.role === "admin"
        ? "Administrator"
        : "Admission Counselor";

  const initials = getInitials(
    user?.firstName,
    user?.lastName
  );

  async function handleLogout() {
    try {
      await logout().unwrap();
    } catch {
      // Clear local auth even if API logout fails.
    } finally {
      dispatch(clearAuth());
      onNavigate?.();

      navigate("/login", {
        replace: true,
      });
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* =====================================================
          BRAND
      ===================================================== */}

      <div className="flex h-[72px] shrink-0 items-center border-b border-stone-200 px-5 dark:border-stone-800">
        <Link
          to="/dashboard"
          onClick={onNavigate}
          className="flex items-center gap-3"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-xs font-bold text-white">
            CA
          </div>

          <div>
            <p className="text-sm font-bold leading-tight text-stone-900 dark:text-stone-100">
              College Admission
            </p>

            <p className="text-[10px] leading-tight text-stone-500">
              Management System
            </p>
          </div>
        </Link>
      </div>

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <div className="flex-1 overflow-y-auto px-3 py-5">
        {/* Common navigation */}

        <nav className="space-y-1">
          {commonNavigation.map((item) => (
            <NavigationLink
              key={item.to}
              {...item}
            />
          ))}
        </nav>

        {/* Admin navigation */}

        {isAdmin && (
          <div className="mt-8">
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400">
              Administration
            </p>

            <nav className="space-y-1">
              {administrationNavigation.map(
                (item) => (
                  <NavigationLink
                    key={item.to}
                    {...item}
                  />
                )
              )}
            </nav>
          </div>
        )}
      </div>

      {/* =====================================================
          BOTTOM ACCOUNT
      ===================================================== */}

      <div className="shrink-0 border-t border-stone-200 p-3 dark:border-stone-800">
        {/* Profile */}

        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition hover:bg-stone-100 dark:hover:bg-stone-900"
        >
          <UserAvatar
            url={user?.avatar?.url}
            initials={initials}
            size="md"
          />

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-stone-900 dark:text-stone-100">
              {fullName || "User"}
            </p>

            <p className="text-xs text-stone-500">
              {roleLabel}
            </p>
          </div>
        </button>

        {/* Logout */}

        <button
          type="button"
          onClick={handleLogout}
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-900 dark:hover:text-white"
        >
          <LogOut className="h-[18px] w-[18px]" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   DESKTOP SIDEBAR
========================================================= */

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r border-stone-200 bg-white lg:flex dark:border-stone-800 dark:bg-stone-950">
      <SidebarContent />
    </aside>
  );
}

/* =========================================================
   MOBILE SIDEBAR
========================================================= */

function MobileSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Overlay */}

      <button
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
        className="absolute inset-0 bg-black/30"
      />

      {/* Drawer */}

      <aside className="absolute inset-y-0 left-0 flex w-72 flex-col bg-white shadow-xl dark:bg-stone-950">
        {/* Close button */}

        <div className="absolute right-3 top-4 z-10">
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-900"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <SidebarContent
          onNavigate={onClose}
        />
      </aside>
    </div>
  );
}

/* =========================================================
   DASHBOARD HEADER
========================================================= */

function DashboardHeader({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector(
    (state) => state.auth.user
  );

  const [logout] = useLogoutMutation();

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [notificationOpen, setNotificationOpen] =
    useState(false);

  /* =======================================================
     THEME
  ======================================================= */

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme =
      localStorage.getItem("dashboard-theme");

    if (savedTheme === "dark") {
      return true;
    }

    if (savedTheme === "light") {
      return false;
    }

    return window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
  });

  const profileRef =
    useRef<HTMLDivElement>(null);

  const notificationRef =
    useRef<HTMLDivElement>(null);

  const isAdmin =
    user?.role === "admin" ||
    user?.role === "superadmin";

  const fullName =
    `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();

  const roleLabel =
    user?.role === "superadmin"
      ? "Super Administrator"
      : user?.role === "admin"
        ? "Administrator"
        : "Admission Counselor";

  const initials = getInitials(
    user?.firstName,
    user?.lastName
  );

  /* =======================================================
     THEME EFFECT
  ======================================================= */

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      darkMode
    );

    localStorage.setItem(
      "dashboard-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  /* =======================================================
     CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
  ======================================================= */

  useEffect(() => {
    function handleOutsideClick(
      event: MouseEvent
    ) {
      const target = event.target as Node;

      if (
        profileRef.current &&
        !profileRef.current.contains(target)
      ) {
        setProfileOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(target)
      ) {
        setNotificationOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /* =======================================================
     LOGOUT
  ======================================================= */

  async function handleLogout() {
    try {
      await logout().unwrap();
    } catch {
      // Clear local state regardless of API result.
    } finally {
      dispatch(clearAuth());

      setProfileOpen(false);
      setNotificationOpen(false);

      navigate("/login", {
        replace: true,
      });
    }
  }

  return (
    <header className="sticky top-0 z-30 h-[72px] border-b border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
      <div className="flex h-full items-center px-4 sm:px-6 lg:px-8">
        {/* =================================================
            MOBILE MENU
        ================================================= */}

        <button
          type="button"
          onClick={onMenuClick}
          className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg text-stone-600 hover:bg-stone-100 lg:hidden dark:text-stone-300 dark:hover:bg-stone-900"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* =================================================
            RIGHT SIDE CONTROLS
        ================================================= */}

        <div className="ml-auto flex items-center gap-2">
          {/* =================================================
              THEME SWITCHER
          ================================================= */}

          <button
            type="button"
            onClick={() =>
              setDarkMode(
                (current) => !current
              )
            }
            className="flex h-10 w-10 items-center justify-center rounded-lg text-stone-500 transition hover:bg-stone-100 hover:text-stone-800 dark:text-stone-300 dark:hover:bg-stone-900"
            aria-label={
              darkMode
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
            title={
              darkMode
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
          >
            {darkMode ? (
              <Sun className="h-[19px] w-[19px]" />
            ) : (
              <Moon className="h-[19px] w-[19px]" />
            )}
          </button>

          {/* =================================================
              NOTIFICATIONS
          ================================================= */}

          <div
            ref={notificationRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() => {
                setNotificationOpen(
                  (current) => !current
                );

                setProfileOpen(false);
              }}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-stone-500 transition hover:bg-stone-100 hover:text-stone-800 dark:text-stone-300 dark:hover:bg-stone-900"
              aria-label="Notifications"
              aria-expanded={
                notificationOpen
              }
            >
              <Bell className="h-[19px] w-[19px]" />

              {/* Notification indicator */}

              <span className="absolute right-[9px] top-[8px] h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-stone-950" />
            </button>

            {notificationOpen && (
              <div className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xl dark:border-stone-800 dark:bg-stone-950">
                <div className="flex items-center justify-between border-b border-stone-200 px-4 py-3 dark:border-stone-800">
                  <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                    Notifications
                  </p>

                  <span className="text-xs text-stone-400">
                    0 new
                  </span>
                </div>

                <div className="p-4">
                  <div className="rounded-lg bg-stone-50 p-4 dark:bg-stone-900">
                    <p className="text-sm font-medium text-stone-800 dark:text-stone-100">
                      No new notifications
                    </p>

                    <p className="mt-1 text-xs leading-5 text-stone-500">
                      You are all caught up.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* =================================================
              DIVIDER
          ================================================= */}

          <div className="mx-1 hidden h-9 w-px bg-stone-200 sm:block dark:bg-stone-800" />

          {/* =================================================
              PROFILE
          ================================================= */}

          <div
            ref={profileRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() => {
                setProfileOpen(
                  (current) => !current
                );

                setNotificationOpen(false);
              }}
              className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-stone-50 dark:hover:bg-stone-900"
              aria-haspopup="menu"
              aria-expanded={profileOpen}
            >
              {/* Name */}

              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-stone-800 dark:text-stone-100">
                  {fullName || "User"}
                </p>

                <p className="text-xs text-stone-400">
                  {roleLabel}
                </p>
              </div>

              {/* Avatar */}

              <UserAvatar
                url={user?.avatar?.url}
                initials={initials}
                size="sm"
              />

              {/* Arrow */}

              <ChevronDown
                className={`hidden h-4 w-4 text-stone-400 transition sm:block ${
                  profileOpen
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            {/* =================================================
                PROFILE DROPDOWN
            ================================================= */}

            {profileOpen && (
              <div
                className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xl dark:border-stone-800 dark:bg-stone-950"
                role="menu"
              >
                {/* User information */}

                <div className="border-b border-stone-200 px-4 py-4 dark:border-stone-800">
                  <div className="flex items-center gap-3">
                    <UserAvatar
                      url={user?.avatar?.url}
                      initials={initials}
                      size="lg"
                    />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-stone-900 dark:text-stone-100">
                        {fullName || "User"}
                      </p>

                      <p className="truncate text-xs text-stone-500">
                        {user?.email}
                      </p>

                      <p className="mt-0.5 text-xs text-stone-400">
                        {roleLabel}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu items */}

                <div className="p-2">
                  {/* My Profile */}

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/profile");
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-stone-700 transition hover:bg-stone-100 dark:text-stone-200 dark:hover:bg-stone-900"
                    role="menuitem"
                  >
                    <UserRound className="h-4 w-4 text-stone-400" />

                    <span>My Profile</span>
                  </button>

                  {/* Settings - Admin only */}

                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);

                        navigate(
                          "/admin/settings"
                        );
                      }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-stone-700 transition hover:bg-stone-100 dark:text-stone-200 dark:hover:bg-stone-900"
                      role="menuitem"
                    >
                      <Settings className="h-4 w-4 text-stone-400" />

                      <span>Settings</span>
                    </button>
                  )}

                  {/* Divider */}

                  <div className="my-1 border-t border-stone-200 dark:border-stone-800" />

                  {/* Logout */}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                    role="menuitem"
                  >
                    <LogOut className="h-4 w-4" />

                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   DASHBOARD LAYOUT
========================================================= */

export function DashboardLayout() {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* ===================================================
          DESKTOP SIDEBAR
      =================================================== */}

      <Sidebar />

      {/* ===================================================
          MOBILE SIDEBAR
      =================================================== */}

      <MobileSidebar
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* ===================================================
          MAIN AREA
      =================================================== */}

      <div className="min-h-screen lg:ml-72">
        {/* Header */}

        <DashboardHeader
          onMenuClick={() =>
            setMobileOpen(true)
          }
        />

        {/* Page content */}

        <main className="min-h-[calc(100vh-72px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}