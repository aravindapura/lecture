# Live Translator (Vercel)

Real-time speech translator for Google Chrome using `webkitSpeechRecognition` on frontend and OpenAI translation in a Vercel serverless function.

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env` in this folder:
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
