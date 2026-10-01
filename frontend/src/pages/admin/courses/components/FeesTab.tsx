// import type {
//   CourseFeeStructureFileDto,
//   CourseSemesterFeeDto,
// } from "@/features/programs/types/course.types";

// interface FeesTabProps {
//   totalSemesters: number;
//   semesterFees: CourseSemesterFeeDto[];
//   feeStructureFile:
//     | CourseFeeStructureFileDto
//     | null;
//   onSemesterFeeChange: (
//     semesterNumber: number,
//     amount: number,
//   ) => void;
//   onFileSelect: (file: File) => void;
// }

// export function FeesTab({
//   totalSemesters,
//   semesterFees,
//   feeStructureFile,
//   onSemesterFeeChange,
//   onFileSelect,
// }: FeesTabProps) {
//   const totalFee = semesterFees.reduce(
//     (total, fee) => total + fee.amount,
//     0,
//   );

//   return (
//     <section className="space-y-8">
//       <div>
//         <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
//           Fee Structure
//         </h2>
//       </div>

//       <div>
//         <label className="mb-2 block text-sm font-medium">
//           Fee Structure File
//         </label>

//         <label className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 px-6 text-center hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-900 dark:hover:bg-stone-800">
//           <span className="text-3xl">
//             📄
//           </span>

//           <span className="mt-3 text-sm font-medium">
//             Drag & drop fee structure here
//           </span>

//           <span className="mt-1 text-sm text-stone-500">
//             or choose a file
//           </span>

//           <span className="mt-2 text-xs text-stone-400">
//             Supported: Image / PDF
//           </span>

//           <input
//             type="file"
//             accept="image/*,.pdf"
//             className="hidden"
//             onChange={(event) => {
//               const file =
//                 event.target.files?.[0];

//               if (file) {
//                 onFileSelect(file);
//               }
//             }}
//           />
//         </label>

//         {feeStructureFile && (
//           <div className="mt-3 rounded-lg border border-stone-200 p-4 dark:border-stone-700">
//             <p className="text-sm font-medium">
//               {feeStructureFile.format}
//             </p>

//             <a
//               href={feeStructureFile.url}
//               target="_blank"
//               rel="noreferrer"
//               className="mt-1 text-sm text-stone-500 underline"
//             >
//               View file
//             </a>
//           </div>
//         )}
//       </div>

//       <div>
//         <h3 className="mb-3 text-sm font-semibold">
//           Semester Fees
//         </h3>

//         <div className="overflow-hidden rounded-xl border border-stone-200 dark:border-stone-800">
//           <table className="w-full text-left">
//             <thead>
//               <tr className="border-b border-stone-200 bg-stone-50 dark:border-stone-800 dark:bg-stone-900">
//                 <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-500">
//                   Semester
//                 </th>

//                 <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-500">
//                   Fee
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
//               {Array.from(
//                 { length: totalSemesters },
//                 (_, index) => {
//                   const semesterNumber =
//                     index + 1;

//                   const fee =
//                     semesterFees.find(
//                       (item) =>
//                         item.semesterNumber ===
//                         semesterNumber,
//                     )?.amount ?? 0;

//                   return (
//                     <tr key={semesterNumber}>
//                       <td className="px-5 py-4 text-sm">
//                         Semester{" "}
//                         {semesterNumber}
//                       </td>

//                       <td className="px-5 py-4">
//                         <input
//                           type="number"
//                           min={0}
//                           value={fee}
//                           onChange={(event) =>
//                             onSemesterFeeChange(
//                               semesterNumber,
//                               Number(
//                                 event.target
//                                   .value,
//                               ) || 0,
//                             )
//                           }
//                           className="h-10 w-full rounded-lg border border-stone-200 px-3 text-sm dark:border-stone-700 dark:bg-stone-900"
//                         />
//                       </td>
//                     </tr>
//                   );
//                 },
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="flex justify-end">
//         <div>
//           <p className="text-sm text-stone-500">
//             Total Fee
//           </p>

//           <p className="mt-1 text-2xl font-semibold">
//             Rs. {totalFee.toLocaleString()}
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }


