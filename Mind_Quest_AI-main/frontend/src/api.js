const API = import.meta.env.VITE_API_URL || "http://localhost:5050/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("mindquest_token");
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(API + path, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (res.status === 401) {
    localStorage.removeItem("mindquest_token");
    if (!window.location.pathname.startsWith("/auth")) {
      window.location.href = "/auth";
    }
    throw new Error(data.message || "Session expired. Please log in again.");
  }

  if (!res.ok) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }

  return data;
}

export const api = {
  register: (body) => request("/register", { method: "POST", body: JSON.stringify(body) }),
  login: (body) => request("/login", { method: "POST", body: JSON.stringify(body) }),
  profile: () => request("/profile"),
  dashboard: () => request("/dashboard"),
  start: (game) => request("/game/start", { method: "POST", body: JSON.stringify({ game }) }),
  result: (body) => request("/game/result", { method: "POST", body: JSON.stringify(body) }),
  results: () => request("/results"),
  achievements: () => request("/achievements"),
  progress: () => request("/progress"),
  levels: () => request("/progress/levels"),
  highScores: () => request("/game/high-scores")
};
