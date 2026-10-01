import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function HomeCta() {
  return (
    <section className="bg-[#faf9f6] transition-colors duration-300 dark:bg-stone-950">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="overflow-hidden rounded-2xl bg-[#173f35] px-6 py-12 sm:px-10 lg:px-14 lg:py-14 dark:bg-[#102e27]">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d6b56a]">
                Begin Your Journey
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to take the next step?
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-stone-300">
                Explore our programs or start your admission application
                today.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <Link
                to="/admission"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#c69a45] px-6 py-3 text-sm font-semibold text-stone-950 transition-colors hover:bg-[#d6b56a]"
              >
                Apply Now
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/programs"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
              >
                Explore Programs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
