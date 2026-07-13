# Science Claude

A small, made-up, single-file app: a fictional "Science Claude" persona that answers
science questions and hands out a daily mini-experiment. Styled after the visual
language documented in [`design-md/claude/DESIGN.md`](../design-md/claude/DESIGN.md)
(warm cream canvas, coral accents, serif display type, dark product-mockup cards).

Everything is hardcoded — there's no backend, no API calls, and no real model behind
it. Facts, experiments, and periodic-table trivia live in arrays inside `index.html`
and are picked at random client-side.

## Run it

No build step. Just open the file:

```
open science-claude-app/index.html
```

or serve it locally:

```
cd science-claude-app && python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## What's inside

- **Ask Science Claude** — a chat-style card with category tabs (physics, chemistry,
  biology, space, earth). Hitting "Ask" pulls a random Q&A from the matching category
  and plays a short typing animation before revealing the answer.
- **Experiment of the day** — a terminal-styled card with a safe, kitchen-table
  experiment (materials + steps). Click the refresh icon for another one.
- **Periodic element of the day** — a small widget with one element and one fact
  worth remembering about it.
