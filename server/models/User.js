import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["client", "freelancer"] },
  bio: String,
  skills: [String],
  avatarUrl: String,
});

const User = model("User", userSchema);
export default User