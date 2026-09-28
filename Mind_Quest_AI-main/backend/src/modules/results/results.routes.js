import { Router } from "express";
import GameResult from "../../models/GameResult.js";
import GameSession from "../../models/GameSession.js";
import GameProgress from "../../models/GameProgress.js";
import { requireAuth } from "../../middleware/auth.js";
import { analyzeUser } from "../performance/performance.service.js";
import { evaluateAchievements } from "../achievements/achievement.service.js";

const router = Router();

function xpForScore(score) {
  if (score >= 95) return 100;
  if (score >= 85) return 80;
  if (score >= 70) return 60;
  if (score >= 50) return 40;
  return 20;
}

function xpToNextLevel(level) {
  return 100 + ((Math.max(1, level) - 1) * 50);
}

async function handleGameResult(req, res) {
  try {
    const { game, sessionId, challengeId, score, accuracy, timeMs, metrics, level } = req.body;

    const allowedGames = ["focus", "memory", "reaction", "pattern", "decision"];
    if (!game || !allowedGames.includes(game.toLowerCase())) {
      return res.status(400).json({ message: "Valid game type is required." });
    }

    const numScore = Number(score);
    if (!Number.isFinite(numScore) || numScore < 0 || numScore > 100) {
      return res.status(400).json({ message: "Score must be a number between 0 and 100." });
    }

    if (!sessionId) return res.status(400).json({ message: "An active game session is required." });
    const session = await GameSession.findOne({ _id: sessionId, userId: req.user.id, game: game.toLowerCase(), status: "active" });
    if (!session || (challengeId && challengeId !== session.challengeId)) {
      return res.status(400).json({ message: "The game session is invalid or expired." });
    }

    const progress = await GameProgress.findOne({ userId: req.user.id, game: game.toLowerCase() });
    const resultLevel = session.level || progress?.level || Number(level) || 1;

    const cleanResult = await GameResult.create({
      userId: req.user.id,
      game: game.toLowerCase(),
      sessionId: sessionId || null,
      challengeId: session.challengeId,
      level: resultLevel,
      score: Math.round(numScore),
      accuracy: Math.max(0, Math.min(100, Math.round(Number(accuracy) || 0))),
      timeMs: Math.max(0, Math.round(Number(timeMs) || 0)),
      metrics: metrics || {}
    });

    await GameSession.findByIdAndUpdate(sessionId, { status: "completed", completedAt: new Date() });

    const currentProgress = progress || new GameProgress({ userId: req.user.id, game: game.toLowerCase() });
    const previousPlays = currentProgress.totalPlays || 0;
    const nextPlays = previousPlays + 1;
    let nextLevel = currentProgress.level || 1;
    let nextXp = (currentProgress.xp || 0) + xpForScore(numScore);
    while (nextLevel < 10 && nextXp >= xpToNextLevel(nextLevel)) {
      nextXp -= xpToNextLevel(nextLevel);
      nextLevel += 1;
    }
    const recent = [...(currentProgress.recentChallengeIds || []), session.challengeId].slice(-30);
    const previousBest = currentProgress.bestScore || 0;
    const roundedScore = Math.round(numScore);
    const isNewHighScore = roundedScore > previousBest;
    const newBest = Math.max(previousBest, roundedScore);

    currentProgress.level = nextLevel;
    currentProgress.xp = nextXp;
    currentProgress.totalPlays = nextPlays;
    currentProgress.bestScore = newBest;
    currentProgress.averageScore = Math.round((((currentProgress.averageScore || 0) * previousPlays) + numScore) / nextPlays);
    currentProgress.recentChallengeIds = recent;
    currentProgress.lastPlayedAt = new Date();
    await currentProgress.save();

    const analysis = await analyzeUser(req.user.id);
    const achievements = await evaluateAchievements(req.user.id, analysis);

    res.status(201).json({
      result: cleanResult,
      progress: currentProgress,
      analysis,
      achievements,
      isNewHighScore,
      previousBest,
      bestScore: newBest
    });
  } catch (e) {
    console.error("Game result submission error:", e);
    res.status(500).json({ message: e.message || "Failed to process game result." });
  }
}

// Support both /api/result and /api/game/result
router.post("/result", requireAuth, handleGameResult);
router.post("/game/result", requireAuth, handleGameResult);

router.get("/results", requireAuth, async (req, res) => {
  try {
    const results = await GameResult.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();
    res.json(results);
  } catch (e) {
    res.status(500).json({ message: e.message || "Failed to fetch results." });
  }
});

export default router;
