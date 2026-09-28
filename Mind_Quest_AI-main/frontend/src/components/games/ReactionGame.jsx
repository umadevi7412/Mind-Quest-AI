import { useState, useEffect, useRef, useCallback } from "react";
import { REACTION_TARGET_POOLS } from "../../data/gameData";
import { Heart, Zap, AlertTriangle, CheckCircle2, Sparkles, XCircle } from "lucide-react";
import HandController from "../hand/HandController";

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const MAX_LIVES = 3;
const TOTAL_ROUNDS = 6;
const ARENA_HEIGHT = 460; // Pixels

export default function ReactionGame({ onComplete, challenge, level = 1, highestScore = 0 }) {
  // Shuffled round themes from the target pools
  const [roundPools] = useState(() => {
    const shuffled = shuffleArray(REACTION_TARGET_POOLS);
    return shuffled.slice(0, TOTAL_ROUNDS);
  });

  const [roundIndex, setRoundIndex] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [targetsCollectedInRound, setTargetsCollectedInRound] = useState(0);
  const [items, setItems] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [floatingPops, setFloatingPops] = useState([]);

  // Active theme / target for this round
  const currentPool = roundPools[roundIndex] || roundPools[0];
  // Quota: targets to catch before advancing to next round (4 at early rounds up to 6)
  const roundQuota = Math.min(6, 4 + Math.floor(roundIndex / 2));

  // Physics & Spawning tuning based on player Level
  // Speed in pixels per frame (~60fps)
  const speedBase = Math.min(4.0, 1.8 + (level * 0.35) + (roundIndex * 0.15));
  const maxSimultaneous = Math.min(8, 4 + Math.floor(level / 2) + Math.floor(roundIndex / 3));
  const spawnIntervalMs = Math.max(650, 1200 - (level * 100) - (roundIndex * 40));

  // Refs for animation loop and mutable physics state
  const itemsRef = useRef([]);
  const livesRef = useRef(MAX_LIVES);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const maxStreakRef = useRef(0);
  const roundIndexRef = useRef(0);
  const roundQuotaRef = useRef(roundQuota);
  const targetsCollectedRef = useRef(0);
  const currentPoolRef = useRef(currentPool);
  const finishedRef = useRef(false);
  const isTransitioningRoundRef = useRef(false);
  const lastSpawnTimeRef = useRef(0);
  const animFrameIdRef = useRef(null);
  const lastFrameTimeRef = useRef(Date.now());
  const nextItemIdRef = useRef(1);
  const arenaRef = useRef(null);
  const gameContainerRef = useRef(null);
  const arenaHeightRef = useRef(320);

  // Dynamically track arena height for responsive viewport fitting
  useEffect(() => {
    const updateHeight = () => {
      if (arenaRef.current) {
        arenaHeightRef.current = arenaRef.current.clientHeight || 320;
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const startTimeRef = useRef(Date.now());
  const statsRef = useRef({
    correctHits: 0,
    wrongHits: 0,
    missedTargets: 0,
    roundsCompleted: 0
  });

  // Keep refs in sync with state
  useEffect(() => {
    livesRef.current = lives;
  }, [lives]);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    streakRef.current = streak;
  }, [streak]);

  useEffect(() => {
    roundIndexRef.current = roundIndex;
    roundQuotaRef.current = roundQuota;
    currentPoolRef.current = currentPool;
    targetsCollectedRef.current = targetsCollectedInRound;
  }, [roundIndex, roundQuota, currentPool, targetsCollectedInRound]);

  // Finish Game and send payload
  const finishGame = useCallback((isVictory = false) => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
    }

    const totalTimeMs = Date.now() - startTimeRef.current;
    const { correctHits, wrongHits, missedTargets, roundsCompleted } = statsRef.current;
    const totalAttempts = correctHits + wrongHits + missedTargets;
    const accuracy = totalAttempts > 0 ? Math.round((correctHits / totalAttempts) * 100) : 0;
    const completionRate = Math.round((roundsCompleted / TOTAL_ROUNDS) * 100);

    // Compute standard 0-100 cognitive performance score
    let calculatedScore = 0;
    if (correctHits > 0) {
      const basePerformance = (accuracy * 0.50) + (completionRate * 0.35);
      const livesBonus = (livesRef.current / MAX_LIVES) * 15;
      calculatedScore = Math.max(0, Math.min(100, Math.round(basePerformance + livesBonus)));
    }

    onComplete({
      score: calculatedScore,
      accuracy,
      timeMs: totalTimeMs,
      metrics: {
        correctHits,
        wrongHits,
        missedTargets,
        roundsCompleted,
        livesRemaining: livesRef.current,
        maxStreak: maxStreakRef.current,
        level,
        isVictory
      }
    });
  }, [level, onComplete]);

  // Advance to next round or finish if all rounds cleared
  const handleAdvanceRound = useCallback(() => {
    if (isTransitioningRoundRef.current || finishedRef.current) return;
    isTransitioningRoundRef.current = true;

    statsRef.current.roundsCompleted += 1;
    setFeedback({ text: `✓ Round ${roundIndexRef.current + 1} Cleared!`, type: "cleared" });

    // Clear falling items for brief pause
    itemsRef.current = [];
    setItems([]);

    setTimeout(() => {
      if (roundIndexRef.current + 1 < TOTAL_ROUNDS) {
        setRoundIndex(r => r + 1);
        setTargetsCollectedInRound(0);
        targetsCollectedRef.current = 0;
        setFeedback(null);
        isTransitioningRoundRef.current = false;
        lastSpawnTimeRef.current = Date.now();
      } else {
        // Cleared all 6 rounds! Victory!
        setFeedback({ text: "★ All Rounds Cleared! Outstanding Reaction!", type: "cleared" });
        setTimeout(() => {
          finishGame(true);
        }, 800);
      }
    }, 700);
  }, [finishGame]);

  // Main Item Hover / Touch Interaction Handler (NO CLICK REQUIRED)
  const handleItemHover = useCallback((item) => {
    if (finishedRef.current || isTransitioningRoundRef.current) return;
    if (item.collected || item.missed) return;

    // Mark item collected in physics ref
    const targetItem = itemsRef.current.find(i => i.id === item.id);
    if (!targetItem || targetItem.collected || targetItem.missed) return;

    targetItem.collected = true;

    if (targetItem.isTarget) {
      // === SUCCESSFUL TARGET HIT ===
      statsRef.current.correctHits += 1;
      const newStreak = streakRef.current + 1;
      setStreak(newStreak);
      streakRef.current = newStreak;
      if (newStreak > maxStreakRef.current) {
        maxStreakRef.current = newStreak;
        setMaxStreak(newStreak);
      }

      const points = 10 + (newStreak * 2);
      setScore(s => s + points);
      scoreRef.current += points;

      // Add floating score pop
      const popId = `pop-${Date.now()}-${Math.random()}`;
      setFloatingPops(prev => [...prev.slice(-4), { id: popId, text: `+${points}`, x: targetItem.x, y: targetItem.y, type: "success" }]);
      setTimeout(() => {
        setFloatingPops(prev => prev.filter(p => p.id !== popId));
      }, 600);

      setFeedback({ text: `✓ Great! +${points}`, type: "success" });

      const newCollectedInRound = targetsCollectedRef.current + 1;
      setTargetsCollectedInRound(newCollectedInRound);
      targetsCollectedRef.current = newCollectedInRound;

      // Check if round quota reached
      if (newCollectedInRound >= roundQuotaRef.current) {
        handleAdvanceRound();
      }
    } else {
      // === WRONG TARGET HOVER ===
      targetItem.wrong = true;
      statsRef.current.wrongHits += 1;
      setStreak(0);
      streakRef.current = 0;

      // Deduct 10 points (minimum 0)
      setScore(s => Math.max(0, s - 10));
      scoreRef.current = Math.max(0, scoreRef.current - 10);

      // Deduct 1 life
      const nextLives = livesRef.current - 1;
      setLives(nextLives);
      livesRef.current = nextLives;

      const popId = `pop-${Date.now()}-${Math.random()}`;
      setFloatingPops(prev => [...prev.slice(-4), { id: popId, text: `-10`, x: targetItem.x, y: targetItem.y, type: "danger" }]);
      setTimeout(() => {
        setFloatingPops(prev => prev.filter(p => p.id !== popId));
      }, 600);

      setFeedback({ text: "✕ Wrong target! -10 pts, -1 ❤️", type: "danger" });

      if (nextLives <= 0) {
        setFeedback({ text: "Game Over! You're out of lives.", type: "danger" });
        setTimeout(() => {
          finishGame(false);
        }, 700);
      }
    }
  }, [handleAdvanceRound, finishGame]);

  // Main 60fps Physics & Falling Animation Loop
  useEffect(() => {
    lastFrameTimeRef.current = Date.now();
    lastSpawnTimeRef.current = Date.now();

    const tick = () => {
      if (finishedRef.current) return;

      const now = Date.now();
      const dt = Math.min(2.0, (now - lastFrameTimeRef.current) / 16.67);
      lastFrameTimeRef.current = now;

      if (!isTransitioningRoundRef.current && livesRef.current > 0) {
        // 1. Update positions of existing items
        const currentItems = itemsRef.current;
        const updated = [];

        for (let i = 0; i < currentItems.length; i++) {
          const item = currentItems[i];

          // If collected or already counted as miss, let it finish visual pop/fade
          if (item.collected || item.wrong) {
            item.age = (item.age || 0) + 1;
            if (item.age < 12) {
              updated.push(item);
            }
            continue;
          }

          // Move item downward
          item.y += item.speed * dt;

          // Check for MISSED TARGET (correct target reaching bottom uncollected)
          const currentArenaH = arenaHeightRef.current || 320;
          if (item.isTarget && !item.missed && item.y >= currentArenaH - 35) {
            item.missed = true;
            statsRef.current.missedTargets += 1;
            setStreak(0);
            streakRef.current = 0;

            // Deduct 10 points (minimum 0)
            setScore(s => Math.max(0, s - 10));
            scoreRef.current = Math.max(0, scoreRef.current - 10);

            // Deduct 1 life
            const nextLives = livesRef.current - 1;
            setLives(nextLives);
            livesRef.current = nextLives;

            setFeedback({ text: "⚠ Missed target! -10 pts, -1 ❤️", type: "miss" });

            if (nextLives <= 0) {
              setFeedback({ text: "Game Over! You're out of lives.", type: "danger" });
              itemsRef.current = updated;
              setItems([...updated]);
              setTimeout(() => {
                finishGame(false);
              }, 700);
              return;
            }
          }

          // Keep item if it hasn't fallen far below the arena
          if (item.y < currentArenaH + 35) {
            updated.push(item);
          }
        }

        // 2. Spawn new falling items
        if (
          updated.length < maxSimultaneous &&
          now - lastSpawnTimeRef.current >= spawnIntervalMs
        ) {
          lastSpawnTimeRef.current = now;

          // ~35% chance to spawn the target emoji, 65% chance for distractor
          const isTarget = Math.random() < 0.38;
          const pool = currentPoolRef.current;
          let emoji = pool.targetEmoji;

          if (!isTarget) {
            const distractorList = pool.distractors;
            emoji = distractorList[Math.floor(Math.random() * distractorList.length)];
          }

          // Pick random X lane (between 6% and 86% of arena width)
          // Ensure it doesn't overlap tightly with newly spawned items at the top
          const topItems = updated.filter(it => it.y < 80);
          let chosenX = 6 + Math.random() * 80;
          for (let attempt = 0; attempt < 5; attempt++) {
            const hasClash = topItems.some(it => Math.abs(it.x - chosenX) < 14);
            if (!hasClash) break;
            chosenX = 6 + Math.random() * 80;
          }

          const speedVariation = speedBase * (0.88 + Math.random() * 0.24);

          const newItem = {
            id: `item-${nextItemIdRef.current++}`,
            emoji,
            isTarget,
            x: Math.round(chosenX * 10) / 10,
            y: -42, // Start slightly above the top
            speed: speedVariation,
            collected: false,
            wrong: false,
            missed: false
          };

          updated.push(newItem);
        }

        itemsRef.current = updated;
        setItems([...updated]);
      }

      animFrameIdRef.current = requestAnimationFrame(tick);
    };

    animFrameIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [maxSimultaneous, spawnIntervalMs, speedBase, finishGame]);

  return (
    <div className="compact-game-card reaction-game-card" ref={gameContainerRef}>
      {/* Hand Control Header & Floating Preview */}
      <HandController gameRef={gameContainerRef} gameName="Reaction" />

      {/* TOP STATS: Target | Level | Lives | Score | Highest */}
      <div className="game-stats-row">
        <div className="game-stat-cell">
          <span className="stat-label">Target</span>
          <span className="stat-value highlight-reaction">
            {currentPool.targetEmoji} {currentPool.targetName}
          </span>
        </div>

        <div className="game-stat-cell">
          <span className="stat-label">Level</span>
          <span className="stat-value">{level}/10</span>
        </div>

        <div className="game-stat-cell">
          <span className="stat-label">Lives</span>
          <div className="lives-hearts-row">
            {Array.from({ length: MAX_LIVES }, (_, i) => (
              <Heart
                key={i}
                size={18}
                className={`life-heart ${i < lives ? "heart-active" : "heart-lost"}`}
              />
            ))}
          </div>
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
          Target: <strong className="target-highlight">{currentPool.targetEmoji} {currentPool.targetName}</strong> — Touch or move your cursor over the falling target.
        </span>
        {feedback && (
          <span className={`target-feedback-pill pill-${feedback.type === "danger" ? "error" : feedback.type === "miss" ? "warning" : "success"}`}>
            {feedback.text}
          </span>
        )}
      </div>

      {/* MAIN FALLING GAME AREA */}
      <div className="reaction-playable-area">
        <div
          ref={arenaRef}
          className="reaction-arena-compact"
        >
          {/* Falling Items */}
          {items.map((item) => {
            let itemClass = "falling-item-wrap-compact";
            if (item.collected && item.isTarget) itemClass += " item-collected-pop";
            if (item.wrong) itemClass += " item-wrong-shake";
            if (item.missed) itemClass += " item-missed-fade";

            return (
              <div
                key={item.id}
                className={itemClass}
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}px`
                }}
                onPointerEnter={() => handleItemHover(item)}
                onPointerDown={(e) => {
                  e.preventDefault();
                  handleItemHover(item);
                }}
                onClick={(e) => {
                  e.preventDefault();
                  handleItemHover(item);
                }}
                title="Move cursor over to catch"
              >
                <span className="falling-item-emoji">{item.emoji}</span>
              </div>
            );
          })}

          {/* Floating Feedback Popups (+points, -10) */}
          {floatingPops.map((pop) => (
            <div
              key={pop.id}
              className={`floating-pop-tag pop-${pop.type}`}
              style={{
                left: `${pop.x}%`,
                top: `${pop.y}px`
              }}
            >
              {pop.text}
            </div>
          ))}

          {/* Bottom Collection Zone / Baseline */}
          <div className="reaction-baseline-compact">
            <span className="baseline-label">Collection Zone</span>
          </div>
        </div>
      </div>

      {/* PROGRESS */}
      <div className="game-progress-row">
        <span className="progress-label-text">Round {roundIndex + 1} of {TOTAL_ROUNDS}</span>
        <div className="game-progress-track">
          <div
            className="game-progress-fill fill-reaction"
            style={{ width: `${(targetsCollectedInRound / roundQuota) * 100}%` }}
          ></div>
        </div>
        <span className="progress-count-text">Caught: {targetsCollectedInRound} / {roundQuota}</span>
      </div>
    </div>
  );
}
