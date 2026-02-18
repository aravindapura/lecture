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

## If Codex/GitHub shows "Failed to update PR" or "не удается обновить ветку"

Most often this is caused by push protection after an API key was committed in any previous commit.

1. Revoke the leaked key in OpenAI dashboard.
2. Create a new key and set it only in Vercel `OPENAI_API_KEY`.
3. Remove the leaked commit from branch history (for example, interactive rebase) and force-push the branch.
4. Retry PR update after history is clean.

Never hardcode `sk-...` keys in source files.
