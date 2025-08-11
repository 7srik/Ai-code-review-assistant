Quick local setup (recommended):

1. Unzip or clone the repo and open a terminal.
2. Backend:
   - cd ai-code-review-assistant/backend
   - cp .env.example .env
   - Edit backend/.env and set OPENAI_API_KEY=<your_real_key_here>
   - npm install
   - npm run dev
   - Backend will run on http://localhost:4000 by default.

3. Frontend:
   - Open a new terminal
   - cd ai-code-review-assistant/frontend
   - npm install
   - npm run dev
   - Frontend will run on http://localhost:3000

4. Use the frontend to paste code, choose a language, and click "Run Review".
   - The frontend calls the backend which sends the prompt to OpenAI.
   - Monitor backend logs for API errors.

Docker (alternative):
- From repo root:
  docker-compose up --build

Notes:
- Replace the placeholder in backend/.env with your real API key from your OpenAI account.
- Do NOT commit your backend/.env to git. See .gitignore which excludes .env files.
