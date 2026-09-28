import { useState, useRef, useCallback } from "react";
import { DECISION_PLAY_POOL } from "../../data/gameData";
import { useAuth } from "../../context/AuthContext";
import { Target, Check, X, ArrowRight, BookOpen, Lightbulb } from "lucide-react";
import HandController from "../hand/HandController";

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const TOTAL_SCENARIOS = 5;

function prepareScenario(scenario) {
  const shuffledOptions = shuffleArray(scenario.options);
  const optionKeys = ["A", "B", "C", "D"];
  const correctIndex = shuffledOptions.findIndex(option => option.key === scenario.correctAnswer);

  return {
    ...scenario,
    options: shuffledOptions.map((option, index) => ({ ...option, key: optionKeys[index] })),
    correctAnswer: optionKeys[correctIndex]
  };
}

export default function DecisionGame({ onComplete, challenge, level = 1, highestScore = 0 }) {
  const { user } = useAuth();
  const questionHistoryKey = `mindquest_decision_seen_${user?.id || user?.email || "guest"}`;

  // Pick unseen scenario-based logical questions before reusing old ones.
  const [activeScenarios] = useState(() => {
    const categories = [...new Set(DECISION_PLAY_POOL.map(scenario => scenario.category))];
    const seenIds = JSON.parse(localStorage.getItem(questionHistoryKey) || "[]");
    const unseenScenarios = DECISION_PLAY_POOL.filter(scenario => !seenIds.includes(scenario.id));
    const sourcePool = unseenScenarios.length >= TOTAL_SCENARIOS ? unseenScenarios : DECISION_PLAY_POOL;
    const availableCategories = [...new Set(sourcePool.map(scenario => scenario.category))];
    const shuffledCats = shuffleArray(availableCategories.length >= TOTAL_SCENARIOS ? availableCategories : categories).slice(0, TOTAL_SCENARIOS);
    const chosen = [];
    shuffledCats.forEach(cat => {
      const matching = sourcePool.filter(s => s.category === cat);
      if (matching.length > 0) {
        chosen.push(prepareScenario(matching[Math.floor(Math.random() * matching.length)]));
      }
    });
    if (chosen.length < TOTAL_SCENARIOS) {
      const remaining = shuffleArray(sourcePool.filter(s => !chosen.some(chosenScenario => chosenScenario.id === s.id)));
      while (chosen.length < TOTAL_SCENARIOS && remaining.length > 0) {
        chosen.push(prepareScenario(remaining.pop()));
      }
    }
    const updatedSeenIds = [...new Set([...seenIds, ...chosen.map(scenario => scenario.id)])];
    localStorage.setItem(questionHistoryKey, JSON.stringify(updatedSeenIds.length >= DECISION_PLAY_POOL.length ? [] : updatedSeenIds));
    return chosen;
  }, [questionHistoryKey]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState(null);
  const [answeredState, setAnsweredState] = useState(null); // null | "correct" | "wrong"
  const [score, setScore] = useState(0);
  const gameContainerRef = useRef(null);

  const startTimeRef = useRef(Date.now());
  const scenarioStartTimeRef = useRef(Date.now());
  const finishedRef = useRef(false);
  const statsRef = useRef({
    correct: 0,
    wrong: 0,
    times: []
  });

  const currentScenario = activeScenarios[currentIndex] || activeScenarios[0];

  const finishGame = useCallback((finalCorrect, finalWrong) => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    const totalTimeMs = Date.now() - startTimeRef.current;
    const totalAnswered = finalCorrect + finalWrong;
    const accuracy = totalAnswered > 0 ? Math.round((finalCorrect / totalAnswered) * 100) : 0;
    const completionRate = Math.round((finalCorrect / TOTAL_SCENARIOS) * 100);

    const finalScore = Math.max(0, Math.min(100, Math.round(
      (accuracy * 0.70) + (completionRate * 0.30)
    )));

    onComplete({
      score: finalScore,
      accuracy,
      timeMs: totalTimeMs,
      metrics: {
        correctCount: finalCorrect,
        wrongCount: finalWrong,
        totalScenarios: TOTAL_SCENARIOS,
        category: currentScenario.category
      }
    });
  }, [currentScenario.category, onComplete]);

  const handleSelectOption = (optionKey) => {
    if (answeredState !== null || finishedRef.current) return;

    setSelectedKey(optionKey);
    const duration = Date.now() - scenarioStartTimeRef.current;
    statsRef.current.times.push(duration);

    const isCorrect = optionKey === currentScenario.correctAnswer;

    if (isCorrect) {
      statsRef.current.correct += 1;
      setAnsweredState("correct");
      const speedBonus = Math.max(0, Math.round(15 - (duration / 1000)));
      setScore(s => s + 20 + speedBonus);
    } else {
      statsRef.current.wrong += 1;
      setAnsweredState("wrong");
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < TOTAL_SCENARIOS) {
      setCurrentIndex(i => i + 1);
      setSelectedKey(null);
      setAnsweredState(null);
      scenarioStartTimeRef.current = Date.now();
    } else {
      finishGame(statsRef.current.correct, statsRef.current.wrong);
    }
  };

  return (
    <div className="game-stage-container decision-game-stage" ref={gameContainerRef}>
      {/* Hand Control Header & Floating Preview */}
      <HandController gameRef={gameContainerRef} gameName="Decision" />

      {/* Game Status Header */}
      <div className="game-status-header">
        <div className="status-badge-item">
          <span className="status-label">Scenario</span>
          <span className="status-value highlight">{currentIndex + 1} / {TOTAL_SCENARIOS}</span>
        </div>

        <div className="status-badge-item">
          <span className="status-label">Domain</span>
          <span className="status-value">{currentScenario.category}</span>
        </div>

        <div className="status-badge-item">
          <span className="status-label">Score</span>
          <span className="status-value">{score}</span>
        </div>
      </div>

      {/* Main Scenario Card */}
      <div className="decision-scenario-card">
        <div className="decision-header-row">
          <span className="domain-category-pill">{currentScenario.category}</span>
          <span className="scenario-step-indicator">Question {currentIndex + 1} of {TOTAL_SCENARIOS}</span>
        </div>

        <h3 className="decision-question-prompt">
          {currentScenario.question}
        </h3>

        {/* 4 Options Grid */}
        <div className="decision-options-list">
          {currentScenario.options.map((opt) => {
            const isSelected = selectedKey === opt.key;
            const isCorrectOption = opt.key === currentScenario.correctAnswer;

            let optionClass = "";
            if (answeredState !== null) {
              if (isCorrectOption) optionClass = "option-state-correct";
              else if (isSelected && !isCorrectOption) optionClass = "option-state-wrong";
            }

            return (
              <button
                key={opt.key}
                type="button"
                disabled={answeredState !== null}
                className={`decision-option-btn ${isSelected ? "option-selected" : ""} ${optionClass}`}
                onClick={() => handleSelectOption(opt.key)}
              >
                <div className="option-key-badge">
                  {opt.key}
                </div>
                <div className="option-text-content">
                  {opt.text}
                </div>
                {answeredState !== null && isCorrectOption && (
                  <Check size={18} className="option-feedback-icon icon-correct" />
                )}
                {answeredState !== null && isSelected && !isCorrectOption && (
                  <X size={18} className="option-feedback-icon icon-wrong" />
                )}
              </button>
            );
          })}
        </div>

        {/* Revealed Educational Explanation Card */}
        {answeredState !== null && (
          <div className={`decision-explanation-card animate-fade-in ${answeredState === "correct" ? "card-correct" : "card-wrong"}`}>
            <div className="explanation-header">
              <Lightbulb size={18} />
              <span>{answeredState === "correct" ? "Optimal Decision Rationale" : "Key Takeaway"}</span>
            </div>
            <p className="explanation-body">
              {currentScenario.explanation}
            </p>

            <div className="explanation-action-row">
              <button
                type="button"
                className="btn-next-scenario"
                onClick={handleNext}
              >
                <span>{currentIndex + 1 < TOTAL_SCENARIOS ? "Next Scenario" : "Complete Challenge"}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
