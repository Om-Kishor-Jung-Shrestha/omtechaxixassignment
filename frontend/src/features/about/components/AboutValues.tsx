import {
  Lightbulb,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";

const values = [
  {
    title: "Student Focus",
    description:
      "We keep student learning, progress, and development at the center of the academic experience.",
    icon: Users,
  },
  {
    title: "Practical Learning",
    description:
      "We value learning that connects academic concepts with useful skills and real-world situations.",
    icon: Workflow,
  },
  {
    title: "Continuous Growth",
    description:
      "We encourage students to remain curious, develop their abilities, and keep learning beyond the classroom.",
    icon: Lightbulb,
  },
  {
    title: "Academic Integrity",
    description:
      "We believe responsible learning and academic integrity are essential to meaningful education.",
    icon: ShieldCheck,
  },
];

export function AboutValues() {
  return (
    <section className="bg-[#faf9f6] transition-colors duration-300 dark:bg-stone-950">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8d6b2f] dark:text-[#d6b56a]">
            What We Value
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#173f35] sm:text-4xl dark:text-stone-100">
            Principles that shape the learning experience.
          </h2>

          <p className="mt-5 text-base leading-7 text-stone-600 dark:text-stone-300">
            Our approach is guided by a few simple principles that help
            create a purposeful and supportive academic environment.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <div
                key={value.title}
                className="rounded-2xl border border-stone-200 bg-white p-6 transition-colors duration-300 dark:border-stone-800 dark:bg-stone-900"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#173f35] text-white dark:bg-[#c69a45] dark:text-stone-950">
                  <Icon size={21} />
                </div>

                <h3 className="mt-6 text-lg font-semibold text-[#173f35] dark:text-stone-100">
                  {value.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-400">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}