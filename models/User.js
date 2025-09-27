import mongoose from "mongoose";
import { hashPassword, comparePassword } from "../utils/password.js";
import { createJWT } from "../utils/jwt-token.js";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  machineId: {
    type: String,
    ref: "Machine",
  },
  role: {
    type: String,
    enum: ["superadmin", "admin"],
    default: "admin",
  },
});

UserSchema.pre("save", async function () {
  const hashedPassword = await hashPassword(this.password);
  this.password = hashedPassword;
});

UserSchema.methods.Compare = async function (candidatePassword)
{
  const passwordValidation = await comparePassword(candidatePassword, this.password);
  return passwordValidation;
};

UserSchema.methods.CreateToken =  function ()
{
  return createJWT({userId:this._id,role:this.role})
}
UserSchema.methods.toJSON = function ()
{
  var obj = this.toObject();
  delete obj.password;
  return obj;
};
export default mongoose.model("User", UserSchema);
