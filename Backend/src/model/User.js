import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password
  role: { type: String, enum: ["worker", "customer"], default: "customer" }
}, { timestamps: true });

export const UserModel = mongoose.model("User", userSchema);
export default UserModel;
