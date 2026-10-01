
import { useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAppDispatch } from "@/app/store/hooks";
import { setUser } from "@/app/store/slices/auth/auth.slice";

import {
  useVerifyOtpMutation,
} from "@/features/auth/api/auth.api";

interface VerifyOtpLocationState {
  email?: string;
}

export function VerifyOtpForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const state =
    location.state as VerifyOtpLocationState | null;

  const [email, setEmail] = useState(
    state?.email ?? "",
  );

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const [verifyOtp, { isLoading }] =
    useVerifyOtpMutation();

  function handleSubmit(
    event: React.SubmitEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");

    const normalizedEmail = email.trim();
    const normalizedOtp = otp.trim();

    if (!normalizedEmail) {
      setError("Email is required.");
      return;
    }

    if (!normalizedOtp) {
      setError("OTP is required.");
      return;
    }

    if (!/^\d{6}$/.test(normalizedOtp)) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    void submitVerification(
      normalizedEmail,
      normalizedOtp,
    );
  }

  async function submitVerification(
    normalizedEmail: string,
    normalizedOtp: string,
  ) {
    try {
      const result = await verifyOtp({
        email: normalizedEmail,
        otp: normalizedOtp,
      }).unwrap();

      dispatch(setUser(result.user));

      if (
        result.user.role === "admin" ||
        result.user.role === "superadmin"
      ) {
        navigate("/admin/dashboard", {
          replace: true,
        });

        return;
      }

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to verify OTP.";

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
          htmlFor="otp-email"
          className="text-sm font-medium text-stone-800"
        >
          Email address
        </label>

        <input
          id="otp-email"
          name="email"
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          disabled={isLoading}
          autoComplete="email"
          placeholder="you@example.com"
          className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10 disabled:cursor-not-allowed disabled:bg-stone-100"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="otp"
          className="text-sm font-medium text-stone-800"
        >
          Verification code
        </label>

        <input
          id="otp"
          name="otp"
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={otp}
          onChange={(event) => {
            const value =
              event.target.value.replace(/\D/g, "");

            setOtp(value);
          }}
          disabled={isLoading}
          autoComplete="one-time-code"
          placeholder="000000"
          className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-center text-xl tracking-[0.4em] text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10 disabled:cursor-not-allowed disabled:bg-stone-100"
        />

        <p className="text-xs leading-5 text-stone-500">
          Enter the 6-digit verification code sent
          to your email address.
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading || otp.length !== 6}
        className="flex w-full items-center justify-center rounded-xl bg-emerald-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading
          ? "Verifying..."
          : "Verify account"}
      </button>

      <p className="text-center text-sm text-stone-500">
        Already verified?{" "}
        <Link
          to="/login"
          className="font-semibold text-emerald-800 hover:text-emerald-900"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
