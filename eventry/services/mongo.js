import mongoose from "mongoose";

export async function dbConnect(params) {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected Mongoose");
    return connection;
  } catch (error) {
    console.log(error);
  }
}
