import { Eye, Zap, Target, Puzzle, Brain } from "lucide-react";

export default function BrainHero() {
  return (
    <div className="brain-hero-container">
      {/* Outer Glow & Ambient Lights */}
      <div className="ambient-glow purple-glow"></div>
      <div className="ambient-glow blue-glow"></div>

      {/* Rotating Orbital Rings */}
      <div className="orbit-ring orbit-ring-1"></div>
      <div className="orbit-ring orbit-ring-2"></div>
      <div className="orbit-ring orbit-ring-3"></div>

      {/* 5 Orbiting Skill Nodes matching reference image */}
      <div className="orbit-node node-focus" title="Focus">
        <div className="node-glow"></div>
        <Eye size={20} />
        <span className="node-tooltip">Focus</span>
      </div>

      <div className="orbit-node node-reaction" title="Reaction">
        <div className="node-glow"></div>
        <Zap size={20} />
        <span className="node-tooltip">Reaction</span>
      </div>

      <div className="orbit-node node-decision" title="Decision">
        <div className="node-glow"></div>
        <Target size={20} />
        <span className="node-tooltip">Decision</span>
      </div>

      <div className="orbit-node node-memory" title="Memory">
        <div className="node-glow"></div>
        <Brain size={20} />
        <span className="node-tooltip">Memory</span>
      </div>

      <div className="orbit-node node-logic" title="Logic">
        <div className="node-glow"></div>
        <Puzzle size={20} />
        <span className="node-tooltip">Logic</span>
      </div>

      {/* Center 3D High-Tech Glowing Brain Graphic */}
      <div className="center-brain-svg">
        <svg
          viewBox="0 0 400 340"
          className="neon-brain-graphic"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="35%" stopColor="#6366f1" />
              <stop offset="70%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>

            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <radialGradient id="brainCoreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.25" />
              <stop offset="65%" stopColor="#c084fc" stopOpacity="0.12" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Glowing back aura */}
          <ellipse cx="200" cy="170" rx="140" ry="120" fill="url(#brainCoreGlow)" />

          {/* Left Hemisphere Gyri & Sulci */}
          <g filter="url(#neonGlow)" stroke="url(#brainGrad)" strokeWidth="3.5" fill="none" strokeLinecap="round">
            {/* Outer Silhouette Left */}
            <path d="M 195 70 C 140 68, 80 100, 75 160 C 70 210, 110 260, 160 270 C 180 275, 195 260, 195 240 Z" />
            
            {/* Frontal Lobe folds */}
            <path d="M 130 95 C 105 125, 120 155, 155 145 C 175 140, 190 120, 190 95" />
            <path d="M 85 140 C 95 170, 140 170, 135 195 C 130 220, 165 220, 175 200" />
            <path d="M 100 185 C 110 215, 140 235, 165 245" />
            
            {/* Temporal Lobe */}
            <path d="M 95 210 C 85 240, 120 255, 145 235" />

            {/* Right Hemisphere Gyri & Sulci */}
            {/* Outer Silhouette Right */}
            <path d="M 205 70 C 260 68, 320 100, 325 160 C 330 210, 290 260, 240 270 C 220 275, 205 260, 205 240 Z" />
            
            {/* Right Frontal / Parietal folds */}
            <path d="M 270 95 C 295 125, 280 155, 245 145 C 225 140, 210 120, 210 95" />
            <path d="M 315 140 C 305 170, 260 170, 265 195 C 270 220, 235 220, 225 200" />
            <path d="M 300 185 C 290 215, 260 235, 235 245" />
            
            {/* Temporal Lobe Right */}
            <path d="M 305 210 C 315 240, 280 255, 255 235" />

            {/* Central Fissure / Longitudinal Divide */}
            <line x1="200" y1="65" x2="200" y2="270" stroke="#6366f1" strokeWidth="2.5" strokeDasharray="5 5" opacity="0.6" />
          </g>

          {/* Synaptic Nodes */}
          <g fill="#4f46e5">
            <circle cx="140" cy="115" r="4" />
            <circle cx="260" cy="115" r="4" />
            <circle cx="165" cy="170" r="3.5" />
            <circle cx="235" cy="170" r="3.5" />
            <circle cx="120" cy="210" r="3.5" />
            <circle cx="280" cy="210" r="3.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}
