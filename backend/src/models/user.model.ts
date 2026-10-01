import mongoose, {
  Schema,
  Model,
  Document,
  Types,
} from "mongoose";

import bcrypt from "bcryptjs";

const emailRegexPattern =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * IUser - no JWT methods here.
 *
 * All token operations live in utils/jwt.utils.ts.
 *
 * _id is Types.ObjectId.
 * Use user._id.toString() for a string ID.
 */
export interface IUser extends Document {
  _id: Types.ObjectId;

  firstName: string;
  middleName?: string;
  lastName: string;

  email: string;
  password?: string;

  avatar: {
    public_id: string;
    url: string;
  };

  role: "user" | "admin" | "superadmin";
  status: "active" | "deactivated";

  isVerified: boolean;

  authProvider: "local" | "google";
  googleId?: string;
  providerLinked: boolean;

  courses: Array<{
    courseId: string;
  }>;

  lastLogin?: Date;

  createdAt: Date;
  updatedAt: Date;

  comparePassword(
    password: string
  ): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
      trim: true,
    },

    middleName: {
      type: String,
      trim: true,
      default: "",
    },

    lastName: {
      type: String,
      required: [true, "Please enter your last name"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (v: string) =>
          emailRegexPattern.test(v),
        message: "Please enter a valid email",
      },
    },

    password: {
      type: String,
      minlength: [
        6,
        "Password must be at least 6 characters",
      ],
      select: false,
    },

    avatar: {
      public_id: {
        type: String,
        default: "",
      },

      url: {
        type: String,
        default: "",
      },
    },

    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },

    status: {
      type: String,
      enum: ["active", "deactivated"],
      default: "active",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    googleId: {
      type: String,
    },

    providerLinked: {
      type: Boolean,
      default: false,
    },

    courses: [
      {
        courseId: String,
      },
    ],

    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) {
    return;
  }

  this.password = await bcrypt.hash(
    this.password,
    12
  );
});

userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  if (!this.password) {
    return false;
  }

  return bcrypt.compare(
    enteredPassword,
    this.password
  );
};

userSchema.index({ role: 1 });
userSchema.index({ status: 1 });

const UserModel: Model<IUser> =
  mongoose.model<IUser>("User", userSchema);

export default UserModel;