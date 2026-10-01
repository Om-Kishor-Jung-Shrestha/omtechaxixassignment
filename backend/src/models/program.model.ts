import mongoose, { Model, Schema, Types } from "mongoose";

export interface IProgram {
  _id: Types.ObjectId;
  mnemonic: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const programSchema = new Schema<IProgram>(
  {
    mnemonic: {
      type: String,
      required: [true, "Program mnemonic is required"],
      trim: true,
      uppercase: true,
      maxlength: [20, "Program mnemonic cannot exceed 20 characters"],
    },

    name: {
      type: String,
      required: [true, "Program name is required"],
      trim: true,
      maxlength: [150, "Program name cannot exceed 150 characters"],
    },
  },
  {
    timestamps: true,
  }
);

programSchema.index({ mnemonic: 1 }, { unique: true });
programSchema.index({ name: 1 }, { unique: true });

const ProgramModel: Model<IProgram> =
  mongoose.model<IProgram>("Program", programSchema);

export default ProgramModel;