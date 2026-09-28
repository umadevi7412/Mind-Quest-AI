import { Link, useNavigate } from "react-router-dom";
import { Eye, Brain, Zap, Puzzle, Target } from "lucide-react";
import ScoreRing from "../components/ScoreRing";
import TrophyCelebration from "../components/TrophyCelebration";

export default function ResultsSummary({
  skillScores = { focus: 90, memory: 85, reaction: 88, logic: 92, decision: 87 },
  overallScore = 88,
  onPlayAgain
}) {
  const navigate = useNavigate();

  const skillsList = [
    { key: "focus", label: "Focus", icon: Eye, color: "#38bdf8", val: skillScores.focus ?? 0 },
    { key: "memory", label: "Memory", icon: Brain, color: "#10b981", val: skillScores.memory ?? 0 },
    { key: "reaction", label: "Reaction", icon: Zap, color: "#f59e0b", val: skillScores.reaction ?? 0 },
    { key: "logic", label: "Logic", icon: Puzzle, color: "#c084fc", val: skillScores.logic ?? 0 },
    { key: "decision", label: "Decision", icon: Target, color: "#ef4444", val: skillScores.decision ?? 0 }
  ];

  return (
    <div className="results-summary-card">
      {/* 3D Gold Trophy on Left matching reference */}
      <div className="summary-left-trophy">
        <TrophyCelebration />
      </div>

      {/* Main Results Performance on Right matching reference */}
      <div className="summary-right-details">
        <div className="summary-header">
          <h2 className="summary-title">Challenge Completed!</h2>
          <p className="summary-subtitle">Current skill scores from your recent attempts</p>
        </div>

        <div className="summary-center-content">
          {/* 5 Skill Score Rows with Icons & Percentages */}
          <div className="summary-skills-list">
            {skillsList.map((s) => {
              const IconComp = s.icon;
              return (
                <div key={s.key} className="summary-skill-row">
                  <div className="summary-skill-left">
                    <span className="summary-skill-icon" style={{ color: s.color }}>
                      <IconComp size={18} />
                    </span>
                    <span className="summary-skill-name">{s.label}</span>
                  </div>
                  <span className="summary-skill-percentage" style={{ color: s.color }}>
                    {s.val}%
                  </span>
                </div>
              );
            })}
          </div>

          {/* Large Circular Gauge */}
          <div className="summary-score-gauge">
            <ScoreRing score={overallScore} size={150} strokeWidth={11} />
          </div>
        </div>

        {/* Buttons matching reference: View Details & Play Again */}
        <div className="summary-actions-row">
          <button
            type="button"
            className="btn-summary-primary"
            onClick={() => navigate("/dashboard")}
          >
            View Details
          </button>
          <button
            type="button"
            className="btn-summary-outline"
            onClick={onPlayAgain ? onPlayAgain : () => navigate("/games")}
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}
