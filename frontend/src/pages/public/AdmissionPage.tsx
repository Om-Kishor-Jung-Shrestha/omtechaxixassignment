
import {
  type ChangeEvent,
  type ReactNode,
  type SyntheticEvent,
  useMemo,
  useState,
} from "react";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  GraduationCap,
  Loader2,
  Upload,
  UserRound,
} from "lucide-react";

import { useCreateApplicationMutation } from "@/features/application/api/application.api";
import { useGetProgramsQuery } from "@/features/programs/api/program.api";

type AdmissionStep = 1 | 2 | 3 | 4;

interface AcademicHistoryFormData {
  collegeOrSchool: string;
  board: string;
  gradeOrGpa: string;
}

interface ApplicationFormData {
  program: string;
  admissionSession: string;
  admissionIntake: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  academicQualification: string;
  academicHistory: AcademicHistoryFormData;
  applicantImage: File | null;
  citizenshipFile: File | null;
  coverFile: File | null;
  characterCertificate: File | null;
  academicDocument: File | null;
  marksheet12: File | null;
}

const initialFormData: ApplicationFormData = {
  program: "",
  admissionSession: "",
  admissionIntake: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  academicQualification: "",
  academicHistory: {
    collegeOrSchool: "",
    board: "",
    gradeOrGpa: "",
  },
  applicantImage: null,
  citizenshipFile: null,
  coverFile: null,
  characterCertificate: null,
  academicDocument: null,
  marksheet12: null,
};

const currentYear = new Date().getFullYear();

const admissionSessions = Array.from(
  { length: 3 },
  (_, index) => {
    const year = currentYear + index;
    return `${year}/${year + 1}`;
  },
);

const steps = [
  {
    number: 1,
    title: "Program",
    description: "Choose your program",
    icon: GraduationCap,
  },
  {
    number: 2,
    title: "Applicant",
    description: "Personal information",
    icon: UserRound,
  },
  {
    number: 3,
    title: "Academic",
    description: "Academic information",
    icon: FileText,
  },
  {
    number: 4,
    title: "Documents",
    description: "Upload documents",
    icon: Upload,
  },
] as const;

