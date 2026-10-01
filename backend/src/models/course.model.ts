import mongoose, { Model, Schema, Types } from "mongoose";

export interface ICourseSpecializedArea {
  subjectName: string;
  syllabusCode: string;
}

export interface ICourseSubject {
  subjectName: string;
  syllabusCode: string;
  isElective: boolean;
  specializedArea?: ICourseSpecializedArea;
}

export interface ICourseSemester {
  semesterNumber: number;
  subjects: ICourseSubject[];
}

export interface ICourseOverview {
  introduction: string;
  objectives: string[];
  careerOpportunities: string[];
}

export interface ICourseFeeStructureFile {
  public_id: string;
  url: string;
  resourceType: "image" | "raw";
  format: string;
}

export interface ICourseSemesterFee {
  semesterNumber: number;
  amount: number;
}

export interface ICourse {
  _id: Types.ObjectId;

  program: Types.ObjectId;

  duration: string;

  totalSemesters: number;

  overview: ICourseOverview;

  highlights: string[];

  semesters: ICourseSemester[];

  feeStructureFile: ICourseFeeStructureFile;

  semesterFees: ICourseSemesterFee[];

  totalFee: number;

  createdAt: Date;
  updatedAt: Date;
}

/*
|--------------------------------------------------------------------------
| Specialized Area Schema
|--------------------------------------------------------------------------
*/

const specializedAreaSchema =
  new Schema<ICourseSpecializedArea>(
    {
      subjectName: {
        type: String,
        required: [
          true,
          "Specialized area subject name is required",
        ],
        trim: true,
        maxlength: [
          150,
          "Specialized area subject name cannot exceed 150 characters",
        ],
      },

      syllabusCode: {
        type: String,
        required: [
          true,
          "Specialized area syllabus code is required",
        ],
        trim: true,
        uppercase: true,
        maxlength: [
          50,
          "Specialized area syllabus code cannot exceed 50 characters",
        ],
      },
    },
    {
      _id: false,
    }
  );

/*
|--------------------------------------------------------------------------
| Subject Schema
|--------------------------------------------------------------------------
*/

const courseSubjectSchema =
  new Schema<ICourseSubject>(
    {
      subjectName: {
        type: String,
        required: [true, "Subject name is required"],
        trim: true,
        maxlength: [
          150,
          "Subject name cannot exceed 150 characters",
        ],
      },

      syllabusCode: {
        type: String,
        required: [true, "Syllabus code is required"],
        trim: true,
        uppercase: true,
        maxlength: [
          50,
          "Syllabus code cannot exceed 50 characters",
        ],
      },

      isElective: {
        type: Boolean,
        default: false,
      },

      specializedArea: {
        type: specializedAreaSchema,
        default: undefined,
      },
    },
    {
      _id: false,
    }
  );

/*
|--------------------------------------------------------------------------
| Semester Schema
|--------------------------------------------------------------------------
*/

const courseSemesterSchema =
  new Schema<ICourseSemester>(
    {
      semesterNumber: {
        type: Number,
        required: [true, "Semester number is required"],
        min: [1, "Semester number must be at least 1"],
      },

      subjects: {
        type: [courseSubjectSchema],
        required: true,

        validate: {
          validator: (subjects: ICourseSubject[]) =>
            subjects.length > 0,

          message:
            "Each semester must contain at least one subject",
        },
      },
    },
    {
      _id: false,
    }
  );

/*
|--------------------------------------------------------------------------
| Overview Schema
|--------------------------------------------------------------------------
*/

const courseOverviewSchema =
  new Schema<ICourseOverview>(
    {
      introduction: {
        type: String,
        required: [true, "Course introduction is required"],
        trim: true,
      },

      objectives: {
        type: [String],
        default: [],
      },

      careerOpportunities: {
        type: [String],
        default: [],
      },
    },
    {
      _id: false,
    }
  );

/*
|--------------------------------------------------------------------------
| Fee Structure File Schema
|--------------------------------------------------------------------------
*/

const courseFeeStructureFileSchema =
  new Schema<ICourseFeeStructureFile>(
    {
      public_id: {
        type: String,
        required: [
          true,
          "Fee structure file public ID is required",
        ],
      },

      url: {
        type: String,
        required: [
          true,
          "Fee structure file URL is required",
        ],
      },

      resourceType: {
        type: String,
        enum: ["image", "raw"],
        required: true,
      },

      format: {
        type: String,
        required: [true, "File format is required"],
        lowercase: true,
      },
    },
    {
      _id: false,
    }
  );

/*
|--------------------------------------------------------------------------
| Semester Fee Schema
|--------------------------------------------------------------------------
*/

const courseSemesterFeeSchema =
  new Schema<ICourseSemesterFee>(
    {
      semesterNumber: {
        type: Number,
        required: [true, "Semester number is required"],
        min: [1, "Semester number must be at least 1"],
      },

      amount: {
        type: Number,
        required: [true, "Semester fee is required"],
        min: [0, "Semester fee cannot be negative"],
      },
    },
    {
      _id: false,
    }
  );

