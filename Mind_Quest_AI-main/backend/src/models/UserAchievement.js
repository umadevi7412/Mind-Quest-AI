import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  achievementId: { type: mongoose.Schema.Types.ObjectId, ref: "Achievement", required: true },
  awardedAt: { type: Date, default: Date.now }
});

schema.index({ userId: 1, achievementId: 1 }, { unique: true });

export default mongoose.model("UserAchievement", schema);
