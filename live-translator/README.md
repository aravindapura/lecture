# Live Translator (Vercel)

Real-time speech translator for Google Chrome using `webkitSpeechRecognition` on frontend and OpenAI translation in a Vercel serverless function.

## Important: avoiding 404 on Vercel

If your Vercel project is connected to the **repository root** (`/workspace/lecture`), this repo now includes root-level `index.html`, `script.js`, `api/translate.js`, and `vercel.json` so deployment works without setting a custom root directory.

Alternative: in Vercel project settings you can set Root Directory to `live-translator`.

## Run locally

1. Install dependencies (in repository root):
   ```bash
   npm install
   ```
2. Create `.env` in repository root (or set env var in shell):
   ```env
   OPENAI_API_KEY=your_key_here
   ```
3. Start:
   ```bash
   npx vercel dev
   ```
4. Open `http://localhost:3000`.

## Deploy to Vercel

1. Push repository.
2. Import project in Vercel.
3. In **Project Settings → Environment Variables**, add `OPENAI_API_KEY`.
4. Deploy.

API route: `POST /api/translate`.

## If PR/branch update fails ("Failed to update PR" / "не удается обновить ветку")

This usually means a secret was committed earlier and push protection blocks branch updates.

1. Revoke leaked OpenAI key.
2. Generate a new key and keep it only in Vercel env (`OPENAI_API_KEY`).
3. Clean git history to remove commits containing the leaked key.
4. Push again and re-run PR update.
