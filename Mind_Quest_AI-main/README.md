<<<<<<< HEAD
# MindQuest — AI Multi-Skill Challenge

A full-stack, modular-monolith implementation of the MindQuest project shown in the supplied reference image.

## Features
- React + Vite frontend
- Dark neon dashboard matching the supplied visual direction
- Node.js + Express backend
- MongoDB persistence
- JWT authentication
- Five functional games:
  1. Focus
  2. Memory
  3. Reaction
  4. Pattern
  5. Decision
- Score, time and accuracy recording
- Performance analysis and overall score
- Recharts skill comparison + progress chart
- Achievements and personalized improvement suggestions
- Profile and progress
- Modular backend boundaries: auth, games, results, performance, achievements, recommendations

## Architecture
The implementation follows the supplied Modular Monolith Architecture specification:
User/Auth → Games → Results → Performance Analysis → Achievements/Recommendations → MongoDB.

## Run locally

### 1. Requirements
- Node.js 18+
- MongoDB 6+ (local or MongoDB Atlas)

### 2. Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### 3. Frontend
Open another terminal:
```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:5000

### 4. Environment
Backend `.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mindquest
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_URL=http://localhost:5173
```

## Notes
- MongoDB is required for persistent accounts/results.
- If the backend cannot connect to MongoDB, the frontend still loads, but login/game result persistence will not work.
- The performance-analysis layer is intentionally deterministic/rule-based so the project works without a paid AI API. It is the "smart analysis" layer requested in the documentation and can later be replaced by an LLM provider.
=======
# MindQuest
>>>>>>> c4041fcbfbb08fadcaa311db142d1dff6c004b59
