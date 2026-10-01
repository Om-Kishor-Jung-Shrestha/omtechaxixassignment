
import { useState } from "react";

import {
  GoogleLogin,
  type CredentialResponse,
} from "@react-oauth/google";

import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/app/store/hooks";
import { setUser } from "@/app/store/slices/auth/auth.slice";
import { useGoogleSpaMutation } from "@/features/auth/api/auth.api";

interface GoogleAuthButtonProps {
  onError?: (message: string) => void;
}

export function GoogleAuthButton({
  onError,
}: GoogleAuthButtonProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [googleSpa, { isLoading }] =
    useGoogleSpaMutation();

  const [error, setError] = useState("");

  async function handleGoogleSuccess(
    credentialResponse: CredentialResponse,
  ) {
    setError("");
    onError?.("");

    if (!credentialResponse.credential) {
      const message =
        "Google authentication did not return a credential.";

      setError(message);
      onError?.(message);

      return;
    }

    try {
      const result = await googleSpa({
        idToken: credentialResponse.credential,
      }).unwrap();

      // Store authenticated user in Redux.
      dispatch(setUser(result.user));

      // Determine where the authenticated user should go.
      const isAdmin =
        result.user.role === "admin" ||
        result.user.role === "superadmin";

      if (isAdmin) {
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
          : "Unable to continue with Google.";

      setError(message);
      onError?.(message);
    }
  }

  function handleGoogleError() {
    const message =
      "Google authentication was unsuccessful.";

    setError(message);
    onError?.(message);
  }

  return (
    <div className="space-y-2">
      <div
        className={
          isLoading
            ? "pointer-events-none opacity-60"
            : ""
        }
      >
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          useOneTap={false}
          text="continue_with"
          shape="rectangular"
        />
      </div>

      {error && (
        <p
          role="alert"
          className="text-sm text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}
