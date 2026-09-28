import Achievement from "../../models/Achievement.js";
import UserAchievement from "../../models/UserAchievement.js";
import GameResult from "../../models/GameResult.js";

const defaultAchievements = [
  {
    key: "first-game",
    title: "First Step",
    description: "Complete your first cognitive challenge.",
    subtext: "Completed 1st Challenge",
    icon: "🏅",
    badgeColor: "#38bdf8"
  },
  {
    key: "quest-starter",
    title: "Quest Starter",
    description: "Complete five cognitive challenges.",
    subtext: "5 Challenges Finished",
    icon: "⚡",
    badgeColor: "#f59e0b"
  },
  {
    key: "focus-master",
    title: "Focus Master",
    description: "Score 90% or higher in Focus Game.",
    subtext: "Score 90% in Focus Game",
    icon: "👁️",
    badgeColor: "#38bdf8"
  },
  {
    key: "quick-thinker",
    title: "Quick Thinker",
    description: "Achieve a reaction time under 300ms or 90%+ score.",
    subtext: "Reaction time < 0.3s",
    icon: "⚡",
    badgeColor: "#f59e0b"
  },
  {
    key: "memory-pro",
    title: "Memory Pro",
    description: "Score 85% or higher in Memory Game.",
    subtext: "Score 85% in Memory Game",
    icon: "🧠",
    badgeColor: "#a855f7"
  },
  {
    key: "logic-wizard",
    title: "Logic Wizard",
    description: "Score 90% or higher in Pattern Recognition.",
    subtext: "Score 90% in Pattern Game",
    icon: "🧩",
    badgeColor: "#c084fc"
  },
  {
    key: "decisive-mind",
    title: "Decisive Mind",
    description: "Score 90% or higher in Decision Game.",
    subtext: "Score 90% in Decision Game",
    icon: "🎯",
    badgeColor: "#ef4444"
  },
  {
    key: "grand-master",
    title: "Grand Master",
    description: "Complete challenges in all 5 cognitive skill categories.",
    subtext: "Mastered All 5 Skills",
    icon: "👑",
    badgeColor: "#10b981"
  }
];

export async function seedAchievements() {
  for (const def of defaultAchievements) {
    await Achievement.updateOne(
      { key: def.key },
      { $set: def },
      { upsert: true }
    );
  }
}

export async function evaluateAchievements(userId, analysis) {
  await seedAchievements();

  // Find user's game results to check detailed conditions like reaction time
  const results = await GameResult.find({ userId });
  const hasReactionFast = results.some(r => r.game === "reaction" && (r.timeMs > 0 && r.timeMs <= 300 || r.score >= 90));
  const distinctGames = new Set(results.map(r => r.game));

  const conditions = {
    "first-game": analysis.totalGames >= 1,
    "quest-starter": analysis.totalGames >= 5,
    "focus-master": (analysis.skillScores.focus || 0) >= 90,
    "quick-thinker": hasReactionFast || (analysis.skillScores.reaction || 0) >= 90,
    "memory-pro": (analysis.skillScores.memory || 0) >= 85,
    "logic-wizard": (analysis.skillScores.logic || 0) >= 90,
    "decisive-mind": (analysis.skillScores.decision || 0) >= 90,
    "grand-master": distinctGames.size >= 5
  };

  const newlyEarned = [];

  for (const def of defaultAchievements) {
    if (conditions[def.key]) {
      const achDoc = await Achievement.findOne({ key: def.key });
      if (achDoc) {
        const existing = await UserAchievement.findOne({ userId, achievementId: achDoc._id });
        if (!existing) {
          await UserAchievement.create({
            userId,
            achievementId: achDoc._id,
            awardedAt: new Date()
          });
          newlyEarned.push(def);
        }
      }
    }
  }

  return newlyEarned;
}

export async function getUserAchievements(userId) {
  await seedAchievements();

  const all = await Achievement.find().lean();
  const userAchs = await UserAchievement.find({ userId }).lean();
  const earnedMap = new Map(userAchs.map(ua => [ua.achievementId.toString(), ua.awardedAt]));

  return all.map(a => ({
    ...a,
    earned: earnedMap.has(a._id.toString()),
    awardedAt: earnedMap.get(a._id.toString()) || null
  }));
}
