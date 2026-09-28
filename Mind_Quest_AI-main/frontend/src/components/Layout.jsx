import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Home, LayoutDashboard, UserCircle, Gamepad2, LogOut, History, Brain, Menu, X, Bell } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const isHome = location.pathname === "/";

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/games", label: "Games", icon: Gamepad2 },
    { to: "/profile", label: "Profile", icon: UserCircle },
    { to: "/results", label: "History", icon: History }
  ];

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const getPageTitle = () => {
    if (location.pathname === "/") return "Overview";
    if (location.pathname.startsWith("/dashboard")) return "Performance Dashboard";
    if (location.pathname.startsWith("/games")) return "Cognitive Skill Games";
    if (location.pathname.startsWith("/profile")) return "User Profile";
    if (location.pathname.startsWith("/results")) return "Challenge History";
    if (location.pathname.startsWith("/challenge")) return "Multi-Skill Challenge";
    return "MindQuest AI";
  };

  return (
    <div className="mindquest-shell">
      {/* Sidebar Navigation matching reference image */}
      <aside className={`mindquest-sidebar ${mobileMenuOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand" onClick={() => navigate("/")}>
          <div className="brand-badge-glow">
            <Brain size={22} className="brand-badge-icon" />
          </div>
          <div className="brand-text-block">
            <b className="brand-text-title">MindQuest AI</b>
            <small className="brand-text-subtitle">Cognitive Suite</small>
          </div>
        </div>

        <nav className="sidebar-nav-list">
          {navLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) => `sidebar-nav-item ${isActive ? "nav-active" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="nav-icon-wrapper">
                  <IconComponent size={20} />
                </div>
                <span className="nav-label-text">{link.label}</span>
                <div className="nav-active-indicator"></div>
              </NavLink>
            );
          })}
        </nav>

        {user && (
          <div className="sidebar-bottom-action">
            <button
              type="button"
              className="btn-sidebar-logout"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </aside>

      {/* Main Content Pane */}
      <div className="mindquest-main-pane">
        {/* Topbar Header matching reference image */}
        <header className="mindquest-topbar">
          <div className="topbar-left">
            <button
              type="button"
              className="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <div className="topbar-breadcrumb">
              <span className="breadcrumb-brand">MindQuest</span>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">{getPageTitle()}</span>
            </div>
          </div>

          <div className="topbar-right">
            {/* Top Navigation Links on Home Page */}
            {isHome && (
              <div className="home-top-links">
                <NavLink to="/" end className={({ isActive }) => `home-top-link ${isActive ? "active" : ""}`}>
                  <Home size={15} />
                  <span>Home</span>
                </NavLink>
                <NavLink to="/dashboard" className="home-top-link">
                  <LayoutDashboard size={15} />
                  <span>Dashboard</span>
                </NavLink>
                <NavLink to="/games" className="home-top-link">
                  <Gamepad2 size={15} />
                  <span>Games</span>
                </NavLink>
              </div>
            )}

            {/* Notification Bell with Badge */}
            <div className="topbar-notification-wrap">
              <button
                type="button"
                className="topbar-icon-btn"
                onClick={() => setShowNotifications(!showNotifications)}
                title="Notifications"
              >
                <Bell size={19} />
                <span className="notification-dot"></span>
              </button>

              {showNotifications && (
                <div className="notifications-dropdown animate-pop">
                  <div className="notifications-header">
                    <h4>Notifications</h4>
                    <span className="notifications-count">2 New</span>
                  </div>
                  <div className="notifications-list">
                    <div className="notification-item unread">
                      <p className="notif-title">Daily Cognitive Training Ready</p>
                      <small className="notif-time">Boost your Focus & Reaction today</small>
                    </div>
                    <div className="notification-item">
                      <p className="notif-title">New High Score in Decision!</p>
                      <small className="notif-time">You scored 95% in high-stakes scenarios</small>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Pill */}
            {user ? (
              <div className="user-profile-badge" onClick={() => navigate("/profile")}>
                <div className="user-initial-avatar">
                  {user.name ? user.name[0].toUpperCase() : "A"}
                </div>
                <div className="user-badge-meta">
                  <span className="user-badge-name">{user.name || "Alex Rivera"}</span>
                  <span className="user-badge-level">Lvl {user.level || 1}</span>
                </div>
              </div>
            ) : (
              <NavLink to="/auth" className="btn-topbar-signin">
                Sign In
              </NavLink>
            )}
          </div>
        </header>

        {/* Page View */}
        <main className="mindquest-content-body">
          <Outlet />
        </main>
      </div>

      {/* Backdrop for mobile navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)}></div>
      )}
    </div>
  );
}
