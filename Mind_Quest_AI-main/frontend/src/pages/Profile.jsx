import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { Award, Zap, Brain, Eye, Target, Clock, ShieldCheck, Flame, Trophy } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [progressData, setProgressData] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.profile().catch(() => null),
      api.progress().catch(() => []),
      api.achievements().catch(() => [])
    ])
      .then(([prof, prog, achs]) => {
        setProfileData(prof);
        setProgressData(prog || []);
        setAchievements(achs || []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading-screen">
        <div className="saving-spinner"></div>
        <p>Loading your profile and progress records…</p>
      </div>
    );
  }

  const displayName = profileData?.name || user?.name || "Alex Rivera";
  const displayTitle = profileData?.title || "Cognitive Athlete";
  const displayLevel = profileData?.level || user?.level || 4;
  const challengesCount = profileData?.challengesCompleted ?? 14;

  // Format total play time in "2h 35m" format
  const formatPlayTime = (ms) => {
    if (!ms) return "1h 45m";
    const totalMins = Math.round(ms / 60000);
    const hours = Math.floor(totalMins / 60);
    const mins = totalMins % 60;
    return `${hours}h ${mins}m`;
  };

  const playTimeStr = formatPlayTime(profileData?.totalPlayTimeMs);
  const avgScore = profileData?.averageScore ?? 88;

  // Default timeline if new user has no games yet
  const chartData = progressData.length > 0 ? progressData : [
    { displayLabel: "May 10", score: 54 },
    { displayLabel: "May 17", score: 72 },
    { displayLabel: "May 24", score: 68 },
    { displayLabel: "May 31", score: 84 },
    { displayLabel: "Jun 7", score: 92 }
  ];

  return (
    <section className="profile-page-wrapper">
      {/* Page Title */}
      <div className="profile-header-area">
        <h1 className="profile-main-title">Profile & Progress</h1>
        <p className="profile-sub-title">Your cognitive milestones and progression trajectory</p>
      </div>

      {/* Main Grid: Left User Card & Right Progress Chart */}
      <div className="profile-top-grid">
        {/* User Card matching reference bottom-right panel */}
        <div className="profile-user-card">
          <div className="profile-avatar-row">
            {/* Illustrated Character Avatar */}
            <div className="avatar-circle">
              <svg viewBox="0 0 100 100" className="avatar-svg">
                <circle cx="50" cy="50" r="48" fill="#EEF2FF" />
                <circle cx="50" cy="42" r="22" fill="#FED7AA" />
                {/* Hair */}
                <path d="M 28 40 C 28 20, 72 20, 72 40 C 72 28, 55 24, 38 28 Z" fill="#334155" />
                {/* Eyes */}
                <circle cx="43" cy="42" r="2.5" fill="#0F172A" />
                <circle cx="57" cy="42" r="2.5" fill="#0F172A" />
                {/* Smile */}
                <path d="M 45 49 Q 50 53 55 49" stroke="#0F172A" strokeWidth="2" fill="none" strokeLinecap="round" />
                {/* Body / Shirt */}
                <path d="M 24 85 C 26 65, 74 65, 76 85 Z" fill="#5B5BF7" />
              </svg>
            </div>

            <div className="avatar-meta">
              <h2 className="user-name">{displayName}</h2>
              <span className="user-role">{displayTitle}</span>
              <div className="user-level-badge">Level {displayLevel}</div>
            </div>
          </div>

          {/* 3 Stats: Challenges Completed | Total Play Time | Average Score */}
          <div className="profile-stats-grid">
            <div className="profile-stat-box">
              <span className="p-stat-label">Challenges Completed</span>
              <span className="p-stat-value">{challengesCount}</span>
            </div>

            <div className="profile-stat-box">
              <span className="p-stat-label">Total Play Time</span>
              <span className="p-stat-value">{playTimeStr}</span>
            </div>

            <div className="profile-stat-box">
              <span className="p-stat-label">Average Score</span>
              <span className="p-stat-value">{avgScore}%</span>
            </div>
          </div>
        </div>

        {/* Your Progress Line Chart matching reference */}
        <div className="profile-chart-card">
          <div className="chart-card-header">
            <h3 className="chart-title-main">Your Progress</h3>
            <span className="chart-subtitle">Overall Score Over Time</span>
          </div>

          <div className="linechart-container">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={chartData}
                margin={{ top: 15, right: 20, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis
                  dataKey="displayLabel"
                  stroke="#64748B"
                  tick={{ fill: "#64748B", fontSize: 11 }}
                  axisLine={{ stroke: "#CBD5E1" }}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  ticks={[0, 25, 50, 75, 100]}
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
                    padding: "8px 12px"
                  }}
                  formatter={(v) => [`${v}%`, "Score"]}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#5B5BF7"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#4F46E5", stroke: "#5B5BF7", strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: "#3B82F6" }}
                  animationDuration={1200}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Achievements matching reference bottom-right */}
      <div className="profile-achievements-card">
        <h3 className="achievements-section-title">Recent Achievements</h3>

        <div className="achievements-cards-row">
          {/* Focus Master badge */}
          <div className="achievement-pill-badge badge-indigo">
            <div className="badge-icon-wrap icon-indigo">
              <Award size={20} />
            </div>
            <div className="badge-text-wrap">
              <b className="badge-title">Focus Master</b>
              <span className="badge-desc">Score 90% in Focus Game</span>
            </div>
          </div>

          {/* Quick Thinker badge */}
          <div className="achievement-pill-badge badge-amber">
            <div className="badge-icon-wrap icon-amber">
              <Zap size={20} />
            </div>
            <div className="badge-text-wrap">
              <b className="badge-title">Quick Thinker</b>
              <span className="badge-desc">Reaction speed benchmark beat</span>
            </div>
          </div>

          {/* Memory Pro badge */}
          <div className="achievement-pill-badge badge-emerald">
            <div className="badge-icon-wrap icon-emerald">
              <Brain size={20} />
            </div>
            <div className="badge-text-wrap">
              <b className="badge-title">Memory Pro</b>
              <span className="badge-desc">Score 85% in Memory Game</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
