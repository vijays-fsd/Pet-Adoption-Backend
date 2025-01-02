import mongoose from "mongoose";

const connectDB = async (URI) => {
  try {
    await mongoose.connect(URI);
    console.log("DB was connected successfully");
  } catch (error) {
    console.error(`ERROR ${error.message}`);
    process.exit(1);
  }
};
export default connectDB;
