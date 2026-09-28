import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import GameSelect from "./pages/GameSelect";
import GamePage from "./pages/GamePage";
import ChallengeRunner from "./pages/ChallengeRunner";
import Profile from "./pages/Profile";
import Results from "./pages/Results";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="app-loading-screen">
        <div className="saving-spinner"></div>
        <p>Loading MindQuest AI Challenge…</p>
      </div>
    );
  }
  return user ? children : <Navigate to="/auth" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="games" element={<PrivateRoute><GameSelect /></PrivateRoute>} />
          <Route path="games/:game" element={<PrivateRoute><GamePage /></PrivateRoute>} />
          <Route path="challenge" element={<PrivateRoute><ChallengeRunner /></PrivateRoute>} />
          <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="results" element={<PrivateRoute><Results /></PrivateRoute>} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
