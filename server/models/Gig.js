import { model, Schema } from "mongoose";

const gigSchema = new Schema({
  title: String,
  description: String,
  budget: Number,
  postedBy: { type: Schema.Types.ObjectId, ref: "User" },
  applicants: [
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    message: String,
    createdAt: Date,
  }
],
}, { timestamps: true });

const Gig=model("Gig", gigSchema);
export default Gig