export function AdmissionPage() {
  const [currentStep, setCurrentStep] =
    useState<AdmissionStep>(1);

  const [formData, setFormData] =
    useState<ApplicationFormData>(initialFormData);

  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [
    createApplication,
    { isLoading: isSubmitting },
  ] = useCreateApplicationMutation();

  const {
    data: programsData,
    isLoading: isLoadingPrograms,
    isError: isProgramsError,
  } = useGetProgramsQuery({
    page: 1,
    limit: 100,
  });

  const programs = useMemo(
    () => programsData?.items ?? [],
    [programsData?.items],
  );

  function updateField(
    field:
      | "program"
      | "admissionSession"
      | "admissionIntake"
      | "firstName"
      | "lastName"
      | "email"
      | "phone"
      | "address"
      | "academicQualification",
    value: string,
  ) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    setSubmitError("");
  }

  function updateAcademicHistory(
    field:
      | "collegeOrSchool"
      | "board"
      | "gradeOrGpa",
    value: string,
  ) {
    setFormData((current) => ({
      ...current,
      academicHistory: {
        ...current.academicHistory,
        [field]: value,
      },
    }));

    setSubmitError("");
  }

  function updateFile(
    field:
      | "applicantImage"
      | "citizenshipFile"
      | "coverFile"
      | "characterCertificate"
      | "academicDocument"
      | "marksheet12",
    file: File | null,
  ) {
    setFormData((current) => ({
      ...current,
      [field]: file,
    }));

    setSubmitError("");
  }

  function validateStep(step: AdmissionStep): boolean {
    if (step === 1) {
      return Boolean(
        formData.program &&
          formData.admissionSession &&
          formData.admissionIntake,
      );
    }

    if (step === 2) {
      return Boolean(
        formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.phone &&
          formData.address,
      );
    }

    if (step === 3) {
      return Boolean(
        formData.academicQualification &&
          formData.academicHistory.collegeOrSchool &&
          formData.academicHistory.board &&
          formData.academicHistory.gradeOrGpa,
      );
    }

    if (step === 4) {
      return Boolean(
        formData.applicantImage &&
          formData.citizenshipFile &&
          formData.coverFile &&
          formData.characterCertificate &&
          formData.academicDocument &&
          formData.marksheet12,
      );
    }

    return false;
  }

  function goNext() {
    if (
      currentStep === 1 &&
      isLoadingPrograms
    ) {
      setSubmitError(
        "Please wait while the programs are loading.",
      );
      return;
    }

    if (
      currentStep === 1 &&
      isProgramsError
    ) {
      setSubmitError(
        "Unable to load programs. Please refresh the page and try again.",
      );
      return;
    }

    if (!validateStep(currentStep)) {
      setSubmitError(
        "Please complete all required fields before continuing.",
      );
      return;
    }

    setSubmitError("");

    if (currentStep < 4) {
      setCurrentStep(
        (currentStep + 1) as AdmissionStep,
      );
    }
  }

  function goBack() {
    setSubmitError("");

    if (currentStep > 1) {
      setCurrentStep(
        (currentStep - 1) as AdmissionStep,
      );
    }
  }

  function goToStep(step: number) {
    if (step <= currentStep) {
      setSubmitError("");
      setCurrentStep(step as AdmissionStep);
    }
  }

  function buildApplicationFormData() {
    const payload = new FormData();

    payload.append(
      "firstName",
      formData.firstName,
    );

    payload.append(
      "lastName",
      formData.lastName,
    );

    payload.append(
      "email",
      formData.email,
    );

    payload.append(
      "phone",
      formData.phone,
    );

    payload.append(
      "program",
      formData.program,
    );

    payload.append(
      "admissionSession",
      formData.admissionSession,
    );

    payload.append(
      "admissionIntake",
      formData.admissionIntake,
    );

    payload.append(
      "academicQualification",
      formData.academicQualification,
    );

    payload.append(
      "address",
      formData.address,
    );

    payload.append(
      "academicHistory[collegeOrSchool]",
      formData.academicHistory.collegeOrSchool,
    );

    payload.append(
      "academicHistory[board]",
      formData.academicHistory.board,
    );

    payload.append(
      "academicHistory[gradeOrGpa]",
      formData.academicHistory.gradeOrGpa,
    );

    if (formData.applicantImage) {
      payload.append(
        "applicantImage",
        formData.applicantImage,
      );
    }

    if (formData.citizenshipFile) {
      payload.append(
        "citizenship",
        formData.citizenshipFile,
      );
    }

    if (formData.coverFile) {
      payload.append(
        "cover",
        formData.coverFile,
      );
    }

    if (formData.characterCertificate) {
      payload.append(
        "characterCertificate",
        formData.characterCertificate,
      );
    }

    if (formData.academicDocument) {
      payload.append(
        "document",
        formData.academicDocument,
      );
    }

    if (formData.marksheet12) {
      payload.append(
        "marksheet12",
        formData.marksheet12,
      );
    }

    return payload;
  }

  async function handleSubmit(
    event: SyntheticEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setSubmitError("");

    if (!validateStep(4)) {
      setSubmitError(
        "Please upload all required documents before submitting.",
      );
      return;
    }

    try {
      const payload =
        buildApplicationFormData();

      await createApplication(payload).unwrap();

      setSubmitted(true);
    } catch (error) {
      console.error(
        "Application submission failed:",
        error,
      );

      const apiError = error as {
        data?: {
          message?: string;
          details?: Array<{
            field?: string;
            messages?: string[];
          }>;
        };
        error?: string;
      };

      const validationMessages =
        apiError.data?.details
          ?.map((detail) => {
            if (!detail.field) {
              return detail.messages?.join(", ");
            }

            return `${detail.field}: ${
              detail.messages?.join(", ") ??
              "Invalid value"
            }`;
          })
          .filter(Boolean)
          .join(" | ");

      setSubmitError(
        validationMessages ||
          apiError.data?.message ||
          apiError.error ||
          "Unable to submit the application. Please try again.",
      );
    }
  }

  const progressWidth = useMemo(() => {
    if (currentStep === 1) {
      return "0%";
    }

    if (currentStep === 2) {
      return "33.33%";
    }

    if (currentStep === 3) {
      return "66.66%";
    }

    return "100%";
  }, [currentStep]);

  if (submitted) {
    return (
      <div className="min-h-screen bg-stone-50 px-4 py-10 dark:bg-stone-950 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl items-center justify-center">
          <div className="w-full rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
              <Check className="h-8 w-8" />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-stone-900 dark:text-stone-100">
              Application Submitted
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-stone-500 dark:text-stone-400">
              Your admission application has
              been submitted successfully. Our
              admission team will review your
              application and contact you with
              further information.
            </p>

            <div className="mt-8 rounded-xl bg-stone-50 p-4 text-left dark:bg-stone-950">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Application status
              </p>

              <p className="mt-1 text-sm font-semibold text-amber-600 dark:text-amber-400">
                Pending Review
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setCurrentStep(1);
                setFormData(initialFormData);
                setSubmitError("");
              }}
              className="mt-8 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 px-4 py-8 dark:bg-stone-950 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
            Admission Application
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100 sm:text-4xl">
            Start Your Application
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-stone-500 dark:text-stone-400 sm:text-base">
            Complete the application form below
            to begin your admission process.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-stone-200 bg-white px-5 py-6 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:px-8">
          <div className="relative">
            <div className="absolute left-[12%] right-[12%] top-5 h-px bg-stone-200 dark:bg-stone-700" />

            <div
              className="absolute left-[12%] top-5 h-px bg-emerald-600 transition-all duration-300"
              style={{
                width: progressWidth,
                maxWidth: "76%",
              }}
            />

            <div className="relative grid grid-cols-4">
              {steps.map((step) => {
                const Icon = step.icon;

                const isActive =
                  currentStep === step.number;

                const isCompleted =
                  currentStep > step.number;

                let indicatorClass =
                  "border-stone-300 bg-white text-stone-400 dark:border-stone-700 dark:bg-stone-900";

                if (isCompleted) {
                  indicatorClass =
                    "border-emerald-600 bg-emerald-600 text-white";
                } else if (isActive) {
                  indicatorClass =
                    "border-emerald-600 bg-white text-emerald-700 ring-4 ring-emerald-50 dark:bg-stone-900 dark:text-emerald-400 dark:ring-emerald-950";
                }

                return (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() =>
                      goToStep(step.number)
                    }
                    disabled={
                      step.number >
                      currentStep
                    }
                    className="group flex flex-col items-center text-center disabled:cursor-default"
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${indicatorClass}`}
                    >
                      {isCompleted ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Icon className="h-4 w-4" />
                      )}
                    </div>

                    <span
                      className={`mt-3 text-xs font-semibold sm:text-sm ${
                        isActive || isCompleted
                          ? "text-stone-900 dark:text-stone-100"
                          : "text-stone-400 dark:text-stone-500"
                      }`}
                    >
                      {step.title}
                    </span>

                    <span className="mt-1 hidden text-[11px] text-stone-400 dark:text-stone-500 sm:block">
                      {step.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {submitError && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
            {submitError}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-6"
        >
          <div className="rounded-2xl border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900">
            {currentStep === 1 && (
              <StepContainer
                title="Select Program"
                description="Choose the program, admission session, and intake you are applying for."
              >
                <div className="space-y-6">
                  <SelectField
                    label="Program"
                    required
                    value={formData.program}
                    onChange={(value) =>
                      updateField(
                        "program",
                        value,
                      )
                    }
                  >
                    <option value="">
                      {isLoadingPrograms
                        ? "Loading programs..."
                        : isProgramsError
                          ? "Unable to load programs"
                          : "Select a program"}
                    </option>

                    {programs.map((program) => (
                      <option
                        key={program.id}
                        value={program.id}
                      >
                        {program.mnemonic}
                      </option>
                    ))}
                  </SelectField>

                  <SelectField
                    label="Admission Session"
                    required
                    value={
                      formData.admissionSession
                    }
                    onChange={(value) =>
                      updateField(
                        "admissionSession",
                        value,
                      )
                    }
                  >
                    <option value="">
                      Select session
                    </option>

                    {admissionSessions.map(
                      (session) => (
                        <option
                          key={session}
                          value={session}
                        >
                          {session}
                        </option>
                      ),
                    )}
                  </SelectField>

                  <SelectField
                    label="Admission Intake"
                    required
                    value={
                      formData.admissionIntake
                    }
                    onChange={(value) =>
                      updateField(
                        "admissionIntake",
                        value,
                      )
                    }
                  >
                    <option value="">
                      Select intake
                    </option>

                    <option value="Spring">
                      Spring
                    </option>

                    <option value="Fall">
                      Fall
                    </option>
                  </SelectField>
                </div>
              </StepContainer>
            )}

            {currentStep === 2 && (
              <StepContainer
                title="Applicant Information"
                description="Enter the applicant's personal and contact information."
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <InputField
                    label="First Name"
                    required
                    value={formData.firstName}
                    onChange={(value) =>
                      updateField(
                        "firstName",
                        value,
                      )
                    }
                    placeholder="Enter first name"
                  />

                  <InputField
                    label="Last Name"
                    required
                    value={formData.lastName}
                    onChange={(value) =>
                      updateField(
                        "lastName",
                        value,
                      )
                    }
                    placeholder="Enter last name"
                  />

                  <InputField
                    label="Email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(value) =>
                      updateField(
                        "email",
                        value,
                      )
                    }
                    placeholder="you@example.com"
                  />

                  <InputField
                    label="Phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(value) =>
                      updateField(
                        "phone",
                        value,
                      )
                    }
                    placeholder="+977 98XXXXXXXX"
                  />

                  <div className="md:col-span-2">
                    <TextAreaField
                      label="Address"
                      required
                      value={formData.address}
                      onChange={(value) =>
                        updateField(
                          "address",
                          value,
                        )
                      }
                      placeholder="Enter your complete address"
                      rows={4}
                    />
                  </div>
                </div>
              </StepContainer>
            )}

            {currentStep === 3 && (
              <StepContainer
                title="Academic Information"
                description="Provide information about your previous academic qualification."
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <InputField
                      label="Academic Qualification"
                      required
                      value={
                        formData.academicQualification
                      }
                      onChange={(value) =>
                        updateField(
                          "academicQualification",
                          value,
                        )
                      }
                      placeholder="e.g. +2 Science, A-Level, Diploma"
                    />
                  </div>

                  <InputField
                    label="College / School"
                    required
                    value={
                      formData.academicHistory
                        .collegeOrSchool
                    }
                    onChange={(value) =>
                      updateAcademicHistory(
                        "collegeOrSchool",
                        value,
                      )
                    }
                    placeholder="Enter college or school name"
                  />

                  <SelectField
                    label="Higher Education Board"
                    required
                    value={
                      formData.academicHistory.board
                    }
                    onChange={(value) =>
                      updateAcademicHistory(
                        "board",
                        value,
                      )
                    }
                  >
                    <option value="">
                      Select board
                    </option>

                    <option value="NEB">
                      NEB
                    </option>

                    <option value="CTEVT">
                      CTEVT
                    </option>

                    <option value="TU">
                      TU
                    </option>

                    <option value="KU">
                      KU
                    </option>

                    <option value="PU">
                      PU
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </SelectField>

                  <div className="md:col-span-2">
                    <InputField
                      label="Grade / GPA"
                      required
                      value={
                        formData.academicHistory
                          .gradeOrGpa
                      }
                      onChange={(value) =>
                        updateAcademicHistory(
                          "gradeOrGpa",
                          value,
                        )
                      }
                      placeholder="e.g. 3.45 or 78%"
                    />
                  </div>
                </div>
              </StepContainer>
            )}

            {currentStep === 4 && (
              <StepContainer
                title="Upload Documents"
                description="Upload the required documents for your admission application."
              >
                <div className="space-y-5">
                  <FileUploadField
                    label="Applicant Image"
                    required
                    file={
                      formData.applicantImage
                    }
                    onChange={(file) =>
                      updateFile(
                        "applicantImage",
                        file,
                      )
                    }
                    accept="image/*"
                  />

                  <FileUploadField
                    label="Citizenship / ID"
                    required
                    file={
                      formData.citizenshipFile
                    }
                    onChange={(file) =>
                      updateFile(
                        "citizenshipFile",
                        file,
                      )
                    }
                    accept="image/*,.pdf"
                  />

                  <FileUploadField
                    label="Cover"
                    required
                    file={formData.coverFile}
                    onChange={(file) =>
                      updateFile(
                        "coverFile",
                        file,
                      )
                    }
                    accept="image/*,.pdf"
                  />

                  <FileUploadField
                    label="Character Certificate"
                    required
                    file={
                      formData.characterCertificate
                    }
                    onChange={(file) =>
                      updateFile(
                        "characterCertificate",
                        file,
                      )
                    }
                    accept="image/*,.pdf"
                  />

                  <FileUploadField
                    label="Academic Document"
                    required
                    file={
                      formData.academicDocument
                    }
                    onChange={(file) =>
                      updateFile(
                        "academicDocument",
                        file,
                      )
                    }
                    accept="image/*,.pdf"
                  />

                  <FileUploadField
                    label="Marksheet"
                    required
                    file={formData.marksheet12}
                    onChange={(file) =>
                      updateFile(
                        "marksheet12",
                        file,
                      )
                    }
                    accept="image/*,.pdf"
                  />
                </div>

                <div className="mt-8 rounded-xl border border-stone-200 bg-stone-50 p-4 dark:border-stone-700 dark:bg-stone-950">
                  <div className="flex gap-3">
                    <input
                      id="declaration"
                      type="checkbox"
                      required
                      className="mt-1 h-4 w-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 dark:border-stone-600 dark:bg-stone-900"
                    />

                    <label
                      htmlFor="declaration"
                      className="text-sm leading-6 text-stone-600 dark:text-stone-300"
                    >
                      I declare that the
                      information provided in
                      this application is accurate
                      and complete to the best of
                      my knowledge. I understand
                      that providing false
                      information may result in
                      rejection of my application.
                    </label>
                  </div>
                </div>
              </StepContainer>
            )}

            <div className="flex items-center justify-between border-t border-stone-200 px-5 py-5 dark:border-stone-800 sm:px-8">
              <button
                type="button"
                onClick={goBack}
                disabled={currentStep === 1}
                className={[
                  "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition",
                  currentStep === 1
                    ? "cursor-not-allowed text-stone-300 dark:text-stone-700"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white",
                ].join(" ")}
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={
                    currentStep === 1 &&
                    (isLoadingPrograms ||
                      isProgramsError)
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      Submit Application
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function StepContainer({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="p-5 sm:p-8 lg:p-10">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 sm:text-2xl">
          {title}
        </h2>

        <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
          {description}
        </p>
      </div>

      {children}
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-stone-700 dark:text-stone-200">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        value={value}
        required={required}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-stone-300 bg-white px-3.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-950"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  children,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-stone-700 dark:text-stone-200">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <select
        value={value}
        required={required}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-11 w-full rounded-xl border border-stone-300 bg-white px-3.5 text-sm text-stone-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:focus:border-emerald-500 dark:focus:ring-emerald-950"
      >
        {children}
      </select>
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-stone-700 dark:text-stone-200">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <textarea
        value={value}
        required={required}
        rows={rows}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="w-full resize-none rounded-xl border border-stone-300 bg-white px-3.5 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-950"
      />
    </div>
  );
}

function FileUploadField({
  label,
  file,
  onChange,
  accept,
  required = false,
}: {
  label: string;
  file: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
  required?: boolean;
}) {
  function handleChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const selectedFile =
      event.target.files?.[0] ?? null;

    onChange(selectedFile);
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-stone-700 dark:text-stone-200">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <label className="flex min-h-[76px] cursor-pointer items-center gap-4 rounded-xl border border-dashed border-stone-300 bg-stone-50 px-4 py-3 transition hover:border-emerald-400 hover:bg-emerald-50/40 dark:border-stone-700 dark:bg-stone-950 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/20">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-stone-400 shadow-sm dark:bg-stone-900">
          <Upload className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          {file ? (
            <>
              <p className="truncate text-sm font-medium text-stone-800 dark:text-stone-100">
                {file.name}
              </p>

              <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                File selected
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-stone-700 dark:text-stone-200">
                Choose File
              </p>

              <p className="mt-1 text-xs text-stone-400 dark:text-stone-500">
                PDF or image file
              </p>
            </>
          )}
        </div>

        <span className="shrink-0 rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300">
          Browse
        </span>

        <input
          type="file"
          accept={accept}
          required={required && !file}
          onChange={handleChange}
          className="sr-only"
        />
      </label>
    </div>
  );
}

export default AdmissionPage;
