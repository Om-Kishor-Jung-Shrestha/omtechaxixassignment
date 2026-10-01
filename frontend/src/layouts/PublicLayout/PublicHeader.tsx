
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";

import { useTheme } from "@/app/providers/use-theme";

const navigationItems = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Programs", to: "/programs" },
  { label: "Contact", to: "/contact" },
];

export function PublicHeader() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="
        sticky top-0 z-50
        border-b border-stone-200
        bg-[#faf9f6]/95
        text-stone-900
        backdrop-blur
        transition-colors duration-300
        dark:border-stone-800
        dark:bg-stone-950/95
        dark:text-stone-100
      "
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#173f35] text-sm font-bold text-white">
            CA
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-bold tracking-wide text-[#173f35] dark:text-stone-100">
              College Admission
            </p>

            <p className="text-xs text-stone-500 dark:text-stone-400">
              Management System
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "relative text-sm font-medium transition-colors",
                  isActive
                    ? "text-[#173f35] dark:text-[#d6b56a]"
                    : "text-stone-600 hover:text-[#173f35] dark:text-stone-300 dark:hover:text-white",
                ].join(" ")
              }
            >
              {item.label}

              <span
                className="
                  absolute -bottom-2 left-0 h-0.5 w-full
                  origin-left
                  scale-x-0
                  bg-[#c69a45]
                  transition-transform
                "
              />
            </NavLink>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Theme Toggle */}
          <button
            type="button"
            aria-label={
              theme === "light"
                ? "Switch to dark mode"
                : "Switch to light mode"
            }
            onClick={toggleTheme}
            className="
              flex h-10 w-10 items-center justify-center rounded-lg
              border border-stone-200
              text-stone-600
              transition-colors
              hover:border-stone-300
              hover:text-[#173f35]
              dark:border-stone-700
              dark:bg-stone-900
              dark:text-stone-300
              dark:hover:border-stone-600
              dark:hover:text-[#d6b56a]
            "
          >
            {theme === "dark" ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </button>

          {/* Admission */}
          <Link
            to="/admission"
            className="
              rounded-lg
              bg-[#173f35]
              px-5 py-2.5
              text-sm font-semibold text-white
              transition-colors
              hover:bg-[#12342d]
              dark:bg-[#c69a45]
              dark:text-stone-950
              dark:hover:bg-[#d6b56a]
            "
          >
            Apply for Admission
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={
            mobileMenuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          onClick={() =>
            setMobileMenuOpen((current) => !current)
          }
          className="
            flex h-10 w-10 items-center justify-center rounded-lg
            border border-stone-200
            text-stone-700
            transition-colors
            hover:border-stone-300
            hover:text-[#173f35]
            dark:border-stone-700
            dark:bg-stone-900
            dark:text-stone-200
            dark:hover:border-stone-600
            dark:hover:text-white
            md:hidden
          "
        >
          {mobileMenuOpen ? (
            <X size={20} />
          ) : (
            <Menu size={20} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div
          className="
            border-t border-stone-200
            bg-[#faf9f6]
            transition-colors
            dark:border-stone-800
            dark:bg-stone-950
            md:hidden
          "
        >
          <nav className="mx-auto flex max-w-7xl flex-col px-5 py-4">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  [
                    "border-b py-4 text-sm font-medium transition-colors",
                    "border-stone-200 dark:border-stone-800",
                    isActive
                      ? "text-[#173f35] dark:text-[#d6b56a]"
                      : "text-stone-600 hover:text-[#173f35] dark:text-stone-300 dark:hover:text-white",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}

            <Link
              to="/admission"
              onClick={() => setMobileMenuOpen(false)}
              className="
                mt-4 rounded-lg
                bg-[#173f35]
                px-5 py-3
                text-center
                text-sm font-semibold text-white
                transition-colors
                hover:bg-[#12342d]
                dark:bg-[#c69a45]
                dark:text-stone-950
                dark:hover:bg-[#d6b56a]
              "
            >
              Apply for Admission
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
