
import { useEffect, useState } from "react";

import { useGetUserProfileQuery } from "@/features/user-profile/api/user-profile.api";

import { ProfileTab } from "./components/ProfileTab";
import { PasswordTab } from "./components/PasswordTab";
import { SocialTab } from "./components/SocialTab";

type ProfileTabKey = "profile" | "password" | "social";

const tabs: Array<{
  key: ProfileTabKey;
  label: string;
}> = [
  {
    key: "profile",
    label: "Profile",
  },
  {
    key: "password",
    label: "Password",
  },
  {
    key: "social",
    label: "Social",
  },
];

const ALLOWED_AVATAR_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
]);

const MAX_AVATAR_SIZE = 5 * 1024 * 1024;

export default function UserProfilePage() {
  const [activeTab, setActiveTab] =
    useState<ProfileTabKey>("profile");

  /**
   * The selected file belongs to the page so it survives
   * ProfileTab unmounting/remounting when switching tabs.
   */
  const [selectedAvatar, setSelectedAvatar] =
    useState<File | null>(null);

  /**
   * This only contains a temporary blob URL created from
   * the locally selected file.
   *
   * The persisted avatar URL always comes from profile.avatar.url.
   */
  const [avatarPreview, setAvatarPreview] =
    useState("");

  const {
    data: profile,
    isLoading,
    isError,
  } = useGetUserProfileQuery();

  /**
   * Revoke the current blob URL when it is replaced or when
   * the profile page is unmounted.
   */
  useEffect(() => {
    return () => {
      if (avatarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const handleAvatarChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!ALLOWED_AVATAR_TYPES.has(file.type)) {
      event.target.value = "";
      return;
    }

    if (file.size > MAX_AVATAR_SIZE) {
      event.target.value = "";
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setSelectedAvatar(file);
    setAvatarPreview(previewUrl);

    /**
     * Allow selecting the same file again later.
     */
    event.target.value = "";
  };

  /**
   * Called only after the avatar has actually been uploaded
   * successfully to the backend.
   *
   * The profile query will then be refreshed through RTK Query's
   * invalidated User tag, and profile.avatar.url becomes the
   * persisted Cloudinary URL.
   */
  const handleAvatarSaved = () => {
    setSelectedAvatar(null);
    setAvatarPreview("");
  };

  /**
   * Cancel the pending local avatar selection.
   *
   * Once selectedAvatar is cleared, the UI automatically falls
   * back to profile.avatar.url.
   */
  const handleAvatarSelectionClear = () => {
    setSelectedAvatar(null);
    setAvatarPreview("");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading profile...
        </p>
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="text-sm text-destructive">
          Unable to load your profile.
        </p>
      </div>
    );
  }

  /**
   * Local preview takes priority only while an image is waiting
   * to be uploaded.
   *
   * Otherwise the server-persisted avatar is displayed.
   */
  const displayedAvatar =
    selectedAvatar && avatarPreview
      ? avatarPreview
      : profile.avatar?.url ?? "";

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Profile Management
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your profile and account preferences
        </p>
      </div>

      <div
        className="border-b border-border"
        role="tablist"
        aria-label="Profile management"
      >
        <div className="flex gap-1">
          {tabs.map((tab) => {
            const isActive =
              activeTab === tab.key;

            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() =>
                  setActiveTab(tab.key)
                }
                className={[
                  "relative px-5 py-3 text-sm font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-ring focus-visible:ring-offset-2",
                  "focus-visible:ring-offset-background",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                {tab.label}

                {isActive && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-foreground" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === "profile" && (
        <ProfileTab
          profile={profile}
          selectedAvatar={selectedAvatar}
          avatarPreview={displayedAvatar}
          onAvatarChange={handleAvatarChange}
          onAvatarSaved={handleAvatarSaved}
          onAvatarSelectionClear={
            handleAvatarSelectionClear
          }
        />
      )}

      {activeTab === "password" && (
        <PasswordTab profile={profile} />
      )}

      {activeTab === "social" && (
        <SocialTab profile={profile} />
      )}
    </div>
  );
}
