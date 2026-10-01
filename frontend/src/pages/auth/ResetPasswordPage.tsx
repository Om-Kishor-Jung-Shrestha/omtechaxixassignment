import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ArrowLeft, LockKeyhole } from "lucide-react";

import { useResetPasswordMutation } from "@/features/auth/api/auth.api";

interface ResetPasswordLocationState {
  email?: string;
}

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const state =
    location.state as ResetPasswordLocationState | null;

  const [email, setEmail] = useState(
    state?.email ?? ""
  );
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [resetPassword, { isLoading }] =
    useResetPasswordMutation();

  async function handleSubmit(
    event: React.SubmitEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const normalizedEmail = email.trim();
    const normalizedOtp = otp.trim();

    if (!normalizedEmail) {
      setError("Email address is required.");
      return;
    }

    if (!normalizedOtp) {
      setError("OTP is required.");
      return;
    }

    if (!newPassword) {
      setError("New password is required.");
      return;
    }

    if (newPassword.length < 8) {
      setError(
        "Password must be at least 8 characters long."
      );
      return;
    }

    if (!confirmPassword) {
      setError("Please confirm your new password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await resetPassword({
        email: normalizedEmail,
        otp: normalizedOtp,
        newPassword,
      }).unwrap();

      setSuccess(
        "Your password has been reset successfully."
      );

      setTimeout(() => {
        navigate("/login", {
          replace: true,
          state: {
            message:
              "Password reset successfully. You can now sign in with your new password.",
          },
        });
      }, 800);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to reset your password. Please try again.";

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
                <LockKeyhole className="h-6 w-6" />
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-[#173f35] dark:text-stone-100">
                Reset your password
              </h1>

              <p className="mt-2 text-sm leading-6 text-stone-500 dark:text-stone-400">
                Enter the OTP sent to your email and choose
                a new password.
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
              {/* Email */}

              <div className="space-y-2">
                <label
                  htmlFor="reset-email"
                  className="text-sm font-medium text-stone-800 dark:text-stone-200"
                >
                  Email address
                </label>

                <input
                  id="reset-email"
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

              {/* OTP */}

              <div className="space-y-2">
                <label
                  htmlFor="reset-otp"
                  className="text-sm font-medium text-stone-800 dark:text-stone-200"
                >
                  Verification code
                </label>

                <input
                  id="reset-otp"
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={otp}
                  onChange={(event) =>
                    setOtp(event.target.value)
                  }
                  placeholder="Enter OTP"
                  disabled={isLoading}
                  className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-center text-lg font-semibold tracking-[0.3em] text-stone-900 outline-none transition placeholder:text-stone-400 placeholder:tracking-normal focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10 disabled:cursor-not-allowed disabled:bg-stone-100 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:disabled:bg-stone-900"
                />
              </div>

              {/* New password */}

              <div className="space-y-2">
                <label
                  htmlFor="new-password"
                  className="text-sm font-medium text-stone-800 dark:text-stone-200"
                >
                  New password
                </label>

                <input
                  id="new-password"
                  name="newPassword"
                  type="password"
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(event) =>
                    setNewPassword(event.target.value)
                  }
                  placeholder="Enter your new password"
                  disabled={isLoading}
                  className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10 disabled:cursor-not-allowed disabled:bg-stone-100 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:disabled:bg-stone-900"
                />
              </div>

              {/* Confirm password */}

              <div className="space-y-2">
                <label
                  htmlFor="confirm-password"
                  className="text-sm font-medium text-stone-800 dark:text-stone-200"
                >
                  Confirm new password
                </label>

                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(
                      event.target.value
                    )
                  }
                  placeholder="Confirm your new password"
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
                  ? "Resetting password..."
                  : "Reset password"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-stone-500 dark:text-stone-400">
              Didn't request a reset?{" "}
              <Link
                to="/login"
                className="font-semibold text-emerald-800 hover:text-emerald-900 dark:text-emerald-400"
              >
                Return to login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}