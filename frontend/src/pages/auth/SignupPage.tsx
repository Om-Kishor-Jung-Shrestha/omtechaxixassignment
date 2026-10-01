
import { Link } from "react-router-dom";

import { RegisterForm } from "@/features/auth/components/RegisterForm";

export function SignupPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl">
        <section className="hidden flex-1 bg-emerald-950 p-12 text-stone-50 lg:flex lg:flex-col lg:justify-between">
          <Link
            to="/"
            className="inline-flex h-fit items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400 font-bold text-emerald-950">
              CA
            </div>

            <div>
              <p className="font-semibold">
                College Admission
              </p>
              <p className="text-xs text-emerald-200">
                Management System
              </p>
            </div>
          </Link>

          <div className="max-w-lg">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-amber-300">
              Get Started
            </p>

            <h1 className="text-5xl font-semibold leading-tight">
              Begin your admission journey.
            </h1>

            <p className="mt-5 max-w-md text-base leading-7 text-emerald-100">
              Create your account and verify your
              email to access the admission system.
            </p>
          </div>

          <p className="text-xs text-emerald-300">
            Secure account registration
          </p>
        </section>

        <section className="flex w-full items-center justify-center px-6 py-10 lg:w-[560px] lg:px-12">
          <div className="w-full max-w-md">
            <div className="mb-7 lg:hidden">
              <Link
                to="/"
                className="font-semibold text-emerald-900"
              >
                College Admission
              </Link>
            </div>

            <div className="mb-7">
              <p className="mb-2 text-sm font-medium text-emerald-800">
                Create account
              </p>

              <h2 className="text-3xl font-semibold tracking-tight text-stone-900">
                Create your account
              </h2>

              <p className="mt-2 text-sm leading-6 text-stone-500">
                Enter your details. We'll send an OTP
                to verify your email.
              </p>
            </div>

            <RegisterForm />
          </div>
        </section>
      </div>
    </main>
  );
}
