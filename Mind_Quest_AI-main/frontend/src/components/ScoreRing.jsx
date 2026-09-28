export default function ScoreRing({ score = 0, label = "Overall Score", size = 180, strokeWidth = 14 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedScore = Math.max(0, Math.min(100, Math.round(score)));
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;

  const getTier = (s) => {
    if (s >= 90) return { text: "Excellent!", color: "#10b981" };
    if (s >= 80) return { text: "Very Good!", color: "#5b5bf7" };
    if (s >= 65) return { text: "Good!", color: "#f59e0b" };
    if (s > 0) return { text: "Keep Practicing!", color: "#ec4899" };
    return { text: "Ready to Play", color: "#94a3b8" };
  };

  const tier = getTier(clampedScore);

  return (
    <div className="score-ring-container" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="score-ring-svg">
        <defs>
          <linearGradient id="scoreRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5b5bf7" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>

          <filter id="ringGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background Track Ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
        />

        {/* Progress Arc Ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#scoreRingGrad)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          filter="url(#ringGlow)"
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
      </svg>

      {/* Centered Content */}
      <div className="score-ring-content">
        <span className="score-ring-label">{label}</span>
        <div className="score-ring-number-row">
          <span className="score-ring-val">{clampedScore}</span>
          <span className="score-ring-denom">/100</span>
        </div>
        <span className="score-ring-tier" style={{ color: tier.color }}>
          {tier.text}
        </span>
      </div>
    </div>
  );
}
