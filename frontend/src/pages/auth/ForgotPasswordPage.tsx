import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";

import { useForgotPasswordMutation } from "@/features/auth/api/auth.api";

export function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [forgotPassword, { isLoading }] =
    useForgotPasswordMutation();

  async function handleSubmit(
    event: React.SubmitEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setError("Email address is required.");
      return;
    }

    try {
      await forgotPassword({
        email: normalizedEmail,
      }).unwrap();

      setSuccess(
        "If the email exists, a password reset OTP has been sent."
      );

      navigate("/reset-password", {
        state: {
          email: normalizedEmail,
        },
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to process your request. Please try again.";

      setError(message);
    }
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      <div className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-6">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8 dark:border-stone-800 dark:bg-stone-900">
            {/* Header */}

            <div className="mb-8">
              <Link
                to="/login"
                className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to login
              </Link>

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400">
                <Mail className="h-6 w-6" />
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-[#173f35] dark:text-stone-100">
                Forgot your password?
              </h1>

              <p className="mt-2 text-sm leading-6 text-stone-500 dark:text-stone-400">
                Enter your email address and we will send you
                a password reset OTP.
              </p>
            </div>

            {/* Error */}

            {error && (
              <div
                role="alert"
                className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400"
              >
                {error}
              </div>
            )}

            {/* Success */}

            {success && (
              <div
                role="status"
                className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400"
              >
                {success}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              noValidate
            >
              <div className="space-y-2">
                <label
                  htmlFor="forgot-email"
                  className="text-sm font-medium text-stone-800 dark:text-stone-200"
                >
                  Email address
                </label>

                <input
                  id="forgot-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="you@example.com"
                  disabled={isLoading}
                  className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10 disabled:cursor-not-allowed disabled:bg-stone-100 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:disabled:bg-stone-900"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center rounded-xl bg-emerald-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading
                  ? "Sending OTP..."
                  : "Send reset OTP"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-stone-500 dark:text-stone-400">
              Remember your password?{" "}
              <Link
                to="/login"
                className="font-semibold text-emerald-800 hover:text-emerald-900 dark:text-emerald-400"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}