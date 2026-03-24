import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb+srv://vishwankrana2005_db_user:E7OR0kO7GJuMOEr@collabsphere-prod.6nx7dfl.mongodb.net/?appName=collabsphere-prod";

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
