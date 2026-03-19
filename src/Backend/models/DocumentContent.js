import mongoose from "mongoose";

const documentContentSchema = new mongoose.Schema(
  {
    docId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    yjsState: {
      type: Buffer,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const DocumentContent =
  mongoose.models.DocumentContent ||
  mongoose.model("DocumentContent", documentContentSchema);

export default DocumentContent;
