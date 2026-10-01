
import { useRef, useState } from "react";

import {
  Camera,
  CheckCircle2,
  Mail,
  Save,
  User,
} from "lucide-react";

import type {
  UpdateUserProfileDto,
  UserProfileResponseDto,
} from "@/features/user-profile/types/user-profile.types";

import {
  useUpdateUserProfileMutation,
  useUploadUserAvatarMutation,
} from "@/features/user-profile/api/user-profile.api";

interface ProfileTabProps {
  profile: UserProfileResponseDto;
  selectedAvatar: File | null;
  avatarPreview: string;
  onAvatarChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  onAvatarSaved: () => void;
  onAvatarSelectionClear: () => void;
}

export function ProfileTab({
  profile,
  selectedAvatar,
  avatarPreview,
  onAvatarChange,
  onAvatarSaved,
  onAvatarSelectionClear,
}: ProfileTabProps) {
  const [form, setForm] = useState<UpdateUserProfileDto>({
    firstName: profile.firstName ?? "",
    middleName: profile.middleName ?? "",
    lastName: profile.lastName ?? "",
    email: profile.email ?? "",
  });

  const [updateProfile, { isLoading, isSuccess }] =
    useUpdateUserProfileMutation();

  const [uploadUserAvatar, { isLoading: isAvatarUploading }] =
    useUploadUserAvatarMutation();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    field: keyof UpdateUserProfileDto,
    value: string,
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (selectedAvatar) {
      await uploadUserAvatar(selectedAvatar).unwrap();
      onAvatarSaved();
    }

    await updateProfile({
      firstName: form.firstName.trim(),
      middleName: form.middleName?.trim() || "",
      lastName: form.lastName.trim(),
      email: form.email.trim(),
    }).unwrap();
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarClear = () => {
    onAvatarSelectionClear();

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getInitials = () => {
    const first = profile.firstName?.charAt(0) ?? "";
    const last = profile.lastName?.charAt(0) ?? "";

    return `${first}${last}`.toUpperCase() || "U";
  };

  const fullName = [
    profile.firstName,
    profile.middleName,
    profile.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  const isSaving = isLoading || isAvatarUploading;

  return (
    <section className="space-y-6">
      {/* Profile header */}
      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-950">
        <div className="border-b border-stone-200 px-6 py-5 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
              <User className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                Personal Information
              </h2>

              <p className="text-sm text-stone-500 dark:text-stone-400">
                Update your personal details and profile information.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Avatar */}
          <div className="flex flex-col gap-5 border-b border-stone-200 px-6 py-6 sm:flex-row sm:items-center dark:border-stone-800">
            <div className="relative shrink-0">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-stone-100 bg-stone-100 text-2xl font-semibold text-stone-600 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt={fullName || "Profile"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  getInitials()
                )}
              </div>

              <button
                type="button"
                onClick={handleAvatarClick}
                disabled={isSaving}
                className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-emerald-600 text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:border-stone-950 dark:bg-emerald-500 dark:hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                title="Change profile photo"
                aria-label="Change profile photo"
              >
                <Camera className="h-4 w-4" />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                className="hidden"
                onChange={onAvatarChange}
                disabled={isSaving}
              />
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                Profile Photo
              </h3>

              <p className="text-sm text-stone-500 dark:text-stone-400">
                Choose a profile photo to personalize your account.
              </p>

              <p className="text-xs text-stone-400 dark:text-stone-500">
                JPG, PNG or WEBP
              </p>

              {selectedAvatar && (
                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    New photo selected.
                  </p>

                  <button
                    type="button"
                    onClick={handleAvatarClear}
                    disabled={isSaving}
                    className="text-xs font-medium text-stone-500 transition hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Form fields */}
          <div className="grid gap-5 px-6 py-6 md:grid-cols-2">
            {/* First Name */}
            <div className="space-y-2">
              <label
                htmlFor="firstName"
                className="text-sm font-medium text-stone-700 dark:text-stone-300"
              >
                First Name
              </label>

              <input
                id="firstName"
                type="text"
                value={form.firstName}
                onChange={(event) =>
                  handleChange("firstName", event.target.value)
                }
                placeholder="Enter your first name"
                required
                className="h-11 w-full rounded-xl border border-stone-200 bg-white px-3.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500"
              />
            </div>

            {/* Middle Name */}
            <div className="space-y-2">
              <label
                htmlFor="middleName"
                className="text-sm font-medium text-stone-700 dark:text-stone-300"
              >
                Middle Name{" "}
                <span className="ml-1 font-normal text-stone-400">
                  (Optional)
                </span>
              </label>

              <input
                id="middleName"
                type="text"
                value={form.middleName ?? ""}
                onChange={(event) =>
                  handleChange("middleName", event.target.value)
                }
                placeholder="Enter your middle name"
                className="h-11 w-full rounded-xl border border-stone-200 bg-white px-3.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500"
              />
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="text-sm font-medium text-stone-700 dark:text-stone-300"
              >
                Last Name
              </label>

              <input
                id="lastName"
                type="text"
                value={form.lastName}
                onChange={(event) =>
                  handleChange("lastName", event.target.value)
                }
                placeholder="Enter your last name"
                required
                className="h-11 w-full rounded-xl border border-stone-200 bg-white px-3.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-stone-700 dark:text-stone-300"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400 dark:text-stone-500" />

                <input
                  id="email"
                  type="email"
                  value={form.email}
                  readOnly
                  aria-readonly="true"
                  className="h-11 w-full cursor-not-allowed rounded-xl border border-stone-200 bg-stone-50 pl-10 pr-3.5 text-sm text-stone-500 outline-none dark:border-stone-700 dark:bg-stone-900/60 dark:text-stone-400"
                />
              </div>

              <p className="text-xs text-stone-400 dark:text-stone-500">
                Email address cannot be changed from your profile.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-3 border-t border-stone-200 bg-stone-50/70 px-6 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-stone-800 dark:bg-stone-900/40">
            <div className="min-h-5">
              {isSuccess && (
                <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  Profile updated successfully.
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-500 dark:hover:bg-emerald-600"
            >
              <Save className="h-4 w-4" />

              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}