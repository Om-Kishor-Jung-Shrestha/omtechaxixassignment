
import { ArrowRight, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

export function AboutPreview() {
  return (
    <section className="bg-white transition-colors duration-300 dark:bg-stone-900">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8d6b2f] dark:text-[#d6b56a]">
            About the College
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#173f35] sm:text-4xl dark:text-stone-100">
            Education built around opportunity.
          </h2>

          <p className="mt-6 max-w-xl text-base leading-7 text-stone-600 dark:text-stone-300">
            Our academic environment is designed to help students develop
            strong foundations, practical knowledge, and the confidence to
            move toward their future goals.
          </p>

          <Link
            to="/about"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#173f35] transition-colors hover:text-[#8d6b2f] dark:text-[#d6b56a] dark:hover:text-white"
          >
            Learn more about us
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="relative">
          <div className="rounded-2xl border border-stone-200 bg-[#faf9f6] p-8 dark:border-stone-800 dark:bg-stone-950 sm:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#173f35] text-white dark:bg-[#c69a45] dark:text-stone-950">
              <GraduationCap size={28} />
            </div>

            <h3 className="mt-7 text-2xl font-semibold text-[#173f35] dark:text-stone-100">
              A foundation for what comes next.
            </h3>

            <p className="mt-4 text-sm leading-6 text-stone-600 dark:text-stone-400">
              Explore academic programs designed with clear learning
              pathways and practical opportunities for students.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
                <p className="text-lg font-bold text-[#173f35] dark:text-stone-100">
                  Practical
                </p>
                <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                  Learning approach
                </p>
              </div>

              <div className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
                <p className="text-lg font-bold text-[#173f35] dark:text-stone-100">
                  Focused
                </p>
                <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                  Academic programs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
