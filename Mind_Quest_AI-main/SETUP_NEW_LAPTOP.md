# MindQuest - New Laptop Setup Guide

This guide runs the existing React/Vite frontend, Express backend, and MongoDB database on Windows PowerShell.

## 1. Required software

Install these before opening the project:

- Node.js LTS (18 or newer): https://nodejs.org/
- Git: https://git-scm.com/download/win
- Visual Studio Code: https://code.visualstudio.com/Download
- MongoDB Community Server 6 or newer: https://www.mongodb.com/try/download/community
- Optional: Docker Desktop if you prefer the included MongoDB container: https://www.docker.com/products/docker-desktop/

After installation, verify the tools:

```powershell
node --version
npm --version
git --version
mongod --version
code --version
```

The project does not have a root `package.json`; install and run dependencies separately in `backend` and `frontend`.

## 2. Recommended VS Code extensions

Useful extensions for this project:

- ESLint: `dbaeumer.vscode-eslint`
- Prettier - Code formatter: `esbenp.prettier-vscode`
- ES7+ React/Redux/React-Native Snippets: `dsznajder.es7-react-js-snippets`
- MongoDB for VS Code: `mongodb.mongodb-vscode`
- Path Intellisense: `christian-kohler.path-intellisense`

Install the missing MongoDB extension from PowerShell with:

```powershell
code --install-extension mongodb.mongodb-vscode
```

REST Client is optional and is not required to run this project.

## 3. Clone or copy the project

Clone it with Git:

```powershell
cd "$HOME\Downloads"
git clone <REPOSITORY_URL> MindQuest_AI_Multi_Skill_Challenge_Complete
cd .\MindQuest_AI_Multi_Skill_Challenge_Complete
```

Or copy the project folder to the new laptop and open it in VS Code:

```powershell
code "C:\path\to\MindQuest_AI_Multi_Skill_Challenge_Complete"
```

## 4. Configure environment variables

The repository currently includes these working local-development files. If they are missing, create them with these values.

`backend\.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mindquest
JWT_SECRET=replace-with-a-long-random-local-secret
CLIENT_URL=http://localhost:5173
```

`frontend\.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Do not commit real production secrets. For MongoDB Atlas, replace `MONGO_URI` with the Atlas connection string, including the database name, and allow the laptop IP in the Atlas network access settings.

## 5. Start MongoDB

### Local MongoDB service

If MongoDB was installed as a Windows service:

```powershell
Get-Service MongoDB
Start-Service MongoDB
```

To stop it later:

```powershell
Stop-Service MongoDB
```

If no Windows service exists, start `mongod` using the data directory configured by the MongoDB installer, or use Docker instead.

### Docker MongoDB alternative

Do not run local MongoDB and Docker MongoDB on port 27017 at the same time. From the project root:

```powershell
docker compose up -d mongo
mongosh --quiet --eval "db.adminCommand({ ping: 1 })"
```

Stop the container with:

```powershell
docker compose down
```

The included `docker-compose.yml` exposes MongoDB at `127.0.0.1:27017`, matching the local `MONGO_URI`.

## 6. Install backend dependencies

Open PowerShell in the project root:

```powershell
cd "C:\path\to\MindQuest_AI_Multi_Skill_Challenge_Complete\backend"
npm ci
```

`package-lock.json` is included, so `npm ci` gives a repeatable install. Use `npm install` only when the lockfile is unavailable.

## 7. Install frontend dependencies

Open a second PowerShell window:

```powershell
cd "C:\path\to\MindQuest_AI_Multi_Skill_Challenge_Complete\frontend"
npm ci
```

## 8. Start the backend

In the backend terminal:

```powershell
cd "C:\path\to\MindQuest_AI_Multi_Skill_Challenge_Complete\backend"
npm run dev
```

The backend uses `src/server.js`, connects to MongoDB, and listens on port 5000.

Test it from another terminal:

```powershell
Invoke-RestMethod http://localhost:5000/api/health
```

Expected response:

```text
ok service       
-- -------       
True MindQuest API
```

## 9. Start the frontend

In the frontend terminal:

```powershell
cd "C:\path\to\MindQuest_AI_Multi_Skill_Challenge_Complete\frontend"
npm run dev
```

Vite normally serves the app at `http://localhost:5173`.

## 10. Open the application

Open this URL in a browser:

```text
http://localhost:5173
```

Register an account, log in, select a game, and complete a challenge. Results are submitted to `/api/game/result` and stored in MongoDB.

## 11. Common errors and solutions

### Port 5000 or 5173 is already in use

Find the process:

```powershell
netstat -ano | findstr :5000
netstat -ano | findstr :5173
```

Stop it only when appropriate:

```powershell
taskkill /PID <PID> /F
```

Then rerun the relevant `npm run dev` command. If the frontend port changes, update `CLIENT_URL` and `VITE_API_URL` to match.

### MongoDB connection error

Confirm MongoDB is running and test it:

```powershell
mongosh --quiet --eval "db.adminCommand({ ping: 1 })"
```

Check that `backend\.env` uses `mongodb://127.0.0.1:27017/mindquest`, or update it for Atlas.

### CORS or API connection error

Confirm:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- `frontend\.env`: `VITE_API_URL=http://localhost:5000/api`
- `backend\.env`: `CLIENT_URL=http://localhost:5173`

Restart Vite after changing `.env` files.

### `npm run dev` exits immediately

Check the terminal error. A common cause is that port 5000 or 5173 is already occupied. Use the port commands above, then start the service once.

### Login or game results fail

Confirm the backend health endpoint works first. Then verify that MongoDB is running and that the browser is using the current backend URL.

## 12. Stop the project

Press `Ctrl+C` in the backend and frontend terminals. If Docker MongoDB was used:

```powershell
docker compose down
```

## 13. Restart the project

Start MongoDB first, then use two terminals:

```powershell
cd "C:\path\to\MindQuest_AI_Multi_Skill_Challenge_Complete\backend"
npm run dev
```

```powershell
cd "C:\path\to\MindQuest_AI_Multi_Skill_Challenge_Complete\frontend"
npm run dev
```

Open `http://localhost:5173`.
