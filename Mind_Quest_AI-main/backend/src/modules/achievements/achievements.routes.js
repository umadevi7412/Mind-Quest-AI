import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { getUserAchievements } from "./achievement.service.js";

const router = Router();
router.get("/", requireAuth, async (req,res) => {
  try { res.json(await getUserAchievements(req.user.id)); }
  catch(e) { res.status(500).json({ message: e.message }); }
});
export default router;
