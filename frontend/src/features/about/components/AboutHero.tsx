
import { ArrowRight, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

export function AboutHero() {
  return (
    <section className="border-b border-stone-200 bg-[#faf9f6] transition-colors duration-300 dark:border-stone-800 dark:bg-stone-950">
      <div className="mx-auto grid min-h-130 max-w-7xl items-center gap-12 px-5 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        {/* Content */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8d6b2f] dark:text-[#d6b56a]">
            About Us
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-[#173f35] sm:text-5xl dark:text-stone-100">
            Education that helps students move forward.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-stone-600 sm:text-lg dark:text-stone-300">
            We provide an academic environment where students can build
            strong foundations, develop practical knowledge, and prepare
            themselves for the opportunities ahead.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/programs"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#173f35] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#12342d] dark:bg-[#c69a45] dark:text-stone-950 dark:hover:bg-[#d6b56a]"
            >
              Explore Programs
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/admission"
              className="inline-flex items-center justify-center rounded-lg border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-700 transition-colors hover:border-[#173f35] hover:text-[#173f35] dark:border-stone-700 dark:text-stone-200 dark:hover:border-[#c69a45] dark:hover:text-[#d6b56a]"
            >
              Apply for Admission
            </Link>
          </div>
        </div>

        {/* Visual */}
        <div>
          <div className="relative overflow-hidden rounded-2xl bg-[#173f35] p-8 dark:bg-[#102e27] sm:p-10">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/10" />

            <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full border border-[#c69a45]/20" />

            <div className="relative flex min-h-[330px] flex-col justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 text-[#d6b56a]">
                <Building2 size={28} />
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d6b56a]">
                  Our Institution
                </p>

                <h2 className="mt-4 text-3xl font-semibold leading-tight text-white">
                  Building knowledge, confidence, and opportunity.
                </h2>

                <p className="mt-5 text-sm leading-6 text-stone-300">
                  A student-focused academic environment built around
                  meaningful learning and clear pathways toward the future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
