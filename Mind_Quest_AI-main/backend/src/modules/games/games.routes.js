import { Router } from "express";
import GameSession from "../../models/GameSession.js";
import GameProgress from "../../models/GameProgress.js";
import { requireAuth } from "../../middleware/auth.js";
import { regenerateChallenge } from "./challenge.service.js";

const router = Router();
const allowed = ["focus", "memory", "reaction", "pattern", "decision"];

router.post("/start", requireAuth, async (req, res) => {
  const { game } = req.body;
  if (!allowed.includes(game)) return res.status(400).json({ message: "Unsupported game." });
  const progress = await GameProgress.findOneAndUpdate(
    { userId: req.user.id, game },
    { $setOnInsert: { userId: req.user.id, game } },
    { upsert: true, new: true }
  );
  const challenge = regenerateChallenge(game, progress.level, progress.recentChallengeIds || []);
  const session = await GameSession.create({
    userId: req.user.id,
    game,
    level: progress.level,
    challengeId: challenge.id,
    challenge
  });
  res.status(201).json({
    sessionId: session._id,
    game,
    level: progress.level,
    challenge,
    bestScore: progress.bestScore || 0
  });
});

router.get("/high-scores", requireAuth, async (req, res) => {
  try {
    const progressDocs = await GameProgress.find({ userId: req.user.id }).lean();
    const highScores = { focus: 0, memory: 0, reaction: 0, pattern: 0, decision: 0 };
    progressDocs.forEach(p => {
      if (p.game && allowed.includes(p.game)) {
        highScores[p.game] = p.bestScore || 0;
      }
    });
    res.json(highScores);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch high scores." });
  }
});

export default router;
