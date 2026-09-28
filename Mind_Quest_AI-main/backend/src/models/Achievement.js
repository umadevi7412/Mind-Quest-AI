import mongoose from "mongoose";

const schema = new mongoose.Schema({
  key: { type: String, unique: true },
  title: String,
  description: String,
  icon: String,
  subtext: String,
  badgeColor: String
});

export default mongoose.model("Achievement", schema);
