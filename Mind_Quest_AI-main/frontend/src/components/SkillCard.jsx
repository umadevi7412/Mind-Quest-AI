import { Eye, Brain, Zap, Puzzle, Target } from "lucide-react";

const skillConfig = {
  focus: {
    label: "Focus",
    icon: Eye,
    colorClass: "card-focus",
    accentColor: "#38bdf8"
  },
  memory: {
    label: "Memory",
    icon: Brain,
    colorClass: "card-memory",
    accentColor: "#10b981"
  },
  reaction: {
    label: "Reaction",
    icon: Zap,
    colorClass: "card-reaction",
    accentColor: "#f59e0b"
  },
  logic: {
    label: "Logic",
    icon: Puzzle,
    colorClass: "card-logic",
    accentColor: "#c084fc"
  },
  decision: {
    label: "Decision",
    icon: Target,
    colorClass: "card-decision",
    accentColor: "#ef4444"
  }
};

function getStatusBadge(score) {
  if (score >= 85) return { text: "High", className: "badge-high" };
  if (score >= 70) return { text: "Very Good", className: "badge-good" };
  if (score >= 50) return { text: "Average", className: "badge-mid" };
  if (score > 0) return { text: "Needs Work", className: "badge-low" };
  return { text: "Not Played", className: "badge-none" };
}

export default function SkillCard({ skill, score = 0, level = 1, bestScore = null }) {
  const config = skillConfig[skill?.toLowerCase()] || skillConfig.focus;
  const IconComponent = config.icon;
  const badge = getStatusBadge(score);
  const highest = bestScore !== null && bestScore !== undefined ? bestScore : score;

  return (
    <div className={`skill-card-neo ${config.colorClass}`}>
      <div className="skill-card-top">
        <span className="skill-card-title">{config.label}</span>
      </div>

      <div className="skill-card-body">
        <div className="skill-card-left">
          <div className="skill-card-percentage">{score}%</div>
          <span style={{ color: config.accentColor, fontSize: "0.7rem" }}>Skill Score</span>
          <span className={`skill-card-pill ${badge.className}`}>{badge.text}</span>
          <div className="skill-card-level-row">
            <span className="skill-card-level-tag">Lvl {level}</span>
            <span className="skill-card-best-tag" title="Persistent Highest Score">★ Best {highest}</span>
          </div>
        </div>

        <div className="skill-card-right">
          <div className="skill-card-icon-wrap" style={{ color: config.accentColor }}>
            <IconComponent size={28} />
          </div>
        </div>
      </div>
    </div>
  );
}
