import mongoose, {
  Document,
  Model,
  Schema,
  Types,
} from "mongoose";

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
  | "cloudinary"
  | "local";

export type ApplicationFileResourceType =
  | "image"
  | "raw";

export interface IApplicationFile {
  storage: ApplicationFileStorage;
  public_id: string;
  url: string;
  path?: string;
  resourceType: ApplicationFileResourceType;
  format: string;
}

export interface IAcademicHistory {
  collegeOrSchool: string;
  board: HigherEducationBoard;
  gradeOrGpa: string;
}

export interface IApplication extends Document {
  _id: Types.ObjectId;

  firstName: string;
  middleName?: string;
  lastName: string;

  email: string;
  phone: string;

  program: Types.ObjectId;

  admissionSession: string;
  admissionIntake: ApplicationIntake;

  academicQualification: string;

  academicHistory: IAcademicHistory;

  address: string;

  status: ApplicationStatus;

  documents: {
    citizenship: IApplicationFile;
    cover: IApplicationFile;
    characterCertificate: IApplicationFile;
    document: IApplicationFile;
    marksheet12: IApplicationFile;
  };

  applicantImage: IApplicationFile;

  createdBy?: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

const applicationFileSchema =
  new Schema<IApplicationFile>(
    {
      storage: {
        type: String,
        enum: ["cloudinary", "local"],
        required: true,
      },

      public_id: {
        type: String,
        default: "",
      },

      url: {
        type: String,
        required: true,
      },

      path: {
        type: String,
        default: "",
      },

      resourceType: {
        type: String,
        enum: ["image", "raw"],
        required: true,
      },

      format: {
        type: String,
        required: true,
      },
    },
    {
      _id: false,
    }
  );

const academicHistorySchema =
  new Schema<IAcademicHistory>(
    {
      collegeOrSchool: {
        type: String,
        required: [
          true,
          "College or school name is required",
        ],
        trim: true,
      },

      board: {
        type: String,
        enum: HIGHER_EDUCATION_BOARDS,
        required: [
          true,
          "Higher education board is required",
        ],
      },

      gradeOrGpa: {
        type: String,
        required: [
          true,
          "Grade or GPA is required",
        ],
        trim: true,
      },
    },
    {
      _id: false,
    }
  );

const applicationSchema =
  new Schema<IApplication>(
    {
      firstName: {
        type: String,
        required: [
          true,
          "First name is required",
        ],
        trim: true,
      },

      middleName: {
        type: String,
        trim: true,
        default: "",
      },

      lastName: {
        type: String,
        required: [
          true,
          "Last name is required",
        ],
        trim: true,
      },

      email: {
        type: String,
        required: [
          true,
          "Email is required",
        ],
        lowercase: true,
        trim: true,
      },

      phone: {
        type: String,
        required: [
          true,
          "Phone number is required",
        ],
        trim: true,
      },

      program: {
        type: Schema.Types.ObjectId,
        ref: "Program",
        required: [
          true,
          "Program is required",
        ],
      },

      admissionSession: {
        type: String,
        required: [
          true,
          "Admission session is required",
        ],
        trim: true,
      },

      admissionIntake: {
        type: String,
        enum: APPLICATION_INTAKES,
        required: [
          true,
          "Admission intake is required",
        ],
      },

      academicQualification: {
        type: String,
        required: [
          true,
          "Academic qualification is required",
        ],
        trim: true,
      },

      academicHistory: {
        type: academicHistorySchema,
        required: true,
      },

      address: {
        type: String,
        required: [
          true,
          "Address is required",
        ],
        trim: true,
      },

      status: {
        type: String,
        enum: APPLICATION_STATUSES,
        default: "pending",
      },

      documents: {
        citizenship: {
          type: applicationFileSchema,
          required: true,
        },

        cover: {
          type: applicationFileSchema,
          required: true,
        },

        characterCertificate: {
          type: applicationFileSchema,
          required: true,
        },

        document: {
          type: applicationFileSchema,
          required: true,
        },

        marksheet12: {
          type: applicationFileSchema,
          required: true,
        },
      },

      applicantImage: {
        type: applicationFileSchema,
        required: true,
      },

      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },

    {
      timestamps: true,
    }
  );

applicationSchema.index({
  program: 1,
});

applicationSchema.index({
  status: 1,
});

applicationSchema.index({
  admissionSession: 1,
});

applicationSchema.index({
  admissionIntake: 1,
});

applicationSchema.index({
  email: 1,
});

applicationSchema.index({
  phone: 1,
});

applicationSchema.index({
  createdAt: -1,
});

applicationSchema.index({
  program: 1,
  admissionSession: 1,
  admissionIntake: 1,
});

const ApplicationModel: Model<IApplication> =
  mongoose.model<IApplication>(
    "Application",
    applicationSchema
  );

export default ApplicationModel;