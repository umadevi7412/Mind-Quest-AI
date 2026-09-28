export default function TrophyCelebration() {
  // Generate random confetti pieces
  const confettiPieces = [
    { color: "#38bdf8", top: "10%", left: "15%", rot: "25deg", size: "12px", shape: "rect" },
    { color: "#f43f5e", top: "18%", left: "80%", rot: "-35deg", size: "10px", shape: "rect" },
    { color: "#10b981", top: "35%", left: "10%", rot: "45deg", size: "14px", shape: "circle" },
    { color: "#fbbf24", top: "25%", left: "90%", rot: "15deg", size: "11px", shape: "rect" },
    { color: "#a855f7", top: "70%", left: "12%", rot: "-20deg", size: "13px", shape: "rect" },
    { color: "#38bdf8", top: "80%", left: "85%", rot: "30deg", size: "10px", shape: "circle" },
    { color: "#f59e0b", top: "60%", left: "92%", rot: "-45deg", size: "12px", shape: "rect" },
    { color: "#00f2fe", top: "8%", left: "50%", rot: "10deg", size: "8px", shape: "circle" },
    { color: "#ec4899", top: "75%", left: "45%", rot: "-15deg", size: "11px", shape: "rect" }
  ];

  return (
    <div className="trophy-celebration-wrapper">
      {/* Floating Confetti Elements */}
      {confettiPieces.map((p, i) => (
        <div
          key={i}
          className={`confetti-item ${p.shape}`}
          style={{
            backgroundColor: p.color,
            top: p.top,
            left: p.left,
            transform: `rotate(${p.rot})`,
            width: p.size,
            height: p.shape === "rect" ? `${parseInt(p.size) * 1.6}px` : p.size,
            borderRadius: p.shape === "circle" ? "50%" : "2px"
          }}
        />
      ))}

      {/* 3D Glowing Gold Trophy */}
      <svg
        viewBox="0 0 240 260"
        className="trophy-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff2a3" />
            <stop offset="35%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          <linearGradient id="goldShine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          <linearGradient id="baseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#374151" />
            <stop offset="50%" stopColor="#1f2937" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>

          <filter id="trophyGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient Gold Halo */}
        <circle cx="120" cy="110" r="85" fill="#f59e0b" opacity="0.18" filter="url(#trophyGlow)" />

        {/* Left Handle */}
        <path
          d="M 85 70 C 40 70, 35 125, 80 135"
          fill="none"
          stroke="url(#goldGrad)"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Right Handle */}
        <path
          d="M 155 70 C 200 70, 205 125, 160 135"
          fill="none"
          stroke="url(#goldGrad)"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Cup Body */}
        <path
          d="M 75 50 L 165 50 C 165 105, 145 145, 120 150 C 95 145, 75 105, 75 50 Z"
          fill="url(#goldGrad)"
          filter="url(#trophyGlow)"
        />

        {/* Cup Rim Highlight */}
        <ellipse cx="120" cy="50" rx="45" ry="12" fill="url(#goldShine)" />
        <ellipse cx="120" cy="50" rx="40" ry="9" fill="#f59e0b" />

        {/* Embossed Star on Cup */}
        <path
          d="M 120 78 L 124 90 L 136 90 L 126 98 L 130 110 L 120 102 L 110 110 L 114 98 L 104 90 L 116 90 Z"
          fill="#fef9c3"
          opacity="0.9"
        />

        {/* Stem */}
        <rect x="112" y="150" width="16" height="32" rx="3" fill="url(#goldGrad)" />

        {/* Stem connector rings */}
        <ellipse cx="120" cy="152" rx="14" ry="4" fill="url(#goldShine)" />
        <ellipse cx="120" cy="182" rx="18" ry="5" fill="url(#goldShine)" />

        {/* Pedestal Base */}
        <path
          d="M 90 185 L 150 185 L 160 215 L 80 215 Z"
          fill="url(#baseGrad)"
          stroke="#4b5563"
          strokeWidth="1.5"
        />

        {/* Plaque on Base */}
        <rect x="96" y="193" width="48" height="14" rx="2" fill="url(#goldGrad)" />
        <line x1="102" y1="200" x2="138" y2="200" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />

        {/* Shiny Sparkle on rim */}
        <path
          d="M 152 42 L 156 50 L 164 54 L 156 58 L 152 66 L 148 58 L 140 54 L 148 50 Z"
          fill="#ffffff"
          opacity="0.9"
        />
      </svg>
    </div>
  );
}
