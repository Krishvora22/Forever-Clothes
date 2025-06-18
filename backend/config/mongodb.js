import mongoose from "mongoose";

const connectDB = async () => { 
  try {
    const connect = await mongoose.connect(`${process.env.MONGODB_URL}/e-commerce`);
    console.log(`MongoDB connected`);
  } 
  catch(error) {
    console.error(`ERROR in MongoDB connection : ${error.message}`);
  } 
};

export default connectDB;  
