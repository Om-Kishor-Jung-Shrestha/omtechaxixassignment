
import { ArrowRight, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

export function HomeHero() {
  return (
    <section className="border-b border-stone-200 bg-[#faf9f6] transition-colors duration-300 dark:border-stone-800 dark:bg-stone-950">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-12 px-5 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        {/* Left Content */}
        <div className="max-w-2xl">
          {/* Admission Status */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c69a45]/40 bg-[#c69a45]/10 px-4 py-2 text-sm font-medium text-[#8d6b2f] dark:border-[#c69a45]/50 dark:bg-[#c69a45]/10 dark:text-[#d6b56a]">
            <span className="mr-1 h-2 w-2 rounded-full bg-[#c69a45]" aria-hidden="true" />
            <span>Admissions Open</span>
          </div>

          {/* Heading */}
          <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-[#173f35] sm:text-5xl lg:text-6xl dark:text-stone-100">
            Build your future through the right education.
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-7 text-stone-600 sm:text-lg dark:text-stone-300">
            Discover quality programs, practical learning opportunities,
            and a clear path toward your academic and professional goals.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/admission"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#173f35] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#12342d] dark:bg-[#c69a45] dark:text-stone-950 dark:hover:bg-[#d6b56a]"
            >
              Start Your Application
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/programs"
              className="inline-flex items-center justify-center rounded-lg border border-stone-300 bg-transparent px-6 py-3 text-sm font-semibold text-stone-700 transition-colors hover:border-[#173f35] hover:text-[#173f35] dark:border-stone-700 dark:text-stone-200 dark:hover:border-[#c69a45] dark:hover:text-[#d6b56a]"
            >
              Explore Programs
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 grid max-w-xl grid-cols-3 border-t border-stone-200 pt-8 dark:border-stone-800">
            <div>
              <p className="text-2xl font-bold text-[#173f35] dark:text-stone-100">
                10+
              </p>
              <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                Programs
              </p>
            </div>

            <div className="border-l border-stone-200 pl-5 dark:border-stone-800">
              <p className="text-2xl font-bold text-[#173f35] dark:text-stone-100">
                1000+
              </p>
              <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                Students
              </p>
            </div>

            <div className="border-l border-stone-200 pl-5 dark:border-stone-800">
              <p className="text-2xl font-bold text-[#173f35] dark:text-stone-100">
                15+
              </p>
              <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                Years of Excellence
              </p>
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-2xl bg-[#173f35] p-8 shadow-sm dark:bg-[#102e27] sm:p-10">
            {/* Decorative Structure */}
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-white/10" />
            <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full border border-[#c69a45]/20" />

            <div className="relative flex min-h-105 flex-col justify-between">
              {/* Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 text-[#d6b56a]">
                <GraduationCap size={28} />
              </div>

              {/* Main Message */}
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#d6b56a]">
                  Your Journey Starts Here
                </p>

                <h2 className="mt-4 max-w-md text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  Learn with purpose. Grow with confidence.
                </h2>

                <p className="mt-5 max-w-md text-sm leading-6 text-stone-300">
                  Find a program that matches your interests and build the
                  knowledge and skills you need for what comes next.
                </p>
              </div>

              {/* Bottom Indicator */}
              <div className="flex items-center gap-3 border-t border-white/10 pt-6">
                <div className="h-2 w-2 rounded-full bg-[#c69a45]" />

                <span className="text-sm text-stone-300">
                  Explore your opportunities
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
