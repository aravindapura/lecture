# Lecture Live Translator (Vercel Root)

This repository is deploy-ready on Vercel from the repository root.

## Structure used by Vercel

- `index.html` + `script.js` for frontend at `/`
- `api/translate.js` for serverless translation endpoint at `/api/translate`
- `vercel.json` sets Node 18 runtime for the API function

## If deployment log stops at `Running build ...`

1. Ensure project Root Directory is repository root.
2. Ensure Environment Variable `OPENAI_API_KEY` is set in Vercel project settings.
3. Redeploy and check Function Logs for `/api/translate`.
