import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import GameResult from "../../models/GameResult.js";
import { requireAuth } from "../../middleware/auth.js";

const router = Router();

function sign(user) {
  return jwt.sign(
    { id: user._id.toString(), email: user.email },
    process.env.JWT_SECRET || "mindquest_super_secret_jwt_key_2026_gamified",
    { expiresIn: "7d" }
  );
}

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name?.trim() || !email?.trim() || !password || password.length < 6) {
      return res.status(400).json({ message: "Name, valid email and password (at least 6 characters) are required." });
    }

    const cleanEmail = email.trim().toLowerCase();
    const exists = await User.findOne({ email: cleanEmail });
    if (exists) {
      return res.status(409).json({ message: "This email address is already registered." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name.trim(),
      email: cleanEmail,
      passwordHash,
      title: "Brain Explorer",
      level: 1
    });

    res.status(201).json({
      token: sign(user),
      user: {
        id: user._id,
        _id: user._id,
        name: user.name,
        email: user.email,
        level: user.level,
        title: user.title
      }
    });
  } catch (e) {
    console.error("Register error:", e);
    res.status(500).json({ message: e.message || "Failed to register account." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: cleanEmail });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    res.json({
      token: sign(user),
      user: {
        id: user._id,
        _id: user._id,
        name: user.name,
        email: user.email,
        level: user.level,
        title: user.title || "Brain Explorer"
      }
    });
  } catch (e) {
    console.error("Login error:", e);
    res.status(500).json({ message: e.message || "Failed to log in." });
  }
});

router.get("/profile", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash").lean();
    if (!user) return res.status(404).json({ message: "User not found." });

    const results = await GameResult.find({ userId: req.user.id }).lean();
    const totalPlayTimeMs = results.reduce((acc, curr) => acc + (curr.timeMs || 0), 0);
    const avgScore = results.length ? Math.round(results.reduce((acc, curr) => acc + curr.score, 0) / results.length) : 0;
    const computedLevel = Math.max(1, Math.min(10, 1 + Math.floor(results.length / 3) + (avgScore >= 85 ? 1 : 0)));

    res.json({
      ...user,
      id: user._id,
      level: computedLevel,
      title: user.title || "Brain Explorer",
      challengesCompleted: results.length,
      totalPlayTimeMs,
      averageScore: avgScore
    });
  } catch (e) {
    res.status(500).json({ message: e.message || "Failed to load profile." });
  }
});

export default router;
