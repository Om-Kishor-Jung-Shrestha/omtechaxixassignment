import { useEffect, useState } from "react";

import { useLazyGetApplicationFileQuery } from "@/features/application/api/application.api";

import type { ApplicationResponseDto } from "../types/application.types";

interface ApplicationDocumentsProps {
  application: ApplicationResponseDto;
}

type LocalApplicationDocumentField =
  | "citizenship"
  | "cover"
  | "characterCertificate"
  | "document"
  | "marksheet12";

const DOCUMENTS: Array<{
  field: LocalApplicationDocumentField;
  label: string;
}> = [
  { field: "citizenship", label: "Citizenship" },
  { field: "cover", label: "Cover Document" },
  {
    field: "characterCertificate",
    label: "Character Certificate",
  },
  { field: "document", label: "Academic Document" },
  { field: "marksheet12", label: "Grade 12 Marksheet" },
];

export function ApplicationDocuments({
  application,
}: ApplicationDocumentsProps) {
  const [getApplicationFile, { isFetching }] =
    useLazyGetApplicationFileQuery();

  const [previewField, setPreviewField] =
    useState<LocalApplicationDocumentField | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [isExpanded, setIsExpanded] = useState(false);

  const handleView = async (
    field: LocalApplicationDocumentField
  ) => {
    try {
      const blob = await getApplicationFile({
        id: application.id,
        field,
      }).unwrap();

      const objectUrl = URL.createObjectURL(blob);

      setPreviewUrl((previousUrl) => {
        if (previousUrl) {
          URL.revokeObjectURL(previousUrl);
        }

        return objectUrl;
      });

      setPreviewField(field);
      setIsExpanded(false);
    } catch (error) {
      console.error(
        `Failed to load application document: ${field}`,
        error
      );

      window.alert(
        "Unable to load this document. Please try again."
      );
    }
  };

  const handleClose = () => {
    setPreviewUrl((previousUrl) => {
      if (previousUrl) {
        URL.revokeObjectURL(previousUrl);
      }

      return null;
    });

    setPreviewField(null);
    setIsExpanded(false);
  };

  const handleApplicantImageView = () => {
    const imageUrl = application.applicantImage?.url;

    if (!imageUrl) {
      window.alert("Applicant image is not available.");
      return;
    }

    window.open(
      imageUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  useEffect(() => {
    return () => {
      setPreviewUrl((previousUrl) => {
        if (previousUrl) {
          URL.revokeObjectURL(previousUrl);
        }

        return null;
      });
    };
  }, []);

  const previewTitle =
    DOCUMENTS.find(
      (document) => document.field === previewField
    )?.label ?? "Document";

  return (
    <>
      <section className="rounded-xl border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div className="border-b border-stone-200 px-5 py-4 dark:border-stone-800">
          <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
            Documents
          </h2>
        </div>

        <div className="divide-y divide-stone-200 dark:divide-stone-800">
          {DOCUMENTS.map((document) => {
            const file = application.documents[document.field];

            return (
              <div
                key={document.field}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                    {document.label}
                  </p>

                  <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
                    {file?.format
                      ? file.format.toUpperCase()
                      : "PDF"}
                  </p>
                </div>

                <button
                  type="button"
                  disabled={isFetching}
                  onClick={() => void handleView(document.field)}
                  className="shrink-0 rounded-lg border border-stone-300 px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
                >
                  {isFetching && previewField === document.field
                    ? "Loading..."
                    : "View"}
                </button>
              </div>
            );
          })}

          <div className="flex items-center justify-between gap-4 px-5 py-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                Applicant Image
              </p>

              <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
                {application.applicantImage?.format
                  ? application.applicantImage.format.toUpperCase()
                  : "Image"}
              </p>
            </div>

            <button
              type="button"
              disabled={!application.applicantImage?.url}
              onClick={handleApplicantImageView}
              className="shrink-0 rounded-lg border border-stone-300 px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
            >
              View
            </button>
          </div>
        </div>
      </section>

      {previewUrl && (
        <div className="fixed inset-0 z-50 bg-black/60 p-4">
          <div
            className={`mx-auto flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-stone-900 ${
              isExpanded ? "w-full" : "max-w-5xl"
            }`}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-stone-200 px-4 py-3 dark:border-stone-800">
              <div>
                <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                  {previewTitle}
                </h3>

                <p className="text-xs text-stone-500 dark:text-stone-400">
                  PDF Document
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setIsExpanded((value) => !value)
                  }
                  className="rounded-lg border border-stone-300 px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
                >
                  {isExpanded ? "Restore" : "Expand"}
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-lg border border-stone-300 px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 bg-stone-100 dark:bg-stone-950">
              <iframe
                src={previewUrl}
                title={previewTitle}
                className="h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}