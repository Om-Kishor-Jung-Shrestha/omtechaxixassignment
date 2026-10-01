import {
  BookOpen,
  CheckCircle2,
  Users,
  BriefcaseBusiness,
} from "lucide-react";

const reasons = [
  {
    title: "Focused Programs",
    description:
      "Choose from structured academic programs built around clear learning outcomes.",
    icon: BookOpen,
  },
  {
    title: "Student-Centered",
    description:
      "A learning environment that keeps student growth and academic progress at the center.",
    icon: Users,
  },
  {
    title: "Practical Learning",
    description:
      "Build useful knowledge and skills that connect academic learning with real opportunities.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Clear Admission",
    description:
      "A straightforward admission process that helps you understand each step with confidence.",
    icon: CheckCircle2,
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-[#faf9f6] transition-colors duration-300 dark:bg-stone-950">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8d6b2f] dark:text-[#d6b56a]">
            Why Choose Us
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#173f35] sm:text-4xl dark:text-stone-100">
            A learning experience designed for your next step.
          </h2>

          <p className="mt-5 text-base leading-7 text-stone-600 dark:text-stone-300">
            From choosing a program to completing your admission, we aim to
            keep the academic journey clear, practical, and student-focused.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <div
                key={reason.title}
                className="rounded-2xl border border-stone-200 bg-white p-6 transition-colors duration-300 hover:border-stone-300 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-stone-700"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#173f35] text-white dark:bg-[#c69a45] dark:text-stone-950">
                  <Icon size={21} />
                </div>

                <h3 className="mt-6 text-lg font-semibold text-[#173f35] dark:text-stone-100">
                  {reason.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-400">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}