import mongoose from "mongoose";
import { hashPassword, comparePassword } from "../utils/password.js";
import { createJWT } from "../utils/jwt-token.js";

const UserSchema = new mongoose.Schema({
  _id: String,
  model: String,
  aiVersion: String,
  power: Boolean,
  light: Boolean,
  vacuum: Boolean,
});


export default mongoose.model("Machine", UserSchema);