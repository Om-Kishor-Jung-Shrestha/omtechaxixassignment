
import {
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export function ContactPage() {
  return (
    <main className="bg-[#faf9f6] text-stone-900 transition-colors duration-300 dark:bg-stone-950 dark:text-stone-100">
      {/* Hero */}
      <section className="border-b border-stone-200 dark:border-stone-800">
        <div className="mx-auto max-w-7xl px-5 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8d6b2f] dark:text-[#d6b56a]">
            Contact Us
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#173f35] sm:text-5xl dark:text-stone-100">
            We would love to hear from you.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-stone-600 dark:text-stone-300">
            Have a question about our programs, admission process, or
            college? Reach out to us through the information below.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section>
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Address */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#173f35] text-white dark:bg-[#c69a45] dark:text-stone-950">
                <MapPin size={21} />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-[#173f35] dark:text-stone-100">
                Address
              </h2>

              <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-400">
                College Road,
                <br />
                Kathmandu, Nepal
              </p>
            </div>

            {/* Phone */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#173f35] text-white dark:bg-[#c69a45] dark:text-stone-950">
                <Phone size={21} />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-[#173f35] dark:text-stone-100">
                Phone
              </h2>

              <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-400">
                +977 01 0000000
                <br />
                +977 9800000000
              </p>
            </div>

            {/* Email */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#173f35] text-white dark:bg-[#c69a45] dark:text-stone-950">
                <Mail size={21} />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-[#173f35] dark:text-stone-100">
                Email
              </h2>

              <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-400">
                info@examplecollege.edu.np
                <br />
                admissions@examplecollege.edu.np
              </p>
            </div>

            {/* Office Hours */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#173f35] text-white dark:bg-[#c69a45] dark:text-stone-950">
                <Clock3 size={21} />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-[#173f35] dark:text-stone-100">
                Office Hours
              </h2>

              <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-400">
                Sunday – Friday
                <br />
                10:00 AM – 5:00 PM
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-2xl border border-stone-200 bg-white p-7 dark:border-stone-800 dark:bg-stone-900">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8d6b2f] dark:text-[#d6b56a]">
                Visit Us
              </p>

              <h2 className="mt-3 text-2xl font-bold text-[#173f35] dark:text-stone-100">
                Find our campus
              </h2>

              <p className="mt-4 text-sm leading-7 text-stone-600 dark:text-stone-400">
                Our campus is located in Kathmandu, providing students
                with an accessible academic environment close to the
                city's educational and professional opportunities.
              </p>

              <div className="mt-6 flex items-start gap-3">
                <MapPin
                  size={19}
                  className="mt-0.5 flex-shrink-0 text-[#8d6b2f] dark:text-[#d6b56a]"
                />

                <p className="text-sm leading-6 text-stone-600 dark:text-stone-400">
                  College Road, Kathmandu, Nepal
                </p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-stone-200 bg-stone-100 dark:border-stone-800 dark:bg-stone-900">
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#173f35] text-white dark:bg-[#c69a45] dark:text-stone-950">
                  <MapPin size={25} />
                </div>

                <h2 className="mt-5 text-lg font-semibold text-[#173f35] dark:text-stone-100">
                  Campus Location
                </h2>

                <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                  Map integration will be added here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
