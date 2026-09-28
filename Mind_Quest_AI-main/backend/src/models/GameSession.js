import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  game: { type: String, required: true },
  level: { type: Number, default: 1 },
  challengeId: { type: String, required: true },
  challenge: { type: mongoose.Schema.Types.Mixed, required: true },
  startedAt: { type: Date, default: Date.now },
  completedAt: Date,
  status: { type: String, enum: ["active", "completed"], default: "active" }
});

export default mongoose.model("GameSession", schema);
