import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js";

const port = process.env.PORT || 5000;
connectDB()
  .then(() => app.listen(port, () => console.log(`MindQuest API running on http://localhost:${port}`)))
  .catch(err => { console.error("Database startup failed:", err.message); process.exit(1); });
