import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const programs = [
  {
    mnemonic: "BCA",
    name: "Bachelor of Computer Applications",
    duration: "4 Years",
  },
  {
    mnemonic: "BBA",
    name: "Bachelor of Business Administration",
    duration: "4 Years",
  },
  {
    mnemonic: "BSC",
    name: "Bachelor of Science",
    duration: "4 Years",
  },
];

export function FeaturedPrograms() {
  return (
    <section className="bg-white transition-colors duration-300 dark:bg-stone-900">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8d6b2f] dark:text-[#d6b56a]">
              Featured Programs
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#173f35] sm:text-4xl dark:text-stone-100">
              Find a program that fits your goals.
            </h2>

            <p className="mt-5 text-base leading-7 text-stone-600 dark:text-stone-300">
              Explore our academic offerings and discover the path that
              matches your interests and ambitions.
            </p>
          </div>

          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#173f35] transition-colors hover:text-[#8d6b2f] dark:text-[#d6b56a] dark:hover:text-white"
          >
            View all programs
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {programs.map((program) => (
            <Link
              key={program.mnemonic}
              to="/programs"
              className="group rounded-2xl border border-stone-200 bg-[#faf9f6] p-7 transition-colors duration-300 hover:border-[#c69a45]/60 dark:border-stone-800 dark:bg-stone-950 dark:hover:border-[#c69a45]/60"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#173f35] text-sm font-bold text-white dark:bg-[#c69a45] dark:text-stone-950">
                  {program.mnemonic}
                </div>

                <ArrowRight
                  size={18}
                  className="text-stone-400 transition-transform group-hover:translate-x-1 group-hover:text-[#8d6b2f] dark:text-stone-500 dark:group-hover:text-[#d6b56a]"
                />
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-[#173f35] dark:text-stone-100">
                  {program.name}
                </h3>

                <div className="mt-4 flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400">
                  <BookOpen size={16} />
                  {program.duration}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
