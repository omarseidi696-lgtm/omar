# Linear-style Customer Support Chat

A mini AI customer support widget styled with the tokens from [`../DESIGN.md`](../DESIGN.md) (Linear.app's dark canvas, lavender accent, hairline-bordered panels). A small Express server proxies chat requests to OpenAI so the API key never reaches the browser.

## Setup

```bash
cd design-md/linear.app/customer-support-app
npm install
cp .env.example .env
```

Edit `.env` and set `OPENAI_API_KEY=sk-...`.

## Run

```bash
npm start
```

Open http://localhost:3000

## Notes

- Conversation history lives only in memory in the browser tab — refreshing the page starts a new conversation.
- The API key is read server-side from `.env` (gitignored) and is never sent to the client.
- Override the model with `OPENAI_MODEL` in `.env` (defaults to `gpt-4o-mini`).
