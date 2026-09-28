# Implementation Notes

This implementation maps the supplied MindQuest documentation to a working codebase.

## Mapping
- Frontend: React + JavaScript
- UI: responsive custom CSS in the same dark/neon visual language as the supplied reference
- Backend: Node.js + Express
- Database: MongoDB
- Charts: Recharts
- Auth: JWT + bcrypt
- Modules: User/Auth, Games, Results, Performance, Achievements, Recommendations
- Data collections: users, gameSessions, gameResults, achievements, userAchievements

## Five games
Each game has its own screen and game rules:
- Focus: target identification among distractions
- Memory: memorize and recall objects
- Reaction: wait for green, measure response time
- Pattern: select the next/missing pattern item
- Decision: choose the best action in a real-world scenario

## Performance
Game results are sent to the backend, persisted, averaged per skill, and combined into an overall score. The recommendation service identifies lower-performing skills and returns improvement advice.

The exact scoring formulas were not defined in the supplied architecture document, so this implementation uses transparent, simple scoring rules rather than pretending a specific undocumented formula exists.
