import { useState } from "react";
import {
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
} from "lucide-react";

import type {
  UserProfileResponseDto,
} from "@/features/user-profile/types/user-profile.types";

import {
  useChangeUserPasswordMutation,
  useSetUserPasswordMutation,
} from "@/features/user-profile/api/user-profile.api";

interface PasswordTabProps {
  profile: UserProfileResponseDto;
}

export function PasswordTab({
  profile,
}: PasswordTabProps) {
  if (!profile.hasPassword) {
    return <SetPasswordForm />;
  }

  return <ChangePasswordForm />;
}

function SetPasswordForm() {
  const [newPassword, setNewPassword] =
    useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showNewPassword, setShowNewPassword] =
    useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [setPassword, { isLoading }] =
    useSetUserPasswordMutation();

  const handleSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    await setPassword({
      newPassword,
      confirmPassword,
    }).unwrap();

    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <PasswordCard
      icon={KeyRound}
      title="Set a password for your account"
      description="You signed up with Google. Add a password to also log in with your email."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <PasswordInput
          id="set-new-password"
          label="New Password"
          value={newPassword}
          onChange={setNewPassword}
          visible={showNewPassword}
          onToggle={() =>
            setShowNewPassword((current) => !current)
          }
        />

        <PasswordInput
          id="set-confirm-password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          visible={showConfirmPassword}
          onToggle={() =>
            setShowConfirmPassword(
              (current) => !current,
            )
          }
        />

        <PasswordActions
          loading={isLoading}
          loadingText="Setting Password..."
          text="Set Password"
        />
      </form>
    </PasswordCard>
  );
}

function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] =
    useState("");
  const [newPassword, setNewPassword] =
    useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);
  const [showNewPassword, setShowNewPassword] =
    useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [changePassword, { isLoading }] =
    useChangeUserPasswordMutation();

  const handleSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    await changePassword({
      currentPassword,
      newPassword,
      confirmPassword,
    }).unwrap();

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <PasswordCard
      icon={LockKeyhole}
      title="Change your password"
      description="Update your password to keep your account secure."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <PasswordInput
          id="current-password"
          label="Current Password"
          value={currentPassword}
          onChange={setCurrentPassword}
          visible={showCurrentPassword}
          onToggle={() =>
            setShowCurrentPassword(
              (current) => !current,
            )
          }
        />

        <PasswordInput
          id="change-new-password"
          label="New Password"
          value={newPassword}
          onChange={setNewPassword}
          visible={showNewPassword}
          onToggle={() =>
            setShowNewPassword((current) => !current)
          }
        />

        <PasswordInput
          id="confirm-new-password"
          label="Confirm New Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          visible={showConfirmPassword}
          onToggle={() =>
            setShowConfirmPassword(
              (current) => !current,
            )
          }
        />

        <PasswordActions
          loading={isLoading}
          loadingText="Changing Password..."
          text="Change Password"
        />
      </form>
    </PasswordCard>
  );
}

interface PasswordCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}

function PasswordCard({
  icon: Icon,
  title,
  description,
  children,
}: PasswordCardProps) {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900">
      <div className="border-b border-stone-200 px-6 py-5 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
            <Icon className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-base font-bold text-stone-900 dark:text-white">
              {title}
            </h2>

            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {children}
      </div>
    </section>
  );
}

function PasswordActions({
  loading,
  loadingText,
  text,
}: {
  loading: boolean;
  loadingText: string;
  text: string;
}) {
  return (
    <div className="flex justify-end border-t border-stone-100 pt-5 dark:border-stone-800">
      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
      >
        {loading ? loadingText : text}
      </button>
    </div>
  );
}

interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  onToggle: () => void;
}

function PasswordInput({
  id,
  label,
  value,
  onChange,
  visible,
  onToggle,
}: PasswordInputProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-stone-700 dark:text-stone-200"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          required
          minLength={6}
          className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 pr-11 text-sm text-stone-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:focus:border-emerald-500"
        />

        <button
          type="button"
          onClick={onToggle}
          aria-label={
            visible
              ? `Hide ${label}`
              : `Show ${label}`
          }
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-stone-400 transition hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
        >
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}