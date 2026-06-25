require('dotenv').config();

const express = require('express');
const OpenAI = require('openai');

const PORT = process.env.PORT || 3000;
const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

if (!process.env.OPENAI_API_KEY) {
  console.error('Missing OPENAI_API_KEY. Copy .env.example to .env and add your key.');
  process.exit(1);
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT =
  'You are a friendly, concise customer support assistant. Help the user resolve their issue ' +
  'in as few messages as possible. If you do not know something, say so plainly instead of guessing.';

const MAX_MESSAGE_LENGTH = 4000;
const MAX_HISTORY_MESSAGES = 20;

const app = express();
app.use(express.json({ limit: '100kb' }));
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body || {};

  if (typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'message is required' });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({ error: `message exceeds ${MAX_MESSAGE_LENGTH} characters` });
  }

  const priorTurns = Array.isArray(history)
    ? history
        .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
        .slice(-MAX_HISTORY_MESSAGES)
    : [];

  try {
    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...priorTurns,
        { role: 'user', content: message },
      ],
    });

    const reply = completion.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      throw new Error('Empty response from model');
    }

    res.json({ reply });
  } catch (err) {
    console.error('OpenAI request failed:', err.message);
    res.status(502).json({ error: 'The support assistant is unavailable right now. Please try again.' });
  }
});

app.listen(PORT, () => {
  console.log(`Customer support app running at http://localhost:${PORT}`);
});
