import mongoose from "mongoose";
const connectMongoDB = async () => {
  try {
    console.log("MONGO_URI:", process.env.MONGO_URI); // Add this line to debug
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};

export default connectMongoDB;
