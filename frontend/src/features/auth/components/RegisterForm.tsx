
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useRegisterMutation } from "@/features/auth/api/auth.api";
import { GoogleAuthButton } from "./GoogleAuthButton";

export function RegisterForm() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const [register, { isLoading }] =
    useRegisterMutation();

  function handleSubmit(
    event: React.SubmitEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    if (!firstName.trim()) {
      setError("First name is required.");
      return;
    }

    if (!lastName.trim()) {
      setError("Last name is required.");
      return;
    }

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    void submitRegistration();
  }

  async function submitRegistration() {
    try {
      const normalizedEmail = email.trim();

      await register({
        firstName: firstName.trim(),
        middleName:
          middleName.trim() || undefined,
        lastName: lastName.trim(),
        email: normalizedEmail,
        password,
      }).unwrap();

      navigate("/verify-otp", {
        replace: true,
        state: {
          email: normalizedEmail,
        },
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to create your account.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      noValidate
    >
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {/* Name */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="firstName"
            className="text-sm font-medium text-stone-800"
          >
            First name
          </label>

          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(event) =>
              setFirstName(event.target.value)
            }
            disabled={isLoading}
            autoComplete="given-name"
            placeholder="First name"
            className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="lastName"
            className="text-sm font-medium text-stone-800"
          >
            Last name
          </label>

          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(event) =>
              setLastName(event.target.value)
            }
            disabled={isLoading}
            autoComplete="family-name"
            placeholder="Last name"
            className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"
          />
        </div>
      </div>

      {/* Middle name */}
      <div className="space-y-2">
        <label
          htmlFor="middleName"
          className="text-sm font-medium text-stone-800"
        >
          Middle name{" "}
          <span className="text-xs text-stone-400">(optional)</span>
        </label>

        <input
          id="middleName"
          type="text"
          value={middleName}
          onChange={(event) =>
            setMiddleName(event.target.value)
          }
          disabled={isLoading}
          autoComplete="additional-name"
          placeholder="Middle name"
          className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="register-email"
          className="text-sm font-medium text-stone-800"
        >
          Email address
        </label>

        <input
          id="register-email"
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          disabled={isLoading}
          autoComplete="email"
          placeholder="you@example.com"
          className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"
        />
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label
          htmlFor="register-password"
          className="text-sm font-medium text-stone-800"
        >
          Password
        </label>

        <input
          id="register-password"
          type="password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          disabled={isLoading}
          autoComplete="new-password"
          placeholder="Create a password"
          className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"
        />
      </div>

      {/* Confirm password */}
      <div className="space-y-2">
        <label
          htmlFor="confirm-password"
          className="text-sm font-medium text-stone-800"
        >
          Confirm password
        </label>

        <input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(event) =>
            setConfirmPassword(event.target.value)
          }
          disabled={isLoading}
          autoComplete="new-password"
          placeholder="Confirm your password"
          className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="mt-2 flex w-full items-center justify-center rounded-xl bg-emerald-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading
          ? "Creating account..."
          : "Create account"}
      </button>

      {/* Google */} <div className="space-y-4"> <div className="relative"> <div className="absolute inset-0 flex items-center"> <div className="w-full border-t border-stone-200" /> </div> <div className="relative flex justify-center"> <span className="bg-stone-50 px-3 text-xs text-stone-400"> OR </span> </div> </div> <GoogleAuthButton onError={(message) => { if (message) { setError(message); } }} /> </div>

      {/* Login link */}
      <p className="pt-2 text-center text-sm text-stone-500">
        Already have an account?{" "}

        <Link
          to="/login"
          className="font-semibold text-emerald-800"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
