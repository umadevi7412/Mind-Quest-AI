import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log("Starting MindQuest AI Full Stack...");

const backend = spawn("node", ["--watch", "src/server.js"], {
  cwd: path.join(__dirname, "backend"),
  stdio: "inherit",
  shell: true
});

backend.on("error", (err) => console.error("Backend failed:", err));
backend.on("exit", (code) => console.log(`Backend process exited with code ${code}`));

const frontend = spawn("npm.cmd", ["run", "dev"], {
  cwd: path.join(__dirname, "frontend"),
  stdio: "inherit",
  shell: true
});

frontend.on("error", (err) => console.error("Frontend failed:", err));
frontend.on("exit", (code) => console.log(`Frontend process exited with code ${code}`));

const cleanExit = () => {
  try { backend.kill(); } catch (_) {}
  try { frontend.kill(); } catch (_) {}
  process.exit();
};

process.on("SIGINT", cleanExit);
process.on("SIGTERM", cleanExit);
process.on("exit", cleanExit);
