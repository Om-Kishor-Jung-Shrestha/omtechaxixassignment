
import {
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  Layers3,
} from "lucide-react";

import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import { useAppDispatch } from "@/app/store/hooks";

import { clearAuth } from "@/app/store/slices/auth/auth.slice";

import {
  useLogoutMutation,
} from "@/features/auth/api/auth.api";

const navigation = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Applications",
    path: "/admin/applications",
    icon: FileText,
  },
  {
    label: "Programs",
    path: "/admin/programs",
    icon: Layers3,
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

export function AdminLayout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [logout, { isLoading }] =
    useLogoutMutation();

  async function handleLogout() {
    try {
      await logout().unwrap();
    } catch {
      // Even if the backend logout request fails,
      // clear the local authentication state.
    } finally {
     dispatch(clearAuth());

      navigate("/login", {
        replace: true,
      });
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 bg-emerald-950 lg:flex lg:flex-col">
        {/* Logo */}
        <div className="flex h-20 items-center border-b border-emerald-900 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 text-sm font-bold text-emerald-950">
            CA
          </div>

          <div className="ml-3">
            <p className="text-sm font-semibold text-white">
              College Admission
            </p>

            <p className="text-xs text-emerald-300">
              Management System
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                    isActive
                      ? "bg-emerald-800 text-white"
                      : "text-emerald-200 hover:bg-emerald-900 hover:text-white",
                  ].join(" ")
                }
              >
                <Icon size={19} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-emerald-900 p-4">
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoading}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-emerald-200 transition hover:bg-emerald-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogOut size={19} />

            {isLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-stone-200 bg-stone-50/95 backdrop-blur">
          <div className="flex h-20 items-center justify-between px-6 lg:px-8">
            <div>
              <p className="text-sm font-medium text-stone-900">
                College Administration
              </p>

              <p className="text-xs text-stone-500">
                Management dashboard
              </p>
            </div>

            {/* Mobile Logout */}
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoading}
              className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60 lg:hidden"
            >
              <LogOut size={17} />

              {isLoading
                ? "Logging out..."
                : "Logout"}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
