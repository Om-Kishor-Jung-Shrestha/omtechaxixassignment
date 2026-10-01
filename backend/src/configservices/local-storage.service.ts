// import fs from "node:fs/promises";
// import path from "node:path";

// const STORAGE_ROOT =
//   "/var/lib/college-admission-management-system/files";

// export type ApplicationDocumentField =
//   | "citizenship"
//   | "cover"
//   | "characterCertificate"
//   | "document"
//   | "marksheet12";

// export async function ensureLocalStorage(): Promise<void> {
//   await fs.mkdir(
//     path.join(STORAGE_ROOT, "applications"),
//     {
//       recursive: true,
//     }
//   );
// }

// export function getApplicationDirectory(
//   applicationId: string
// ): string {
//   return path.join(
//     STORAGE_ROOT,
//     "applications",
//     applicationId
//   );
// }

// export function getApplicationDocumentDirectory(
//   applicationId: string,
//   field: ApplicationDocumentField
// ): string {
//   return path.join(
//     getApplicationDirectory(applicationId),
//     field
//   );
// }

// export async function saveApplicationPdf(
//   applicationId: string,
//   field: ApplicationDocumentField,
//   buffer: Buffer
// ): Promise<{
//   path: string;
//   url: string;
// }> {
//   const directory =
//     getApplicationDocumentDirectory(
//       applicationId,
//       field
//     );

//   await fs.mkdir(directory, {
//     recursive: true,
//   });

//   const filename = `${field}.pdf`;

//   const filePath = path.join(
//     directory,
//     filename
//   );

//   await fs.writeFile(filePath, buffer);

//   return {
//     path: filePath,
//     url: `/api/v1/applications/${applicationId}/files/${field}`,
//   };
// }

// export async function deleteLocalFile(
//   filePath: string
// ): Promise<void> {
//   try {
//     await fs.unlink(filePath);
//   } catch (error: unknown) {
//     if (
//       error instanceof Error &&
//       "code" in error &&
//       error.code === "ENOENT"
//     ) {
//       return;
//     }

//     throw error;
//   }
// }

// export async function deleteApplicationFiles(
//   applicationId: string
// ): Promise<void> {
//   const directory =
//     getApplicationDirectory(applicationId);

//   await fs.rm(directory, {
//     recursive: true,
//     force: true,
//   });
// }

// export function getStorageRoot(): string {
//   return STORAGE_ROOT;
// }
import fs from "node:fs/promises";
import path from "node:path";

const STORAGE_ROOT = "/opt/appdatas";

export type ApplicationDocumentField =
  | "citizenship"
  | "cover"
  | "characterCertificate"
  | "document"
  | "marksheet12";

export async function ensureLocalStorage(): Promise<void> {
  await fs.mkdir(
    path.join(STORAGE_ROOT, "applications"),
    {
      recursive: true,
    },
  );
}

export function getApplicationDirectory(
  applicationId: string,
): string {
  return path.join(
    STORAGE_ROOT,
    "applications",
    applicationId,
  );
}

export function getApplicationDocumentDirectory(
  applicationId: string,
  field: ApplicationDocumentField,
): string {
  return path.join(
    getApplicationDirectory(applicationId),
    field,
  );
}

export async function saveApplicationPdf(
  applicationId: string,
  field: ApplicationDocumentField,
  buffer: Buffer,
): Promise<{
  path: string;
  url: string;
}> {
  const directory =
    getApplicationDocumentDirectory(
      applicationId,
      field,
    );

  await fs.mkdir(directory, {
    recursive: true,
  });

  const filename = `${field}.pdf`;

  const filePath = path.join(
    directory,
    filename,
  );

  await fs.writeFile(filePath, buffer);

  return {
    path: filePath,
    url: `/api/v1/applications/${applicationId}/files/${field}`,
  };
}

export async function deleteLocalFile(
  filePath: string,
): Promise<void> {
  try {
    await fs.unlink(filePath);
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return;
    }

    throw error;
  }
}

export async function deleteApplicationFiles(
  applicationId: string,
): Promise<void> {
  const directory =
    getApplicationDirectory(applicationId);

  await fs.rm(directory, {
    recursive: true,
    force: true,
  });
}

export function getStorageRoot(): string {
  return STORAGE_ROOT;
}