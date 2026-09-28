import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { analyzeUser } from "./performance.service.js";

const router = Router();
router.get("/dashboard", requireAuth, async (req,res) => {
  try { res.json(await analyzeUser(req.user.id)); }
  catch (e) { res.status(500).json({ message: e.message }); }
});
export default router;
