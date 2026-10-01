import { Link } from "react-router-dom";

import { VerifyOtpForm } from "@/features/auth/components/VerifyOtpForm";

export function VerifyOtpPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl">
        <section className="hidden flex-1 flex-col justify-between bg-emerald-950 p-12 text-stone-50 lg:flex">
          <Link
            to="/"
            className="inline-flex items-center gap-3"
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
              Email Verification
            </p>

            <h1 className="text-5xl font-semibold leading-tight">
              One more step.
            </h1>

            <p className="mt-5 max-w-md text-base leading-7 text-emerald-100">
              Verify your email address to complete
              your account registration and continue
              to the admission system.
            </p>
          </div>

          <p className="text-xs text-emerald-300">
            Secure account verification
          </p>
        </section>

        <section className="flex w-full items-center justify-center px-6 py-12 lg:w-[520px] lg:px-12">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <Link
                to="/"
                className="font-semibold text-emerald-900"
              >
                College Admission
              </Link>
            </div>

            <div className="mb-8">
              <p className="mb-2 text-sm font-medium text-emerald-800">
                Verify email
              </p>

              <h2 className="text-3xl font-semibold tracking-tight text-stone-900">
                Enter your OTP
              </h2>

              <p className="mt-2 text-sm leading-6 text-stone-500">
                We've sent a verification code to your
                email address.
              </p>
            </div>

            <VerifyOtpForm />
          </div>
        </section>
      </div>
    </main>
  );
}