import {
  FileText,
  Image as ImageIcon,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";

// import { useUploadCourseFeeStructureMutation } from "@/features/courses/api/course.api";

// import type {
//   CourseFeeStructureFileDto,
//   CourseSemesterFeeDto,
// } from "@/features/courses/types/course.types";
import { useUploadCourseFeeStructureMutation } from "@/features/programs/api/courses.api";
import { CourseFeeStructureFileDto, CourseSemesterFeeDto } from "@/features/programs/types/course.types";


// interface FeesTabProps {
//   totalSemesters: number;
//   semesterFees: CourseSemesterFeeDto[];
//   feeStructureFile?: CourseFeeStructureFileDto;
//   onSemesterFeesChange: (
//     semesterFees: CourseSemesterFeeDto[],
//   ) => void;
//   onFeeStructureFileChange: (
//     file: CourseFeeStructureFileDto | undefined,
//   ) => void;
// }
interface FeesTabProps {
  totalSemesters: number;
  semesterFees: CourseSemesterFeeDto[];
  feeStructureFile: CourseFeeStructureFileDto | null;
  onSemesterFeesChange: (
    semesterFees: CourseSemesterFeeDto[],
  ) => void;
  onFeeStructureFileChange: (
    file: CourseFeeStructureFileDto | null,
  ) => void;
}
export function FeesTab({
  totalSemesters,
  semesterFees,
  feeStructureFile,
  onSemesterFeesChange,
  onFeeStructureFileChange,
}: FeesTabProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);

  const [
    uploadCourseFeeStructure,
    { isLoading: isUploading },
  ] = useUploadCourseFeeStructureMutation();

  const totalFee = semesterFees.reduce(
    (total, semester) => total + (Number(semester.amount) || 0),
    0,
  );

  function handleFeeChange(
    semesterNumber: number,
    value: string,
  ) {
    const amount = value === "" ? 0 : Number(value);

    onSemesterFeesChange(
      semesterFees.map((semester) =>
        semester.semesterNumber === semesterNumber
          ? {
              ...semester,
              amount,
            }
          : semester,
      ),
    );
  }

  async function uploadFile(file: File) {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      window.alert(
        "Please upload a PDF, JPEG, PNG, or WebP file.",
      );
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      window.alert("Fee structure file cannot exceed 10 MB.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploaded =
        await uploadCourseFeeStructure(formData).unwrap();

      onFeeStructureFileChange({
        public_id: uploaded.public_id,
        url: uploaded.url,
        resourceType: uploaded.resourceType,
        format: uploaded.format,
      });
    } catch (error) {
      console.error(
        "Fee structure upload failed:",
        error,
      );

      window.alert(
        "Unable to upload the fee structure. Please try again.",
      );
    }
  }

  function handleFileInputChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (file) {
      void uploadFile(file);
    }

    event.target.value = "";
  }

  function handleDrop(
    event: React.DragEvent<HTMLDivElement>,
  ) {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      void uploadFile(file);
    }
  }

  function handleRemoveFile() {
    onFeeStructureFileChange(null);
  }

  return (
    <div className="space-y-8">
      {/* =====================================================
          FEE STRUCTURE FILE
      ====================================================== */}

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div>
          <h2 className="text-lg font-bold text-stone-900 dark:text-white">
            Fee Structure
          </h2>

          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            Upload the official course fee structure as a PDF
            or image.
          </p>
        </div>

        {!feeStructureFile ? (
          <div
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => {
              if (!isUploading) {
                inputRef.current?.click();
              }
            }}
            className={`mt-6 flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${
              isDragging
                ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20"
                : "border-stone-300 bg-stone-50 hover:border-emerald-400 hover:bg-emerald-50/40 dark:border-stone-700 dark:bg-stone-800/40 dark:hover:border-emerald-500 dark:hover:bg-emerald-950/10"
            }`}
          >
            {isUploading ? (
              <>
                <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />

                <p className="mt-4 text-sm font-semibold text-stone-800 dark:text-stone-200">
                  Uploading fee structure...
                </p>

                <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                  Please wait while the file is uploaded.
                </p>
              </>
            ) : (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm dark:bg-stone-900 dark:text-emerald-400">
                  <Upload className="h-5 w-5" />
                </div>

                <p className="mt-4 text-sm font-semibold text-stone-800 dark:text-stone-200">
                  Drop your fee structure here
                </p>

                <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                  or click to choose a file
                </p>

                <p className="mt-3 text-xs text-stone-400">
                  PDF, JPEG, PNG, or WebP · Maximum 10 MB
                </p>
              </>
            )}

            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleFileInputChange}
              disabled={isUploading}
            />
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-stone-700 dark:bg-stone-800/50">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm dark:bg-stone-900 dark:text-emerald-400">
                {feeStructureFile.resourceType === "image" ? (
                  <ImageIcon className="h-5 w-5" />
                ) : (
                  <FileText className="h-5 w-5" />
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-stone-900 dark:text-white">
                  Fee structure uploaded
                </p>

                <p className="mt-1 text-xs uppercase text-stone-500 dark:text-stone-400">
                  {feeStructureFile.format}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <a
                href={feeStructureFile.url}
                target="_blank"
                rel="noreferrer"
                onClick={(event) =>
                  event.stopPropagation()
                }
                className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800"
              >
                View
              </a>

              <button
                type="button"
                onClick={handleRemoveFile}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:border-red-900/50 dark:bg-stone-900 dark:text-red-400 dark:hover:bg-red-950/20"
              >
                <X className="h-4 w-4" />
                Remove
              </button>
            </div>
          </div>
        )}
      </section>

      {/* =====================================================
          SEMESTER FEES
      ====================================================== */}

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-white">
              Semester Fees
            </h2>

            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              Enter the fee amount for each semester.
            </p>
          </div>

          <div className="rounded-xl bg-emerald-50 px-4 py-2.5 dark:bg-emerald-950/30">
            <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
              Total Course Fee
            </p>

            <p className="mt-0.5 text-lg font-bold text-emerald-800 dark:text-emerald-300">
              NPR {totalFee.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-700">
          <div className="grid grid-cols-[1fr_180px] border-b border-stone-200 bg-stone-50 px-5 py-3 dark:border-stone-700 dark:bg-stone-800/70">
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
              Semester
            </p>

            <p className="text-right text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
              Fee Amount
            </p>
          </div>

          <div className="divide-y divide-stone-200 dark:divide-stone-700">
            {Array.from(
              { length: totalSemesters },
              (_, index) => {
                const semesterNumber = index + 1;

                const semester =
                  semesterFees.find(
                    (item) =>
                      item.semesterNumber ===
                      semesterNumber,
                  );

                const amount = semester?.amount ?? 0;

                return (
                  <div
                    key={semesterNumber}
                    className="grid grid-cols-[1fr_180px] items-center gap-4 px-5 py-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                        Semester {semesterNumber}
                      </p>

                      <p className="mt-0.5 text-xs text-stone-400">
                        Course semester {semesterNumber}
                      </p>
                    </div>

                    <div className="relative">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-stone-400">
                        NPR
                      </span>

                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={amount === 0 ? "" : amount}
                        onChange={(event) =>
                          handleFeeChange(
                            semesterNumber,
                            event.target.value,
                          )
                        }
                        className="w-full rounded-xl border border-stone-200 bg-white py-2.5 pl-14 pr-3 text-right text-sm font-medium text-stone-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 dark:border-stone-700 dark:bg-stone-900 dark:text-white"
                        placeholder="0"
                      />
                    </div>
                  </div>
                );
              },
            )}
          </div>

          <div className="flex items-center justify-between border-t border-stone-200 bg-stone-50 px-5 py-4 dark:border-stone-700 dark:bg-stone-800/70">
            <span className="text-sm font-semibold text-stone-700 dark:text-stone-200">
              Total
            </span>

            <span className="text-lg font-bold text-stone-900 dark:text-white">
              NPR {totalFee.toLocaleString()}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}