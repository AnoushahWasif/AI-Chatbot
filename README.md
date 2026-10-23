# AI Chatbot

A small chat web app from 2024, built with Next.js (pages router) and React. Messages from the chat box go to an API route, which forwards them to Google's Gemini 1.5 Flash model.

## Structure

- `src/components/ChatBox.js`: chat UI
- `src/pages/api/chat.js`: API route that calls Gemini
- `src/pages/index.js`: main page

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Limitations

- The API route was written against an early version of `@google/generative-ai` and doesn't pass an API key, so it needs updating (`GoogleGenerativeAI` client + `getGenerativeModel`) before it returns real answers.
- No conversation history, streaming or rate limiting.
- `package.json` lists `openai`, `next-auth` and `jsonwebtoken`, which aren't used yet.
