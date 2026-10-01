import { ProgramsContent } from "@/features/programs/components/ProgramsContent";

export function ProgramsPage() {
  return (
    <main className="bg-[#faf9f6] text-stone-900 transition-colors duration-300 dark:bg-stone-950 dark:text-stone-100">
      <section className="border-b border-stone-200 dark:border-stone-800">
        <div className="mx-auto max-w-7xl px-5 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8d6b2f] dark:text-[#d6b56a]">
            Programs
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#173f35] sm:text-5xl dark:text-stone-100">
            Explore Our Academic Programs
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-stone-600 dark:text-stone-300">
            Discover the academic programs offered by our college and find a
            pathway that matches your academic and career goals.
          </p>
        </div>
      </section>

      <ProgramsContent />
    </main>
  );
}