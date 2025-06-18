// const mongoose = require("mongoose");
import mongoose from "mongoose";

// Define the schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartData: { type: Object, default: {} },
});

// Ensure the model is not redefined
const userModel = (mongoose.models && mongoose.models.User) || mongoose.model("User", userSchema);

export default userModel;



// const mongoose = require("mongoose");

// // Define the schema
// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   cartData: { type: Object, default: {} },
// });

// // Ensure the model is not redefined
// // const userModel = mongoose.models.User || mongoose.model("User", userSchema);
// const userModel = (mongoose.models && mongoose.models.User) || mongoose.model("User", userSchema);

// export default userModel;

