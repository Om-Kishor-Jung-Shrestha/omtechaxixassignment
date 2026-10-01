export const APPLICATION_STATUSES = [
  "pending",
  "under_review",
  "approved",
  "rejected",
] as const;

export type ApplicationStatus =
  (typeof APPLICATION_STATUSES)[number];

export const APPLICATION_INTAKES = [
  "Spring",
  "Fall",
] as const;

export type ApplicationIntake =
  (typeof APPLICATION_INTAKES)[number];

export const HIGHER_EDUCATION_BOARDS = [
  "NEB",
  "CTEVT",
  "TU",
  "KU",
  "PU",
  "Other",
] as const;

export type HigherEducationBoard =
  (typeof HIGHER_EDUCATION_BOARDS)[number];

export type ApplicationFileStorage =
  "cloudinary" | "local";

export type ApplicationFileResourceType =
  "image" | "raw";