import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import SkillCard from "../components/SkillCard";
import ScoreRing from "../components/ScoreRing";
import BrainLineArt from "../components/BrainLineArt";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid
} from "recharts";
import { Sparkles, ArrowRight, Play } from "lucide-react";

const SKILL_COLORS = {
  Focus: "#4F46E5",
  Memory: "#10B981",
  Reaction: "#F59E0B",
  Logic: "#8B5CF6",
  Decision: "#EF4444"
};

const SKILL_BORDER_CLASSES = {
  Focus: "summary-pill-focus",
  Memory: "summary-pill-memory",
  Reaction: "summary-pill-reaction",
  Logic: "summary-pill-logic",
  Decision: "summary-pill-decision"
};

// Custom top label for BarChart bars
const renderCustomBarLabel = ({ x, y, width, value }) => {
  if (value === undefined || value === null) return null;
  return (
    <text
      x={x + width / 2}
      y={y - 8}
      fill="#1E293B"
      textAnchor="middle"
      fontSize={12}
      fontWeight={600}
    >
      {value}%
    </text>
  );
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    api.dashboard()
      .then(d => setData(d))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading-screen">
        <div className="saving-spinner"></div>
        <p>Loading your brain performance dashboard…</p>
      </div>
    );
  }

  // Robust skill scores mapping supporting both logic and pattern keys
  const scores = {
    focus: data?.skillScores?.focus || 0,
    memory: data?.skillScores?.memory || 0,
    reaction: data?.skillScores?.reaction || 0,
    logic: data?.skillScores?.logic ?? data?.skillScores?.pattern ?? 0,
    decision: data?.skillScores?.decision || 0
  };
  const overall = data?.overall || 0;
  const progressByGame = Object.fromEntries((data?.gameProgress || []).map(item => [item.game, item]));

  // Bar chart data formatted for Recharts
  const barChartData = [
    { name: "Focus", score: scores.focus || 0 },
    { name: "Memory", score: scores.memory || 0 },
    { name: "Reaction", score: scores.reaction || 0 },
    { name: "Logic", score: scores.logic || 0 },
    { name: "Decision", score: scores.decision || 0 }
  ];

  return (
    <section className="dashboard-wrapper">
      {/* Dashboard Page Header matching reference */}
      <div className="dashboard-header-area">
        <div>
          <h1 className="dashboard-main-title">Your Performance Dashboard</h1>
          <p className="dashboard-sub-title">Here is your overall brain performance</p>
        </div>

        <button
          type="button"
          className="btn-play-all-glow btn-header-challenge"
          onClick={() => navigate("/challenge")}
        >
          <Sparkles size={16} />
          <span>Play Challenge</span>
        </button>
      </div>

      {/* 5 Skill Cards in a row across the top matching reference */}
      <div className="dashboard-skills-row">
        <SkillCard skill="focus" score={scores.focus} level={progressByGame.focus?.level || 1} bestScore={progressByGame.focus?.bestScore} />
        <SkillCard skill="memory" score={scores.memory} level={progressByGame.memory?.level || 1} bestScore={progressByGame.memory?.bestScore} />
        <SkillCard skill="reaction" score={scores.reaction} level={progressByGame.reaction?.level || 1} bestScore={progressByGame.reaction?.bestScore} />
        <SkillCard skill="logic" score={scores.logic} level={progressByGame.pattern?.level || 1} bestScore={progressByGame.pattern?.bestScore} />
        <SkillCard skill="decision" score={scores.decision} level={progressByGame.decision?.level || 1} bestScore={progressByGame.decision?.bestScore} />
      </div>

      {/* Middle Row: Overall Score Ring & Performance Summary */}
      <div className="dashboard-middle-grid">
        {/* Overall Score Circular Ring Card */}
        <div className="dashboard-card score-ring-panel">
          <ScoreRing score={overall} size={190} strokeWidth={14} />
        </div>

        {/* Performance Summary Card matching reference with brain line-art */}
        <div className="dashboard-card performance-summary-panel">
          <div className="summary-text-col">
            <h3 className="summary-panel-title">Performance Summary</h3>
            <p className="summary-lead-text">
              {overall >= 85
                ? "Great job! You have a strong and balanced brain performance across tested skills."
                : overall >= 60
                ? "Good baseline cognitive performance. Keep targeting your lowest domains."
                : "Complete challenges to evaluate and strengthen your cognitive abilities."}
            </p>
            <p className="summary-sub-text">
              Keep practicing daily to enhance neural plasticity and reaction speed!
            </p>

            <button
              type="button"
              className="btn-summary-primary btn-summary-play"
              onClick={() => navigate("/challenge")}
            >
              <Play size={15} />
              <span>Play Again</span>
            </button>
          </div>

          {/* Brain Line Art on Right */}
          <div className="summary-brain-col">
            <BrainLineArt size={135} />
          </div>
        </div>
      </div>

      {/* Bottom Section: DETAILED PERFORMANCE (Skill Performance Comparison) */}
      <div className="dashboard-detailed-performance-card">
        <div className="detailed-card-header">
          <h3 className="detailed-chart-title">Skill Performance Comparison</h3>
        </div>

        {/* Recharts Bar Chart matching reference image */}
        <div className="barchart-container">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={barChartData}
              margin={{ top: 25, right: 20, left: -15, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="#64748B"
                tick={{ fill: "#475569", fontSize: 13, fontWeight: 500 }}
                axisLine={{ stroke: "#CBD5E1" }}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                tickFormatter={(v) => `${v}%`}
                stroke="#64748B"
                tick={{ fill: "#64748B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#E2E8F0",
                  borderRadius: "10px",
                  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.08)",
                  color: "#0F172A",
                  padding: "10px 14px",
                  fontWeight: 500
                }}
                formatter={(val) => [`${val}%`, "Skill Score"]}
              />
              <Bar
                dataKey="score"
                radius={[6, 6, 0, 0]}
                label={renderCustomBarLabel}
                animationDuration={1000}
              >
                {barChartData.map((entry) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={SKILL_COLORS[entry.name] || "#4F46E5"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 5 Summary Stat Badges below the chart matching reference bottom-center */}
        <div className="detailed-summary-pills-row">
          {barChartData.map((item) => {
            const color = SKILL_COLORS[item.name];
            const skillKey = item.name === "Logic" ? "logic" : item.name.toLowerCase();
            const tier = data?.skillStatus?.[skillKey] || (item.score > 0 ? (item.score >= 80 ? "High" : "Average") : "Not Played");
            const borderClass = SKILL_BORDER_CLASSES[item.name];

            return (
              <div key={item.name} className={`detailed-pill-card ${borderClass}`}>
                <span className="pill-skill-name" style={{ color }}>{item.name}</span>
                <span className="pill-score-val">{item.score}%</span>
                <span className="pill-tier-tag" style={{ color }}>{tier}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
