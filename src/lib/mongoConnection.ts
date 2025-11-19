import mongoose, { Mongoose } from "mongoose";

export async function connectDB(): Promise<Mongoose | undefined> {
  const MONGO_URI: string = process.env.MONGO_DB_CONNECTION_STRING as string;

  try {
    if (!MONGO_URI) {
      throw new Error();
    }

    if (mongoose.connection.readyState >= 1) {
      // connected | connecting | disconnecting
      return;
    }
    const connection = await mongoose.connect(MONGO_URI);
    return connection;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Failed to establish database connection!");
  }
}
