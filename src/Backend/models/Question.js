import mongoose from "mongoose";

const exampleSchema = new mongoose.Schema(
  {
    input: { type: String, required: true },
    output: { type: String, required: true },
    explanation: { type: String, default: "" },
  },
  { _id: false }
);

const parameterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      javascript: { type: String, default: "" },
      python: { type: String, default: "" },
      java: { type: String, default: "" },
      cpp: { type: String, default: "" },
    },
  },
  { _id: false }
);

const testCaseSchema = new mongoose.Schema(
  {
    input: { type: String, default: "" },
    expectedOutput: { type: String, default: "" },
    args: { type: mongoose.Schema.Types.Mixed, default: null },
    expected: { type: mongoose.Schema.Types.Mixed, default: null },
    isHidden: { type: Boolean, default: false },
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
  tags: [{ type: String }],
  description: { type: String, required: true },
  examples: [exampleSchema],
  constraints: [{ type: String }],
  functionName: { type: String, default: "" },
  className: { type: String, default: "Solution" },
  functionNames: {
    javascript: { type: String, default: "" },
    python: { type: String, default: "" },
    java: { type: String, default: "" },
    cpp: { type: String, default: "" },
  },
  returnType: {
    javascript: { type: String, default: "" },
    python: { type: String, default: "" },
    java: { type: String, default: "" },
    cpp: { type: String, default: "" },
  },
  parameters: [parameterSchema],
  starterCode: {
    javascript: { type: String, default: "" },
    python: { type: String, default: "" },
    java: { type: String, default: "" },
    cpp: { type: String, default: "" },
  },
  testCases: [testCaseSchema],
  source: { type: String, enum: ["seed", "custom"], default: "custom" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  usageCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

questionSchema.index({ title: "text", description: "text" });
questionSchema.index({ difficulty: 1 });
questionSchema.index({ tags: 1 });
questionSchema.index({ source: 1 });

const Question = mongoose.models.Question || mongoose.model("Question", questionSchema);

export default Question;
