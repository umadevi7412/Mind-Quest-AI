import { useState, useEffect, useRef, useCallback } from "react";
import { FOCUS_TARGETS, FOCUS_DISTRACTORS } from "../../data/gameData";
import { Flame, CheckCircle2, AlertCircle } from "lucide-react";
import HandController from "../hand/HandController";

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const TOTAL_ROUNDS = 6;

export default function FocusGame({ onComplete, challenge, level = 1, highestScore = 0 }) {
  // Grid size scales with level: Level 1: 16, Level 2: 20, Level 3: 25, Level 4: 30, Level 5+: 36
  const totalCells = level === 1 ? 16 : level === 2 ? 20 : level === 3 ? 25 : level === 4 ? 30 : 36;

  // 6 distinct round targets picked dynamically
  const [roundTargets] = useState(() => {
    const shuffled = shuffleArray(FOCUS_TARGETS);
    return shuffled.slice(0, TOTAL_ROUNDS);
  });

  const [currentRound, setCurrentRound] = useState(0); // 0 to 5 (6 rounds)
  const [gridItems, setGridItems] = useState([]);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [lastClickedIndex, setLastClickedIndex] = useState(null);
  const [wrongIndex, setWrongIndex] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState(null);
  const gameContainerRef = useRef(null);

  const startTimeRef = useRef(Date.now());
  const roundStartTimeRef = useRef(Date.now());
  const finishedRef = useRef(false);
  const statsRef = useRef({
    correct: 0,
    wrong: 0,
    roundTimes: []
  });

  const activeTarget = roundTargets[currentRound] || roundTargets[0];

  // Build grid for current round with progressive difficulty & similar distractors
  const buildRoundGrid = useCallback((targetItem) => {
    // 1 or 2 target cells in the grid to scan for
    const targetCount = level >= 4 ? 2 : 1;
    const cells = Array.from({ length: targetCount }, () => targetItem.emoji);

    // At Level 3+, prioritize visually similar distractors!
    const similarPool = targetItem.similar || [];
    if (level >= 3 && similarPool.length > 0) {
      const shuffledSimilar = shuffleArray(similarPool);
      const similarCount = Math.min(shuffledSimilar.length, Math.floor((totalCells - targetCount) * 0.6));
      for (let i = 0; i < similarCount; i++) {
        cells.push(shuffledSimilar[i]);
      }
    }

    const generalPool = shuffleArray(FOCUS_DISTRACTORS.filter(d => d !== targetItem.emoji && !cells.includes(d)));
    let pIdx = 0;
    while (cells.length < totalCells) {
      cells.push(generalPool[pIdx % generalPool.length]);
      pIdx++;
    }

    return shuffleArray(cells);
  }, [level, totalCells]);

  // Load grid on round change
  useEffect(() => {
    roundStartTimeRef.current = Date.now();
    setGridItems(buildRoundGrid(activeTarget));
    setLastClickedIndex(null);
    setWrongIndex(null);
  }, [currentRound, activeTarget, buildRoundGrid]);

  const finishGame = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    const { correct, wrong, roundTimes } = statsRef.current;
    const totalAttempts = correct + wrong;
    const accuracy = totalAttempts > 0 ? Math.round((correct / totalAttempts) * 100) : 0;
    const totalTimeMs = Date.now() - startTimeRef.current;

    // Benchmark: each round in ~2.5s is 100% speed score
    const avgRoundTimeMs = roundTimes.length > 0 ? Math.round(roundTimes.reduce((a, b) => a + b, 0) / roundTimes.length) : 3000;
    const speedScore = Math.max(0, Math.min(100, Math.round(100 * (3000 / Math.max(1500, avgRoundTimeMs)))));
    const completionScore = Math.round((correct / TOTAL_ROUNDS) * 100);

    const finalScore = Math.max(0, Math.min(100, Math.round(
      (accuracy * 0.45) + (speedScore * 0.35) + (completionScore * 0.20)
    )));

    onComplete({
      score: finalScore,
      accuracy,
      timeMs: totalTimeMs,
      metrics: {
        roundsCompleted: correct,
        totalRounds: TOTAL_ROUNDS,
        correctCount: correct,
        wrongCount: wrong,
        maxStreak,
        avgRoundTimeMs,
        speedScore
      }
    });
  }, [maxStreak, onComplete]);

  const handleCellClick = (emoji, index) => {
    if (finishedRef.current) return;

    if (emoji === activeTarget.emoji) {
      // Correct click!
      const roundDuration = Date.now() - roundStartTimeRef.current;
      statsRef.current.roundTimes.push(roundDuration);
      statsRef.current.correct += 1;

      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      const roundPoints = Math.max(10, Math.round(20 - (roundDuration / 1000) * 2)) + (newStreak * 2);
      setScore(s => s + roundPoints);
      setLastClickedIndex(index);
      setFeedbackMsg({ text: `+${roundPoints} Great Focus!`, type: "success" });

      setTimeout(() => {
        setFeedbackMsg(null);
        if (currentRound + 1 < TOTAL_ROUNDS) {
          setCurrentRound(r => r + 1);
        } else {
          finishGame();
        }
      }, 350);
    } else {
      // Wrong click!
      statsRef.current.wrong += 1;
      setStreak(0);
      setWrongIndex(index);
      setFeedbackMsg({ text: "Wrong target!", type: "error" });

      setTimeout(() => {
        setWrongIndex(null);
        setFeedbackMsg(null);
      }, 500);
    }
  };

  const [elapsedSec, setElapsedSec] = useState(0);

  // Timer loop for time display in MM:SS format
  useEffect(() => {
    if (finishedRef.current) return;
    const interval = setInterval(() => {
      if (!finishedRef.current) {
        setElapsedSec(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime =
    String(Math.floor(elapsedSec / 60)).padStart(2, "0") +
    ":" +
    String(elapsedSec % 60).padStart(2, "0");

  return (
    <div className="compact-game-card focus-game-card" ref={gameContainerRef}>
      {/* Hand Control Header & Floating Preview */}
      <HandController gameRef={gameContainerRef} gameName="Focus" />

      {/* TOP STATS: Level | Target | Time | Score | Highest */}
      <div className="game-stats-row">
        <div className="game-stat-cell">
          <span className="stat-label">Level</span>
          <span className="stat-value highlight-focus">{level}/10</span>
        </div>

        <div className="game-stat-cell">
          <span className="stat-label">Target</span>
          <span className="stat-value">{activeTarget.emoji} {activeTarget.name}</span>
        </div>

        <div className="game-stat-cell">
          <span className="stat-label">Time</span>
          <span className="stat-value">{formattedTime}</span>
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
        <span>
          Find and click the <strong className="target-highlight">{activeTarget.emoji} {activeTarget.name}</strong>
        </span>
        {feedbackMsg && (
          <span className={`target-feedback-pill pill-${feedbackMsg.type}`}>
            {feedbackMsg.text}
          </span>
        )}
      </div>

      {/* PLAYABLE GAME GRID */}
      <div className="focus-playable-area">
        <div className={`focus-grid-compact grid-cells-${totalCells}`}>
          {gridItems.map((itemEmoji, idx) => {
            const isCorrect = idx === lastClickedIndex;
            const isWrong = idx === wrongIndex;

            return (
              <button
                key={`${currentRound}-${idx}`}
                type="button"
                className={`focus-grid-cell-compact ${isCorrect ? "cell-correct" : ""} ${isWrong ? "cell-wrong" : ""}`}
                onClick={() => handleCellClick(itemEmoji, idx)}
                aria-label={`Target item ${itemEmoji}`}
              >
                <span>{itemEmoji}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* PROGRESS */}
      <div className="game-progress-row">
        <span className="progress-label-text">Targets Found</span>
        <div className="game-progress-track">
          <div
            className="game-progress-fill fill-focus"
            style={{ width: `${(currentRound / TOTAL_ROUNDS) * 100}%` }}
          ></div>
        </div>
        <span className="progress-count-text">{currentRound} / {TOTAL_ROUNDS}</span>
      </div>
    </div>
  );
}
