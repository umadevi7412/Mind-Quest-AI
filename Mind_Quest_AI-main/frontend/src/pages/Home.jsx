import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Brain, Zap, Target, Eye, Puzzle, Play, X, Award } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import BrainHero from "../components/BrainHero";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const handleStart = () => {
    if (user) {
      navigate("/challenge");
    } else {
      navigate("/auth");
    }
  };

  return (
    <section className="home-container">
      {/* Hero Card matching reference top-left panel */}
      <div className="home-hero-card">
        {/* Left Side Copy */}
        <div className="hero-left-content">
          <div className="hero-eyebrow">
            <span className="brand-dot">◈</span> MINDQUEST • AI MULTI-SKILL CHALLENGE
          </div>

          <h1 className="hero-headline">
            Challenge Your<br />
            Mind. Improve<br />
            <span className="gradient-text-purple">Every Day.</span>
          </h1>

          <p className="hero-supporting-text">
            Play 5 exciting games designed to test your Focus, Memory,
            Reaction, Logic and Decision Making skills.
          </p>

          <div className="hero-buttons-row">
            <button
              type="button"
              className="btn-hero-start"
              onClick={handleStart}
            >
              Start Challenge
            </button>

            <button
              type="button"
              className="btn-hero-how"
              onClick={() => setShowHowItWorks(true)}
            >
              <Play size={14} className="play-icon-fill" />
              <span>How It Works</span>
            </button>
          </div>
        </div>

        {/* Right Side 3D Glowing Brain with 5 Orbiting Skill Nodes */}
        <div className="hero-right-brain">
          <BrainHero />
        </div>
      </div>

      {/* Feature Cards below Hero */}
      <div className="home-features-grid">
        <div className="feature-card">
          <div className="feature-icon-box icon-purple">
            <Brain size={24} />
          </div>
          <div className="feature-text">
            <h4>5 Cognitive Skills</h4>
            <p>Scientifically targeted challenges for balanced brain evaluation.</p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon-box icon-blue">
            <Zap size={24} />
          </div>
          <div className="feature-text">
            <h4>Instant Analysis</h4>
            <p>Real-time millisecond accuracy, speed and skill metrics recorded to MongoDB.</p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon-box icon-green">
            <Target size={24} />
          </div>
          <div className="feature-text">
            <h4>Track Progress</h4>
            <p>Interactive Recharts tracking your cognitive trajectory over time.</p>
          </div>
        </div>
      </div>

      {/* How It Works Modal */}
      {showHowItWorks && (
        <div className="modal-backdrop" onClick={() => setShowHowItWorks(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>How MindQuest Works</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowHowItWorks(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="how-step">
                <div className="step-num">1</div>
                <div>
                  <b>Choose Single or Full Challenge</b>
                  <p>Play any of the 5 cognitive games individually, or take the comprehensive "Play All Games" challenge.</p>
                </div>
              </div>

              <div className="how-step">
                <div className="step-num">2</div>
                <div>
                  <b>Test 5 Core Brain Domains</b>
                  <p><b>Focus</b> (target discrimination), <b>Memory</b> (short-term recall), <b>Reaction</b> (latency speed), <b>Logic</b> (pattern deduction), and <b>Decision</b> (risk evaluation).</p>
                </div>
              </div>

              <div className="how-step">
                <div className="step-num">3</div>
                <div>
                  <b>Get Deterministic AI Insights</b>
                  <p>Understand your strongest domains, areas for improvement, and unlock real achievements.</p>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-summary-primary"
                onClick={() => {
                  setShowHowItWorks(false);
                  handleStart();
                }}
              >
                Begin Challenge Now
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
