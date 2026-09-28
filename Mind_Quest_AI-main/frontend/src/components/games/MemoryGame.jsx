import { useState, useEffect, useRef, useCallback } from "react";
import { ALL_MEMORY_SYMBOLS, MEMORY_CATEGORIES } from "../../data/gameData";
import { Brain, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import HandController from "../hand/HandController";

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function MemoryGame({ onComplete, challenge, level = 1, highestScore = 0 }) {
  // Progressive sequence length: Level 1: 5, Level 2: 6, Level 3: 7, Level 4: 8, Level 5+: 9-10 items
  const sequenceLength = level === 1 ? 5 : level === 2 ? 6 : level === 3 ? 7 : level === 4 ? 8 : Math.min(10, 8 + (level - 4));
  const displaySeconds = Math.max(2.5, Math.round((2.0 + (sequenceLength * 0.45)) * 10) / 10);

  // Pick target sequence from 14 diverse categories
  const [targetSequence] = useState(() => {
    const shuffled = shuffleArray(ALL_MEMORY_SYMBOLS);
    return shuffled.slice(0, sequenceLength);
  });

  // Choices grid contains targets + categorized distractors
  const [choices] = useState(() => {
    const distractorsNeeded = Math.min(14, 7 + level);
    const pool = ALL_MEMORY_SYMBOLS.filter(s => !targetSequence.includes(s));
    const distractorSlice = shuffleArray(pool).slice(0, distractorsNeeded);
    return shuffleArray([...targetSequence, ...distractorSlice]);
  });

  const [phase, setPhase] = useState("memorize"); // "memorize" | "recall"
  const [countdownMs, setCountdownMs] = useState(displaySeconds * 1000);
  const [selectedItems, setSelectedItems] = useState([]);
  const [score, setScore] = useState(0);
  const [lastCorrect, setLastCorrect] = useState(null);
  const [lastWrong, setLastWrong] = useState(null);
  const gameContainerRef = useRef(null);

  const startTimeRef = useRef(Date.now());
  const finishedRef = useRef(false);
  const statsRef = useRef({ correct: 0, wrong: 0 });

  // Countdown timer for Memorize Phase
  useEffect(() => {
    if (phase !== "memorize") return;

    const interval = 50;
    const timer = setInterval(() => {
      setCountdownMs(prev => {
        if (prev <= interval) {
          clearInterval(timer);
          setPhase("recall");
          return 0;
        }
        return prev - interval;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [phase]);

  const finishGame = useCallback((finalCorrect, finalWrong) => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    const totalTimeMs = Date.now() - startTimeRef.current;
    const totalAttempts = finalCorrect + finalWrong;
    const accuracy = totalAttempts > 0 ? Math.round((finalCorrect / totalAttempts) * 100) : 0;
    const completionScore = Math.round((finalCorrect / sequenceLength) * 100);
    const difficultyScore = Math.min(100, 50 + (level * 5));

    const finalScore = Math.max(0, Math.min(100, Math.round(
      (accuracy * 0.60) + (completionScore * 0.25) + (difficultyScore * 0.15)
    )));

    onComplete({
      score: finalScore,
      accuracy,
      timeMs: totalTimeMs,
      metrics: {
        correctCount: finalCorrect,
        wrongCount: finalWrong,
        sequenceLength,
        totalChoices: choices.length,
        difficultyScore
      }
    });
  }, [choices.length, level, onComplete, sequenceLength]);

  const handleSelect = (symbol) => {
    if (phase !== "recall" || selectedItems.includes(symbol) || finishedRef.current) return;

    const isCorrect = targetSequence.includes(symbol);

    if (isCorrect) {
      statsRef.current.correct += 1;
      const newSelected = [...selectedItems, symbol];
      setSelectedItems(newSelected);
      setScore(s => s + 15);
      setLastCorrect(symbol);

      setTimeout(() => setLastCorrect(null), 400);

      // If all sequence items are found, finish
      if (statsRef.current.correct >= sequenceLength) {
        setTimeout(() => finishGame(statsRef.current.correct, statsRef.current.wrong), 350);
      }
    } else {
      statsRef.current.wrong += 1;
      setLastWrong(symbol);
      setTimeout(() => setLastWrong(null), 450);
    }
  };

  const progressPercent = Math.max(0, Math.min(100, (countdownMs / (displaySeconds * 1000)) * 100));

  return (
    <div className="compact-game-card memory-game-card" ref={gameContainerRef}>
      {/* Hand Control Header & Floating Preview */}
      <HandController gameRef={gameContainerRef} gameName="Memory" />

      {/* TOP STATS: Level | Preview Time | Score | Highest */}
      <div className="game-stats-row">
        <div className="game-stat-cell">
          <span className="stat-label">Level</span>
          <span className="stat-value highlight-memory">{level}/10</span>
        </div>

        <div className="game-stat-cell">
          <span className="stat-label">
            {phase === "memorize" ? "Preview Time" : "Time"}
          </span>
          <span className="stat-value">
            {phase === "memorize" ? `${(countdownMs / 1000).toFixed(1)}s` : "Recall"}
          </span>
        </div>

        <div className="game-stat-cell">
          <span className="stat-label">Score</span>
          <span className="stat-value highlight-primary">{score}</span>
        </div>

        <div className="game-stat-cell">
          <span className="stat-label">Highest</span>
          <span className="stat-value">{highestScore || 0}</span>
        </div>
      </div>

      {/* INSTRUCTION */}
      <div className="game-instruction-banner">
        {phase === "memorize" ? (
          <span>
            Memorize these <strong className="target-highlight">{sequenceLength} items</strong> quickly!
          </span>
        ) : (
          <span>
            Select all <strong className="target-highlight">{sequenceLength} items</strong> you just memorized:
          </span>
        )}
      </div>

      {/* PLAYABLE MEMORY AREA */}
      <div className="memory-playable-area">
        {/* Memorize Phase: Compact Centered Sequence Grid */}
        {phase === "memorize" && (
          <>
            <div className="memory-sequence-grid">
              {targetSequence.map((symbol, idx) => (
                <div key={idx} className="memory-sequence-card">
                  <span className="sequence-index">{idx + 1}</span>
                  <span className="sequence-emoji">{symbol}</span>
                </div>
              ))}
            </div>

            {/* Status / Countdown */}
            <div className="memory-status-box">
              <span className="memory-status-text">
                Items will vanish in {(countdownMs / 1000).toFixed(1)}s. Pay strict attention!
              </span>
              <div className="memory-timer-bar">
                <div
                  className="memory-timer-fill"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          </>
        )}

        {/* Recall Phase: Compact Choices Grid */}
        {phase === "recall" && (
          <div className="memory-choices-compact">
            {choices.map((symbol, idx) => {
              const isSelected = selectedItems.includes(symbol);
              const isWrong = symbol === lastWrong;
              const isJustCorrect = symbol === lastCorrect;

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isSelected}
                  className={`memory-choice-btn-compact ${isSelected ? "choice-selected" : ""} ${isJustCorrect ? "choice-correct" : ""} ${isWrong ? "choice-wrong" : ""}`}
                  onClick={() => handleSelect(symbol)}
                  aria-label={`Choice ${symbol}`}
                >
                  <span className="choice-emoji">{symbol}</span>
                  {isSelected && <CheckCircle2 size={14} className="choice-check-icon" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* PROGRESS (Recall Phase) */}
      {phase === "recall" && (
        <div className="game-progress-row">
          <span className="progress-label-text">Items Found</span>
          <div className="game-progress-track">
            <div
              className="game-progress-fill fill-memory"
              style={{ width: `${(selectedItems.length / sequenceLength) * 100}%` }}
            ></div>
          </div>
          <span className="progress-count-text">{selectedItems.length} / {sequenceLength}</span>
        </div>
      )}
    </div>
  );
}
