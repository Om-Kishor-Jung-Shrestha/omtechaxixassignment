import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import {
  Check,
  Link2,
  Loader2,
  ShieldCheck,

} from "lucide-react";

import {
  useGetUserProfileQuery,
} from "@/features/user-profile/api/user-profile.api";

import {
  useLinkGoogleMutation,
} from "@/features/auth/api/auth.api";

import type {
  UserProfileResponseDto,
} from "@/features/user-profile/types/user-profile.types";

interface SocialTabProps {
  profile: UserProfileResponseDto;
}

export function SocialTab({
  profile,
}: SocialTabProps) {
  const [linkGoogle, { isLoading }] =
    useLinkGoogleMutation();

  const {
    refetch: refetchProfile,
  } = useGetUserProfileQuery();

  const [googleError, setGoogleError] =
    useState<string | null>(null);

  const handleGoogleSuccess = async (
    response: {
      credential?: string;
    },
  ) => {
    if (!response.credential) {
      setGoogleError(
        "Google did not return a valid credential.",
      );
      return;
    }

    try {
      setGoogleError(null);

      await linkGoogle({
        idToken: response.credential,
      }).unwrap();

      await refetchProfile();
    } catch (error) {
      console.error(
        "Google account linking failed:",
        error,
      );

      setGoogleError(
        "Unable to connect your Google account. Please try again.",
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Connected accounts */}
      <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div className="border-b border-stone-200 px-6 py-5 dark:border-stone-800">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
              <Link2 size={19} />
            </div>

            <div>
              <h2 className="text-base font-bold text-stone-900 dark:text-white">
                Connected Accounts
              </h2>

              <p className="mt-1 text-sm leading-6 text-stone-500 dark:text-stone-400">
                Manage the accounts connected to your
                profile.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col gap-4 rounded-xl border border-stone-200 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-stone-800">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-950">
                <span className="text-lg font-semibold text-stone-900 dark:text-white">
                  G
                </span>
              </div>

              <div>
                <p className="text-sm font-semibold text-stone-900 dark:text-white">
                  Google
                </p>

                {profile.providerLinked ? (
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                      <Check size={13} />
                    </span>

                    <span className="text-sm text-emerald-700 dark:text-emerald-400">
                      Connected
                    </span>
                  </div>
                ) : (
                  <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                    Connect Google for faster sign-in.
                  </p>
                )}
              </div>
            </div>

            {profile.providerLinked ? (
              <div className="inline-flex items-center gap-2 self-start rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 sm:self-auto dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400">
                <ShieldCheck size={16} />
                Connected
              </div>
            ) : (
              <div className="w-full sm:w-auto">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() =>
                    setGoogleError(
                      "Google connection was cancelled or failed.",
                    )
                  }
                  theme="outline"
                  size="large"
                  text="continue_with"
                  shape="rectangular"
                />
              </div>
            )}
          </div>

          {isLoading && (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-600 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-300">
              <Loader2
                size={16}
                className="animate-spin"
              />
              Connecting your Google account...
            </div>
          )}

          {googleError && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
              {googleError}
            </div>
          )}
        </div>
      </section>

      {/* Security information */}
      <section className="rounded-2xl border border-stone-200 bg-stone-50 p-5 dark:border-stone-800 dark:bg-stone-900/60">
        <div className="flex gap-3">
          <ShieldCheck
            size={20}
            className="mt-0.5 shrink-0 text-emerald-700 dark:text-emerald-400"
          />

          <div>
            <p className="text-sm font-semibold text-stone-900 dark:text-white">
              Account security
            </p>

            <p className="mt-1 text-sm leading-6 text-stone-500 dark:text-stone-400">
              Connecting Google lets you use your Google
              account to authenticate with this application.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}