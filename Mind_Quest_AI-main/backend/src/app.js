import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import gameRoutes from "./modules/games/games.routes.js";
import resultRoutes from "./modules/results/results.routes.js";
import performanceRoutes from "./modules/performance/performance.routes.js";
import achievementRoutes from "./modules/achievements/achievements.routes.js";
import progressRoutes from "./modules/progress/progress.routes.js";

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL?.split(",") || true }));
app.use(express.json());

app.get("/api/health", (_,res)=>res.json({ ok:true, service:"MindQuest API" }));
app.use("/api", authRoutes);
app.use("/api/game", gameRoutes);
app.use("/api", resultRoutes);
app.use("/api", performanceRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/progress", progressRoutes);

app.use((err,req,res,next)=> {
  console.error(err);
  res.status(500).json({ message:"Internal server error" });
});

export default app;
