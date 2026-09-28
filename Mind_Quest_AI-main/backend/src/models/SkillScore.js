import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  focus: { type: Number, default: 0, min: 0, max: 100 },
  memory: { type: Number, default: 0, min: 0, max: 100 },
  reaction: { type: Number, default: 0, min: 0, max: 100 },
  logic: { type: Number, default: 0, min: 0, max: 100 },
  decision: { type: Number, default: 0, min: 0, max: 100 },
  overall: { type: Number, default: 0, min: 0, max: 100 },
  gamesPlayedCount: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("SkillScore", schema);
