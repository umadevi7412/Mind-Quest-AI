import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  game: { type: String, required: true },
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: "GameSession" },
  challengeId: { type: String },
  level: { type: Number, default: 1 },
  score: { type: Number, required: true },
  accuracy: { type: Number, default: 0 },
  timeMs: { type: Number, default: 0 },
  metrics: { type: mongoose.Schema.Types.Mixed, default: {} },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("GameResult", schema);
