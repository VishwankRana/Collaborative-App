import mongoose from "mongoose";

let databaseConnected = false;
let lastDatabaseError = null;

function formatConnectionError(error) {
  const message = error?.message || "Unknown MongoDB connection error.";

  if (
    message.includes("whitelist") ||
    message.includes("ReplicaSetNoPrimary") ||
    message.includes("Could not connect to any servers")
  ) {
    return [
      "Unable to reach MongoDB Atlas.",
      "Check that your current IP is allowed in Atlas Network Access,",
      "that the cluster is running, and that the connection string is correct.",
      `Original error: ${message}`,
    ].join(" ");
  }

  return message;
}

export async function connectDB() {
  try {
    const mongodbUri = process.env.MONGO_URI;

    if (!mongodbUri) {
      throw new Error("MONGO_URI is not set. Add it to your .env file.");
    }

    await mongoose.connect(mongodbUri, {
      serverSelectionTimeoutMS: 10000,
    });
    databaseConnected = true;
    lastDatabaseError = null;
    console.log("MongoDB connected");
  } catch (error) {
    databaseConnected = false;
    lastDatabaseError = formatConnectionError(error);
    console.error("MongoDB connection error:", lastDatabaseError);
    throw new Error(lastDatabaseError);
  }
}

export function isDatabaseConnected() {
  return databaseConnected;
}

export function getDatabaseStatus() {
  return {
    connected: databaseConnected,
    error: lastDatabaseError,
  };
}
