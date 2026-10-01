
import { BookOpenCheck, Target } from "lucide-react";

export function AboutStory() {
  return (
    <section className="bg-white transition-colors duration-300 dark:bg-stone-900">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8d6b2f] dark:text-[#d6b56a]">
              Our Story
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#173f35] sm:text-4xl dark:text-stone-100">
              Creating a place where learning has purpose.
            </h2>

            <div className="mt-6 space-y-5 text-base leading-7 text-stone-600 dark:text-stone-300">
              <p>
                Education is more than completing a course. It is about
                developing the knowledge, discipline, and confidence needed
                to take meaningful steps toward a future career.
              </p>

              <p>
                Our academic approach focuses on creating clear learning
                pathways while giving students opportunities to connect
                what they learn with practical situations.
              </p>

              <p>
                Through structured programs and a student-centered
                environment, we aim to support students throughout their
                academic journey.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-2xl border border-stone-200 bg-[#faf9f6] p-7 dark:border-stone-800 dark:bg-stone-950">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#173f35] text-white dark:bg-[#c69a45] dark:text-stone-950">
                <Target size={21} />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-[#173f35] dark:text-stone-100">
                Our Mission
              </h3>

              <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-400">
                To provide accessible, meaningful, and practical education
                that supports students in developing the knowledge and
                abilities needed for their future.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-[#faf9f6] p-7 dark:border-stone-800 dark:bg-stone-950">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#173f35] text-white dark:bg-[#c69a45] dark:text-stone-950">
                <BookOpenCheck size={21} />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-[#173f35] dark:text-stone-100">
                Our Vision
              </h3>

              <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-400">
                To create an academic environment where students are
                prepared to learn continuously, contribute meaningfully,
                and pursue their aspirations with confidence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



// import { Route, Routes } from "react-router-dom";

// import { PublicLayout } from "@/layouts/PublicLayout/PublicLayout";
// import { HomePage } from "@/pages/public/HomePage";
// import { AboutPage } from "@/pages/public/AboutPage";

// function App() {
//   return (
//     <Routes>
//       <Route element={<PublicLayout />}>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/about" element={<AboutPage />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;
