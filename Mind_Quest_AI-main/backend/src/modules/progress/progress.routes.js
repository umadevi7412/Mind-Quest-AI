import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import GameResult from "../../models/GameResult.js";
import GameProgress from "../../models/GameProgress.js";

const router = Router();

router.get("/", requireAuth, async (req, res) => {
  try {
    const results = await GameResult.find({ userId: req.user.id })
      .sort({ createdAt: 1 })
      .limit(100)
      .lean();

    if (!results.length) {
      return res.json([]);
    }

    // Format data points for LineChart
    const dataPoints = results.map((r, idx) => {
      const d = new Date(r.createdAt);
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const dateLabel = `${monthNames[d.getMonth()]} ${d.getDate()}`;
      const timeLabel = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      return {
        id: r._id,
        attempt: idx + 1,
        date: dateLabel,
        time: timeLabel,
        displayLabel: results.length > 5 ? dateLabel : `#${idx + 1} (${dateLabel})`,
        game: r.game,
        score: r.score,
        accuracy: r.accuracy,
        timeMs: r.timeMs
      };
    });

    res.json(dataPoints);
  } catch (e) {
    res.status(500).json({ message: e.message || "Failed to fetch progress timeline." });
  }
});

router.get("/levels", requireAuth, async (req, res) => {
  const progress = await GameProgress.find({ userId: req.user.id }).lean();
  res.json(progress);
});

export default router;
