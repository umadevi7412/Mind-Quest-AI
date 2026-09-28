import { useState, useEffect } from "react";
import { api } from "../api";
import FocusGame from "../components/games/FocusGame";
import MemoryGame from "../components/games/MemoryGame";
import ReactionGame from "../components/games/ReactionGame";
import PatternGame from "../components/games/PatternGame";
import DecisionGame from "../components/games/DecisionGame";
import ResultsSummary from "./ResultsSummary";

const GAMES_SEQUENCE = [
  { key: "focus", title: "Focus Challenge", comp: FocusGame },
  { key: "memory", title: "Memory Challenge", comp: MemoryGame },
  { key: "reaction", title: "Reaction Challenge", comp: ReactionGame },
  { key: "pattern", title: "Pattern Challenge", comp: PatternGame },
  { key: "decision", title: "Decision Challenge", comp: DecisionGame }
];

export default function ChallengeRunner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedResults, setCompletedResults] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [sessionInfo, setSessionInfo] = useState(null);

  const currentGameConfig = GAMES_SEQUENCE[currentIndex];
  const CurrentGameComponent = currentGameConfig?.comp;

  useEffect(() => {
    let cancelled = false;
    setSessionInfo(null);
    api.start(currentGameConfig.key)
      .then(session => { if (!cancelled) setSessionInfo(session); })
      .catch(error => console.error("Challenge session start failed:", error));
    return () => { cancelled = true; };
  }, [currentGameConfig.key]);

  const handleGameComplete = async (resultData) => {
    setSaving(true);
    const gameKey = currentGameConfig.key;

    try {
      const response = await api.result({
        game: gameKey,
        sessionId: sessionInfo?.sessionId,
        challengeId: sessionInfo?.challenge?.id,
        level: sessionInfo?.level,
        score: resultData.score,
        accuracy: resultData.accuracy,
        timeMs: resultData.timeMs,
        metrics: resultData.metrics || {}
      });

      setCompletedResults(previous => ({ ...previous, [gameKey]: resultData.score }));

      if (currentIndex + 1 < GAMES_SEQUENCE.length) {
        setSessionInfo(null);
        setCurrentIndex(previous => previous + 1);
      } else {
        const latestDashboard = await api.dashboard().catch(() => null);
        setDashboardData(latestDashboard || response?.analysis);
        setIsFinished(true);
      }
    } catch (error) {
      console.error("Failed to save challenge result:", error);
      if (currentIndex + 1 < GAMES_SEQUENCE.length) {
        setCurrentIndex(previous => previous + 1);
      } else {
        setIsFinished(true);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setCompletedResults({});
    setDashboardData(null);
    setSessionInfo(null);
    setIsFinished(false);
  };

  if (isFinished) {
    const scores = dashboardData?.skillScores || completedResults;
    const overall = dashboardData?.overall ?? (
      Object.values(completedResults).length
        ? Math.round(Object.values(completedResults).reduce((a, b) => a + b, 0) / Object.values(completedResults).length)
        : 0
    );

    return (
      <section className="challenge-completed-page">
        <ResultsSummary skillScores={scores} overallScore={overall} onPlayAgain={handleRestart} />
      </section>
    );
  }

  return (
    <section className="challenge-runner-page">
      <div className="runner-stepper-bar">
        <div className="stepper-title-area">
          <span className="stepper-badge">FULL CHALLENGE MODE</span>
          <h3>Step {currentIndex + 1} of 5: {currentGameConfig.title}</h3>
        </div>
      </div>

      {saving ? (
        <div className="saving-overlay">
          <div className="saving-spinner"></div>
          <p>Saving score & preparing next skill challenge…</p>
        </div>
      ) : (
        CurrentGameComponent && sessionInfo && (
          <CurrentGameComponent
            onComplete={handleGameComplete}
            challenge={sessionInfo.challenge}
            level={sessionInfo.level}
            highestScore={sessionInfo.bestScore || 0}
          />
        )
      )}
    </section>
  );
}
