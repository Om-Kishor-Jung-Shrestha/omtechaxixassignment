
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/app/store/hooks";
import { setUser } from "@/app/store/slices/auth/auth.slice";

import { useLoginMutation } from "@/features/auth/api/auth.api";
import { GoogleAuthButton } from "./GoogleAuthButton";

export function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login, { isLoading }] = useLoginMutation();


  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    void submitLogin();
  }

async function submitLogin() {
  try {
    const result = await login({
      email: email.trim(),
      password,
    }).unwrap();

    console.log("LOGIN RESULT:", result);
    console.log("USER ROLE:", result.user.role);

    dispatch(setUser(result.user));
console.log("ABOUT TO NAVIGATE:", result.user);
console.log("CURRENT PATH:", window.location.pathname);

    navigate("/dashboard", {
      replace: true,
    });
    setTimeout(() => {
  console.log("PATH AFTER NAVIGATION:", window.location.pathname);
}, 100);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to login. Please try again.";

    setError(message);
  }
}



  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
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

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium text-stone-800"
        >
          Email address
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          disabled={isLoading}
          className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10 disabled:cursor-not-allowed disabled:bg-stone-100"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-sm font-medium text-stone-800"
          >
            Password
          </label>

          <Link
            to="/forgot-password"
            className="text-xs font-medium text-emerald-800 hover:text-emerald-900"
          >
            Forgot password?
          </Link>
        </div>

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          disabled={isLoading}
          className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10 disabled:cursor-not-allowed disabled:bg-stone-100"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full items-center justify-center rounded-xl bg-emerald-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </button>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-stone-200" />
        </div>

        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-xs text-stone-400">
            OR
          </span>
        </div>
      </div>

      {/* <button
        type="button"
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm font-medium text-stone-800 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="font-bold text-stone-700">G</span>
        <span>Continue with Google</span>
      </button> */}
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-stone-200" />
          </div>

          <div className="relative flex justify-center">
            <span className="bg-stone-50 px-3 text-xs text-stone-400">
              OR
            </span>
          </div>
        </div>

        <GoogleAuthButton
          onError={(message) => {
            if (message) {
              setError(message);
            }
          }}
        />
      </div>

      <p className="text-center text-sm text-stone-500">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="font-semibold text-emerald-800 hover:text-emerald-900"
        >
          Create account
        </Link>
      </p>
    </form>
  );
}
