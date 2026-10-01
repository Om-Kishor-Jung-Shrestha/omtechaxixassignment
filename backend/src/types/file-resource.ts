export type FileStorage =
  | "cloudinary"
  | "local";

export type FileResourceType =
  | "image"
  | "raw";

export interface FileResource {
  storage: FileStorage;
  public_id: string;
  url: string;
  path?: string;
  resourceType: FileResourceType;
  format: string;
}