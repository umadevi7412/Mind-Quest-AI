import { useEffect, useState } from "react";
import { api } from "../api";
import { Eye, Brain, Zap, Puzzle, Target, Calendar, Clock, Award } from "lucide-react";

const GAME_ICONS = {
  focus: Eye,
  memory: Brain,
  reaction: Zap,
  pattern: Puzzle,
  logic: Puzzle,
  decision: Target
};

const GAME_COLORS = {
  focus: "#4F46E5",
  memory: "#10B981",
  reaction: "#F59E0B",
  pattern: "#8B5CF6",
  logic: "#8B5CF6",
  decision: "#EF4444"
};

export default function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    api.results()
      .then(res => setResults(res || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === "all"
    ? results
    : results.filter(r => r.game?.toLowerCase() === filter);

  return (
    <section className="results-history-page">
      <div className="results-header-row">
        <div>
          <h1 className="results-main-title">Challenge History</h1>
          <p className="results-sub-title">Detailed records of your cognitive performance</p>
        </div>

        {/* Filter buttons */}
        <div className="filter-pills-row">
          {["all", "focus", "memory", "reaction", "pattern", "decision"].map(f => (
            <button
              key={f}
              type="button"
              className={`filter-pill ${filter === f ? "filter-active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f[0].toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="results-table-card">
        <div className="results-table-header">
          <span>Game</span>
          <span>Score</span>
          <span>Accuracy</span>
          <span>Duration</span>
          <span>Date</span>
        </div>

        {loading ? (
          <div className="table-loading-row">
            <div className="saving-spinner"></div>
            <span>Loading past attempts…</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="table-empty-state">
            <p>No completed challenges recorded yet.</p>
            <small>Play any game or take the full challenge to build your history.</small>
          </div>
        ) : (
          filtered.map((item) => {
            const gameKey = item.game?.toLowerCase();
            const Icon = GAME_ICONS[gameKey] || Eye;
            const color = GAME_COLORS[gameKey] || "#4F46E5";
            const dateStr = item.createdAt
              ? new Date(item.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
              : "Just now";

            return (
              <div key={item._id || `${item.game}-${item.createdAt}`} className="results-table-row">
                <div className="table-game-col">
                  <div className="table-game-icon" style={{ color, backgroundColor: `${color}14` }}>
                    <Icon size={18} />
                  </div>
                  <div className="table-game-text">
                    <span className="game-name">{item.game ? item.game[0].toUpperCase() + item.game.slice(1) : "Skill"}</span>
                    <span className="game-level">Lvl {item.level || 1}</span>
                  </div>
                </div>

                <div className="table-score-col">
                  <span className="table-score-val" style={{ color }}>{item.score}%</span>
                </div>

                <div className="table-acc-col">
                  <span className="table-acc-val">{item.accuracy || 0}%</span>
                </div>

                <div className="table-time-col">
                  <span>{item.timeMs ? `${(item.timeMs / 1000).toFixed(1)}s` : "—"}</span>
                </div>

                <div className="table-date-col">
                  <span>{dateStr}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
