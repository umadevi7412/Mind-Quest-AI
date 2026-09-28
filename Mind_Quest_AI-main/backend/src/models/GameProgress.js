import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  game: { type: String, enum: ["focus", "memory", "reaction", "pattern", "decision"], required: true },
  level: { type: Number, default: 1, min: 1, max: 10 },
  xp: { type: Number, default: 0, min: 0 },
  totalPlays: { type: Number, default: 0 },
  bestScore: { type: Number, default: 0 },
  averageScore: { type: Number, default: 0 },
  recentChallengeIds: { type: [String], default: [] },
  lastPlayedAt: Date
}, { timestamps: true });

schema.index({ userId: 1, game: 1 }, { unique: true });

export default mongoose.model("GameProgress", schema);
