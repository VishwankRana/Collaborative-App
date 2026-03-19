import mongoose from "mongoose";

const collaboratorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["editor", "viewer"],
      required: true,
    },
  },
  {
    _id: false,
  }
);

const documentSchema = new mongoose.Schema(
  {
    docId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    collaborators: {
      type: [collaboratorSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Document =
  mongoose.models.Document || mongoose.model("Document", documentSchema);

export default Document;
