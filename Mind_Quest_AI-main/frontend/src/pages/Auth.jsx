import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Brain, Lock, Mail, User, ArrowRight } from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await login({ email, password });
      } else {
        if (!name.trim()) throw new Error("Please enter your full name.");
        if (password.length < 6) throw new Error("Password must be at least 6 characters.");
        await register({ name, email, password });
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-ambient-glow"></div>

      <div className="auth-card-neo">
        {/* Brand Header */}
        <div className="auth-brand-area">
          <div className="auth-brand-logo">
            <Brain size={26} className="brand-logo-icon" />
          </div>
          <h2 className="auth-brand-title">MindQuest</h2>
          <span className="auth-brand-sub">AI Multi-Skill Challenge</span>
        </div>

        {/* Tab Switcher */}
        <div className="auth-tabs-row">
          <button
            type="button"
            className={`auth-tab-btn ${isLogin ? "auth-tab-active" : ""}`}
            onClick={() => { setIsLogin(true); setError(""); }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${!isLogin ? "auth-tab-active" : ""}`}
            onClick={() => { setIsLogin(false); setError(""); }}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="auth-error-banner">
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form-fields">
          {!isLogin && (
            <div className="auth-input-group">
              <label htmlFor="auth-name">Full Name</label>
              <div className="input-with-icon">
                <User size={18} className="input-field-icon" />
                <input
                  id="auth-name"
                  type="text"
                  placeholder="e.g. Naveen Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div className="auth-input-group">
            <label htmlFor="auth-email">Email Address</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-field-icon" />
              <input
                id="auth-email"
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="auth-input-group">
            <label htmlFor="auth-password">Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-field-icon" />
              <input
                id="auth-password"
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-auth-submit"
            disabled={loading}
          >
            {loading ? "Processing…" : isLogin ? "Sign In" : "Create Account"}
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="auth-footer-toggle">
          {isLogin ? (
            <p>
              Don't have an account?{" "}
              <button
                type="button"
                className="btn-text-link"
                onClick={() => { setIsLogin(false); setError(""); }}
              >
                Register here
              </button>
            </p>
          ) : (
            <p>
              Already registered?{" "}
              <button
                type="button"
                className="btn-text-link"
                onClick={() => { setIsLogin(true); setError(""); }}
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
