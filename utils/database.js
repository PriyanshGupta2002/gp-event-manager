import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);
  
  if (isConnected) {
    console.log("Already connected to the database.");
    return;
  }
  
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    isConnected = false;
    // Optionally, you can throw the error to handle it in the calling code
    // throw error;
  }
};
