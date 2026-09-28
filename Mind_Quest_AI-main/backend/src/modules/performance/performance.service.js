import GameResult from "../../models/GameResult.js";
import SkillScore from "../../models/SkillScore.js";
import User from "../../models/User.js";
import GameProgress from "../../models/GameProgress.js";

const gameMap = {
  focus: "focus",
  memory: "memory",
  reaction: "reaction",
  pattern: "logic",
  decision: "decision"
};

const skillLabels = {
  focus: "Focus",
  memory: "Memory",
  reaction: "Reaction",
  logic: "Logic",
  decision: "Decision"
};

const SKILLS = ["focus", "memory", "reaction", "logic", "decision"];

function clampScore(value) {
  return Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
}

function calculateSkillScore(attempts) {
  const recent = attempts.slice(-5);
  const latestScore = clampScore(recent[recent.length - 1].score);
  const recentAverage = recent.reduce((sum, result) => sum + clampScore(result.score), 0) / recent.length;
  return {
    latestScore,
    recentAverage: Math.round(recentAverage),
    skillScore: clampScore(latestScore * 0.6 + recentAverage * 0.4)
  };
}

export function getTierLabel(score) {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "High";
  if (score >= 70) return "Very Good";
  if (score >= 60) return "Good";
  if (score > 0) return "Keep Practicing";
  return "Not Played";
}

export function getOverallTier(score) {
  if (score >= 90) return "Excellent!";
  if (score >= 80) return "Very Good!";
  if (score >= 65) return "Good!";
  if (score > 0) return "Keep Practicing!";
  return "Ready to Start";
}

export async function analyzeUser(userId) {
  const results = await GameResult.find({ userId }).sort({ createdAt: 1 });
  const gameProgress = await GameProgress.find({ userId }).lean();
  
  const bySkill = {
    focus: [],
    memory: [],
    reaction: [],
    logic: [],
    decision: []
  };

  let totalPlayTimeMs = 0;
  let totalScoreSum = 0;

  for (const r of results) {
    const skill = gameMap[r.game];
    if (skill && bySkill[skill]) {
      bySkill[skill].push(r);
    }
    totalPlayTimeMs += Number(r.timeMs) || 0;
    totalScoreSum += Number(r.score) || 0;
  }

  const skills = SKILLS;
  const skillScores = {};
  const latestScores = {};
  const recentAverages = {};
  const scoreHistory = {};
  const skillStatus = {};

  for (const skill of skills) {
    const list = bySkill[skill];
    if (list.length > 0) {
      const calculated = calculateSkillScore(list);
      latestScores[skill] = calculated.latestScore;
      recentAverages[skill] = calculated.recentAverage;
      scoreHistory[skill] = list.map(result => ({
        id: result._id,
        score: clampScore(result.score),
        accuracy: clampScore(result.accuracy),
        level: result.level,
        createdAt: result.createdAt
      }));
      skillScores[skill] = calculated.skillScore;
      skillStatus[skill] = getTierLabel(skillScores[skill]);
    } else {
      skillScores[skill] = 0;
      latestScores[skill] = null;
      recentAverages[skill] = null;
      scoreHistory[skill] = [];
      skillStatus[skill] = "Not Played";
    }
  }

  // Calculate overall score ONLY from played skills
  const playedSkills = skills.filter(s => bySkill[s].length > 0);
  const overall = playedSkills.length > 0
    ? Math.round(playedSkills.reduce((sum, s) => sum + skillScores[s], 0) / playedSkills.length)
    : 0;

  // Classify strong and weak skills
  const playedSorted = [...playedSkills].sort((a, b) => skillScores[b] - skillScores[a]);
  const strongSkills = playedSorted.filter(s => skillScores[s] >= 80);
  const weakSkills = [...playedSorted].reverse().filter(s => skillScores[s] < 85);

  // Dynamic recommendations
  const recommendationTemplates = {
    focus: {
      low: "Practice short distraction-free rounds and improve target accuracy under time pressure.",
      high: "Outstanding focus! Try increasing target movement speed and higher difficulty levels."
    },
    memory: {
      low: "Try chunking objects into memorable pairs and recalling them sequentially.",
      high: "Exceptional short-term recall. Challenge yourself with larger item sets."
    },
    reaction: {
      low: "Practice quick visual-response rounds and maintain anticipation before the green signal.",
      high: "Lightning-fast reaction speed! Work on consistent millisecond response times."
    },
    logic: {
      low: "Practice pattern and sequence recognition across varied geometric and mathematical sets.",
      high: "Great deductive reasoning. Maintain accuracy on complex multi-step patterns."
    },
    decision: {
      low: "Carefully weigh risk and consequence before committing to options under time limits.",
      high: "Decisive and analytical problem solving in high-stress cognitive scenarios."
    }
  };

  const suggestions = skills.map(skill => {
    const score = skillScores[skill];
    const isPlayed = bySkill[skill].length > 0;
    const text = !isPlayed
      ? `Play the ${skillLabels[skill]} challenge to evaluate your baseline cognitive performance.`
      : score >= 85
        ? recommendationTemplates[skill].high
        : recommendationTemplates[skill].low;

    return {
      skill,
      label: skillLabels[skill],
      score,
      text,
      tier: skillStatus[skill]
    };
  });

  // Keep the optional account level separate from each game's persisted level.
  const challengesCount = results.length;
  const userLevel = Math.max(1, Math.min(10, 1 + Math.floor(challengesCount / 3) + (overall >= 85 ? 1 : 0)));

  // Persist aggregate scores to SkillScore collection
  await SkillScore.findOneAndUpdate(
    { userId },
    {
      userId,
      focus: skillScores.focus,
      memory: skillScores.memory,
      reaction: skillScores.reaction,
      logic: skillScores.logic,
      decision: skillScores.decision,
      overall,
      gamesPlayedCount: challengesCount,
      updatedAt: new Date()
    },
    { upsert: true, new: true }
  );

  // Update User level and play time
  await User.findByIdAndUpdate(userId, {
    level: userLevel,
    totalPlayTimeMs
  });

  return {
    skillScores,
    skillStatus,
    overall,
    overallTier: getOverallTier(overall),
    totalGames: challengesCount,
    totalPlayTimeMs,
    averageScore: challengesCount ? Math.round(totalScoreSum / challengesCount) : 0,
    strongSkills,
    weakSkills,
    suggestions,
    userLevel,
    results: results.slice(-10).reverse(),
    latestScores,
    recentAverages,
    scoreHistory,
    gameProgress
  };
}
