import { useState, useRef, useEffect, useCallback } from "react";
import { PATTERN_WORDS, scrambleWord } from "../../data/gameData";
import { Puzzle, HelpCircle, CheckCircle2, AlertCircle, ArrowRight, CornerDownLeft } from "lucide-react";
import HandController from "../hand/HandController";

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const TOTAL_ROUNDS = 7;

export default function PatternGame({ onComplete, challenge, level = 1, highestScore = 0 }) {
  // Filter pool by difficulty based on level:
  // Level 1: difficulty 1 words (4-6 letters)
  // Level 2-3: difficulty 1-2 words (6-8 letters)
  // Level 4+: difficulty 2-3 words (8-12 letters)
  const [roundsData] = useState(() => {
    let pool = PATTERN_WORDS;
    if (level === 1) {
      pool = PATTERN_WORDS.filter(w => w.difficulty === 1 || w.word.length <= 6);
    } else if (level <= 3) {
      pool = PATTERN_WORDS.filter(w => w.difficulty <= 2);
    } else {
      pool = PATTERN_WORDS.filter(w => w.difficulty >= 2 || w.word.length >= 7);
    }
    const candidatePool = pool.length >= TOTAL_ROUNDS ? pool : PATTERN_WORDS;
    const shuffled = shuffleArray(candidatePool);
    return shuffled.slice(0, TOTAL_ROUNDS).map(item => ({
      ...item,
      scrambled: scrambleWord(item.word)
    }));
  });

  const [currentRound, setCurrentRound] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [status, setStatus] = useState("answering"); // "answering" | "correct" | "wrong"
  const [feedback, setFeedback] = useState(null);

  const inputRef = useRef(null);
  const gameContainerRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const roundStartTimeRef = useRef(Date.now());
  const finishedRef = useRef(false);
  const statsRef = useRef({
    correctCount: 0,
    wrongCount: 0,
    skippedCount: 0,
    hintsUsed: 0
  });

  const currentItem = roundsData[currentRound] || roundsData[0];
  const scrambledLetters = currentItem.scrambled.split("");
  const easyHint = `It is a ${currentItem.category.toLowerCase()} word with ${currentItem.word.length} letters. It starts with "${currentItem.word.slice(0, 2)}".`;

  // Auto-focus input on round switch
  useEffect(() => {
    setInputValue("");
    setStatus("answering");
    setShowHint(false);
    setFeedback(null);
    roundStartTimeRef.current = Date.now();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentRound]);

  const finishGame = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    const totalTimeMs = Date.now() - startTimeRef.current;
    const { correctCount, wrongCount } = statsRef.current;
    const totalAttempts = correctCount + wrongCount;
    const accuracy = totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 0;
    const completionRate = Math.round((correctCount / TOTAL_ROUNDS) * 100);

    const finalScore = Math.max(0, Math.min(100, Math.round(
      (accuracy * 0.55) + (completionRate * 0.45)
    )));

    onComplete({
      score: finalScore,
      accuracy,
      timeMs: totalTimeMs,
      metrics: {
        correctCount,
        wrongCount,
        hintsUsed: statsRef.current.hintsUsed,
        totalRounds: TOTAL_ROUNDS,
        maxStreak
      }
    });
  }, [maxStreak, onComplete]);

  const advanceNextRound = useCallback(() => {
    if (currentRound + 1 < TOTAL_ROUNDS) {
      setCurrentRound(r => r + 1);
    } else {
      finishGame();
    }
  }, [currentRound, finishGame]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (status !== "answering" || finishedRef.current) return;

    const cleanedInput = inputValue.trim().toUpperCase();
    if (!cleanedInput) return;

    const isCorrect = cleanedInput === currentItem.word;

    if (isCorrect) {
      statsRef.current.correctCount += 1;
      const roundDuration = Date.now() - roundStartTimeRef.current;
      const speedBonus = Math.max(0, Math.round(15 - (roundDuration / 1000)));
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      const points = 15 + speedBonus + (newStreak * 2) - (showHint ? 3 : 0);
      setScore(s => s + Math.max(5, points));
      setStatus("correct");
      setFeedback({ text: `✓ Correct! (${currentItem.word})`, type: "success" });

      setTimeout(() => {
        advanceNextRound();
      }, 700);
    } else {
      statsRef.current.wrongCount += 1;
      setStreak(0);
      setStatus("wrong");
      setFeedback({ text: "✕ Wrong! Try again.", type: "error" });

      setTimeout(() => {
        setStatus("answering");
        setFeedback(null);
        if (inputRef.current) inputRef.current.focus();
      }, 750);
    }
  };

  const handleTileClick = (letter) => {
    if (status !== "answering") return;
    setInputValue(prev => prev + letter);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleSkip = () => {
    if (status !== "answering") return;
    statsRef.current.skippedCount += 1;
    statsRef.current.wrongCount += 1;
    setStreak(0);
    setStatus("wrong");
    setFeedback({ text: `Word was: ${currentItem.word}`, type: "info" });

    setTimeout(() => {
      advanceNextRound();
    }, 1000);
  };

  const handleHintClick = () => {
    if (!showHint) {
      setShowHint(true);
      statsRef.current.hintsUsed += 1;
    }
  };

  return (
    <div className="game-stage-container pattern-game-stage" ref={gameContainerRef}>
      {/* Hand Control Header & Floating Preview */}
      <HandController gameRef={gameContainerRef} gameName="Pattern" />

      {/* Game Status Header */}
      <div className="game-status-header">
        <div className="status-badge-item">
          <span className="status-label">Word</span>
          <span className="status-value highlight">{currentRound + 1} / {TOTAL_ROUNDS}</span>
        </div>

        <div className="status-badge-item">
          <span className="status-label">Category</span>
          <span className="status-value">{currentItem.category}</span>
        </div>

        <div className="status-badge-item">
          <span className="status-label">Streak</span>
          <span className="status-value">{streak}</span>
        </div>

        <div className="status-badge-item">
          <span className="status-label">Score</span>
          <span className="status-value">{score}</span>
        </div>
      </div>

      {/* Main Scrambled Puzzle Card */}
      <div className="pattern-puzzle-card">
        <div className="pattern-top-meta">
          <span className="category-pill">{currentItem.category}</span>
          <button
            type="button"
            className={`btn-hint ${showHint ? "hint-active" : ""}`}
            onClick={handleHintClick}
          >
            <HelpCircle size={15} />
            <span>{showHint ? "Hint Active" : "Hint"}</span>
          </button>
        </div>

        {/* Hint text if toggled */}
        {showHint && (
          <div className="pattern-hint-box animate-fade-in">
            <strong>Easy hint:</strong> {easyHint}
          </div>
        )}

        {/* Scrambled Letter Tiles (Clickable or Visual) */}
        <div className="pattern-scrambled-row">
          {scrambledLetters.map((letter, idx) => (
            <button
              key={`${currentRound}-${idx}`}
              type="button"
              className="scrambled-letter-tile animate-pop"
              onClick={() => handleTileClick(letter)}
              title="Click to type this letter"
            >
              {letter}
            </button>
          ))}
        </div>

        <p className="pattern-instruction">
          Unscramble the letters into the correct word:
        </p>

        {/* Text Input Bar with Submit Button and Enter Key Support */}
        <form onSubmit={handleSubmit} className="pattern-input-bar-wrap">
          <input
            ref={inputRef}
            type="text"
            className={`pattern-text-input ${status === "correct" ? "input-correct" : ""} ${status === "wrong" ? "input-wrong" : ""}`}
            placeholder="Enter your answer"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={status !== "answering"}
            autoComplete="off"
            spellCheck="false"
          />

          <button
            type="submit"
            className="btn-pattern-submit"
            disabled={status !== "answering" || !inputValue.trim()}
          >
            <span>SUBMIT</span>
            <CornerDownLeft size={16} />
          </button>
        </form>

        <div className="pattern-actions-row">
          <button
            type="button"
            className="btn-pattern-clear"
            onClick={() => setInputValue("")}
            disabled={!inputValue || status !== "answering"}
          >
            Clear Input
          </button>

          <button
            type="button"
            className="btn-pattern-skip"
            onClick={handleSkip}
            disabled={status !== "answering"}
          >
            Skip Word
          </button>
        </div>

        {/* Instant Feedback Message */}
        {feedback && (
          <div className={`pattern-feedback feedback-${feedback.type}`}>
            {feedback.type === "success" && <CheckCircle2 size={18} />}
            {feedback.type === "error" && <AlertCircle size={18} />}
            <span>{feedback.text}</span>
          </div>
        )}
      </div>
    </div>
  );
}
