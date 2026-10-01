import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Programs", to: "/programs" },
  { label: "Contact", to: "/contact" },
];

export function PublicFooter() {
  return (
    <footer className="bg-[#173f35] text-stone-300 transition-colors duration-300 dark:bg-stone-950 dark:text-stone-400">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* College */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-sm font-bold text-white">
                CA
              </div>

              <div>
                <p className="text-sm font-bold tracking-wide text-white">
                  College Admission
                </p>

                <p className="text-xs text-stone-400">
                  Management System
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-stone-400">
              A clear and accessible platform for exploring programs and
              managing the college admission journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>

            <nav className="mt-5 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="w-fit text-sm text-stone-400 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>

            <div className="mt-5 space-y-3 text-sm text-stone-400">
              <p>College address</p>
              <p>+977-XXX-XXXXXXX</p>
              <p>info@example.edu.np</p>
              <p>Sunday – Friday · 10:00 AM – 5:00 PM</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col justify-between gap-3 text-xs text-stone-500 sm:flex-row">
            <p>
              © {new Date().getFullYear()} College Admission Management
              System. All rights reserved.
            </p>

            <Link
              to="/login"
              className="transition-colors hover:text-stone-300"
            >
              Administration Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
