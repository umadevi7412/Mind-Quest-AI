import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, Brain, Zap, Puzzle, Target, Trophy, Sparkles, Play } from "lucide-react";
import { api } from "../api";

const GAME_CARDS = [
  {
    key: "focus",
    title: "Focus Game",
    description: "Scan dense grids and track targets with rapid round transitions",
    icon: Eye,
    colorClass: "card-focus",
    accentColor: "#4F46E5"
  },
  {
    key: "memory",
    title: "Memory Game",
    description: "Memorize 12-category symbol sequences and recall them accurately",
    icon: Brain,
    colorClass: "card-memory",
    accentColor: "#10B981"
  },
  {
    key: "reaction",
    title: "Reaction Game",
    description: "Rapid target identification across 12-24 items with 3 lives system",
    icon: Zap,
    colorClass: "card-reaction",
    accentColor: "#F59E0B"
  },
  {
    key: "pattern",
    title: "Pattern Game",
    description: "Unscramble anagrams using keyboard text input and domain hints",
    icon: Puzzle,
    colorClass: "card-logic",
    accentColor: "#8B5CF6"
  },
  {
    key: "decision",
    title: "Decision Game",
    description: "Evaluate high-stakes trade-offs across 65+ multi-category scenarios",
    icon: Target,
    colorClass: "card-decision",
    accentColor: "#EF4444"
  }
];

export default function GameSelect() {
  const navigate = useNavigate();
  const [highScores, setHighScores] = useState({});

  useEffect(() => {
    let cancelled = false;
    api.highScores()
      .then(res => {
        if (!cancelled && res?.highScores) {
          setHighScores(res.highScores);
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="game-select-section">
      {/* Header matching reference: Select a Game | Choose a skill to challenge */}
      <div className="select-header-area">
        <h1 className="select-main-title">Select a Game</h1>
        <p className="select-sub-title">Choose a cognitive domain to challenge and train</p>
      </div>

      {/* 5 Vertical Game Cards matching reference image */}
      <div className="select-cards-grid">
        {GAME_CARDS.map((card) => {
          const IconComp = card.icon;
          const best = highScores[card.key]?.bestScore || 0;

          return (
            <Link
              key={card.key}
              to={`/games/${card.key}`}
              className={`select-game-tile ${card.colorClass}`}
            >
              <div className="select-tile-icon-box" style={{ color: card.accentColor, backgroundColor: `${card.accentColor}12` }}>
                <IconComp size={36} />
              </div>
              <h3 className="select-tile-title">{card.title}</h3>
              <p className="select-tile-desc">{card.description}</p>

              <div className="select-tile-footer">
                {best > 0 ? (
                  <div className="select-tile-best-tag" style={{ borderColor: `${card.accentColor}33`, color: card.accentColor }}>
                    <Trophy size={13} />
                    <span>Best: {best} pts</span>
                  </div>
                ) : (
                  <div className="select-tile-play-tag">
                    <Play size={12} />
                    <span>Play Now</span>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Centered Large "Play All Games" Button matching reference image */}
      <div className="select-bottom-action">
        <button
          type="button"
          className="btn-play-all-glow"
          onClick={() => navigate("/challenge")}
        >
          <Sparkles size={18} />
          <span>Play All Games</span>
        </button>
      </div>
    </section>
  );
}