/*
|--------------------------------------------------------------------------
| Course Schema
|--------------------------------------------------------------------------
*/

const courseSchema = new Schema<ICourse>(
  {
    /*
    |--------------------------------------------------------------------------
    | Program
    |--------------------------------------------------------------------------
    */

    program: {
      type: Schema.Types.ObjectId,
      ref: "Program",
      required: [true, "Program is required"],
    },

    /*
    |--------------------------------------------------------------------------
    | Course Information
    |--------------------------------------------------------------------------
    */

    duration: {
      type: String,
      required: [true, "Course duration is required"],
      trim: true,
      maxlength: [
        50,
        "Course duration cannot exceed 50 characters",
      ],
    },

    totalSemesters: {
      type: Number,
      required: [true, "Total semesters is required"],
      min: [1, "Total semesters must be at least 1"],
      max: [20, "Total semesters cannot exceed 20"],
    },

    /*
    |--------------------------------------------------------------------------
    | Overview
    |--------------------------------------------------------------------------
    */

    overview: {
      type: courseOverviewSchema,
      required: true,
    },

    /*
    |--------------------------------------------------------------------------
    | Highlights
    |--------------------------------------------------------------------------
    */

    highlights: {
      type: [String],
      default: [],

      validate: {
        validator: (highlights: string[]) =>
          highlights.length <= 5,

        message:
          "A course can have a maximum of 5 highlights",
      },
    },

    /*
    |--------------------------------------------------------------------------
    | Semesters
    |--------------------------------------------------------------------------
    */

    semesters: {
      type: [courseSemesterSchema],
      required: true,

      validate: {
        validator: (semesters: ICourseSemester[]) =>
          semesters.length > 0,

        message: "At least one semester is required",
      },
    },

    /*
    |--------------------------------------------------------------------------
    | Fee Structure File
    |--------------------------------------------------------------------------
    */

    feeStructureFile: {
      type: courseFeeStructureFileSchema,
      required: [
        true,
        "Fee structure file is required",
      ],
    },

    /*
    |--------------------------------------------------------------------------
    | Semester Fees
    |--------------------------------------------------------------------------
    */

    semesterFees: {
      type: [courseSemesterFeeSchema],
      required: true,

      validate: {
        validator: (fees: ICourseSemesterFee[]) =>
          fees.length > 0,

        message: "At least one semester fee is required",
      },
    },

    /*
    |--------------------------------------------------------------------------
    | Total Fee
    |--------------------------------------------------------------------------
    */

    totalFee: {
      type: Number,
      required: true,
      min: [0, "Total fee cannot be negative"],
      default: 0,
    },
  },

  {
    timestamps: true,
  }
);

/*
|--------------------------------------------------------------------------
| Validate Semester Count
|--------------------------------------------------------------------------
*/

courseSchema.pre("validate", function () {
  if (this.semesters.length !== this.totalSemesters) {
    this.invalidate(
      "semesters",
      `Expected ${this.totalSemesters} semesters but received ${this.semesters.length}`
    );
  }

  if (this.semesterFees.length !== this.totalSemesters) {
    this.invalidate(
      "semesterFees",
      `Expected ${this.totalSemesters} semester fees but received ${this.semesterFees.length}`
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Validate Semester Numbers
  |--------------------------------------------------------------------------
  */

  const semesterNumbers = this.semesters.map(
    (semester) => semester.semesterNumber
  );

  const expectedSemesterNumbers = Array.from(
    { length: this.totalSemesters },
    (_, index) => index + 1
  );

  const semestersAreValid =
    semesterNumbers.length ===
      expectedSemesterNumbers.length &&
    semesterNumbers.every(
      (number, index) =>
        number === expectedSemesterNumbers[index]
    );

  if (!semestersAreValid) {
    this.invalidate(
      "semesters",
      "Semester numbers must be sequential starting from 1"
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Validate Semester Fee Numbers
  |--------------------------------------------------------------------------
  */

  const feeSemesterNumbers = this.semesterFees.map(
    (fee) => fee.semesterNumber
  );

  const feesAreValid =
    feeSemesterNumbers.length ===
      expectedSemesterNumbers.length &&
    feeSemesterNumbers.every(
      (number, index) =>
        number === expectedSemesterNumbers[index]
    );

  if (!feesAreValid) {
    this.invalidate(
      "semesterFees",
      "Semester fee numbers must be sequential starting from 1"
    );
  }
});

/*
|--------------------------------------------------------------------------
| Automatically Calculate Total Fee
|--------------------------------------------------------------------------
*/

courseSchema.pre("save", function () {
  this.totalFee = this.semesterFees.reduce(
    (total, semesterFee) =>
      total + semesterFee.amount,
    0
  );
});

/*
|--------------------------------------------------------------------------
| Indexes
|--------------------------------------------------------------------------
*/

/*
 * One course belongs to one program.
 */
courseSchema.index(
  { program: 1 },
  { unique: true }
);

const CourseModel: Model<ICourse> =
  mongoose.model<ICourse>("Course", courseSchema);

export default CourseModel;