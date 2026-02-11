# The Burnay Lab — Copilot Workspace Instructions

## Project Overview

**The Burnay Lab** is a Portuguese language tutoring platform built by Tomas Burnay Batalha. It combines a student dashboard (login, diagnostics, games, progress tracking) with interactive vocabulary games.

## Tech Stack

- **Frontend**: Vanilla HTML/CSS/JS (no frameworks)
- **Backend**: Firebase Firestore (client-side SDK loaded via CDN)
- **Hosting**: GitHub Pages, served from the `/docs` folder
- **Audio**: WebAudio API — procedural sounds generated in JS (no external audio files)

## Deployment — CRITICAL

GitHub Pages serves from the **`/docs`** folder. The working source files live in `/games/`, `/learning-platform/`, etc.

**Before every push**, sync changes:

```bash
cp -r games/* docs/games/
```

If you edit `docs/index.html` directly, no sync is needed for that file — but always double-check.

## Folder Structure

```
/docs/                  ← DEPLOYED by GitHub Pages
  index.html            ← Main platform (login, dashboard, tabs)
  firebase-config.js    ← Firebase config
  simple.html           ← Simplified version
  games/                ← Deployed copies of games
    build-your-car/
    build-your-house/
    build-your-rocket/
    build-your-robot/
    build-your-dinosaur/

/games/                 ← SOURCE files for games (edit here, sync to docs)
  build-your-car/index.html
  build-your-house/index.html
  build-your-rocket/index.html
  build-your-robot/index.html
  build-your-dinosaur/index.html

/students/              ← Student markdown files (assessments, class logs)
  leo-ny-portugal/
    diagnostic-assessment.md

/learning-platform/     ← Node.js dev server (not deployed)
  server.js
  public/
```

## Games Architecture

Each game is a **single self-contained HTML file** with inline CSS and JS:

- **6 levels × 3 questions** per game
- Player answers Portuguese vocabulary questions to unlock parts of an object (car, house, rocket, robot, dinosaur)
- Parts are revealed on correct answers with emoji-based displays

### Key Functions in Every Game

| Function               | Purpose                                                                                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `showQuestion()`       | Renders the current question with answer buttons (`btn.disabled = false`)                                                                                           |
| `checkAnswer(correct)` | Schedules `setTimeout(() => nextQuestion(), delay)` FIRST, then try/catch wrapped `playCheerSound()`/`showSuccessSplash()` or `playOhSound()`/`showFailureSplash()` |
| `nextQuestion()`       | Increments `currentQ`, checks level completion, unlocks parts, plays `playPling()`, increments level                                                                |
| `playCheerSound()`     | Ascending chord (C5/E5/G5 sine waves) — "crowd cheering" effect                                                                                                     |
| `playOhSound()`        | Descending tone (350→150 Hz) — "crowd disappointed" effect                                                                                                          |
| `playPling()`          | Triangle wave (1320→660 Hz) — unlock notification                                                                                                                   |
| `showSuccessSplash()`  | Green toast: "✅ Correct! Great job!"                                                                                                                               |
| `showFailureSplash()`  | Red toast: "❌ Not quite! Try again!"                                                                                                                               |

### Game Consistency Rules

- **ALL 5 games must have identical `checkAnswer` logic**: setTimeout first, then try/catch sounds
- **NO `showUnlockNotice`** — it was removed from all games
- **Buttons must be `btn.disabled = false`** in `showQuestion()`
- **Sound functions must be wrapped in try/catch** to prevent blocking game progression

## Platform Dashboard (docs/index.html)

- Login system with hardcoded + Firebase users
- Roles: `admin` (teacher) and `student`
- Tabs: Diagnostics, Games, Tests, Links, Progress, Class Log
- Admin can add students (auto-generates credentials)
- Interactive diagnostic assessment system (fill-out form with ✓/~/✗ scoring)

### Firebase Structure

```
students/{studentId}/
  name, level, username, password
  diagnostics/{id}/    ← assessment data with sections/items
  games/{id}/          ← assigned games with URLs
  tests/{id}/          ← assigned tests
  links/{id}/          ← saved links
  progress/{id}/       ← tracked topics
  classLogs/{id}/      ← class log entries (date, topics, notes, comments)
```

## Users

| Username | Role    | Notes                        |
| -------- | ------- | ---------------------------- |
| tomas    | admin   | Teacher account              |
| leo      | student | Leo, 5yo, moving NY→Portugal |
| george   | student | George                       |

## Audio — WebAudio API

All sounds are procedurally generated. No external audio files.

- Always create a new `AudioContext()` per call
- Always call `ctx.resume()` before playing
- Always wrap in try/catch to prevent blocking game flow

## Style Guidelines

- Font: Inter (Google Fonts CDN)
- Primary color: `#4F46E5` (indigo)
- Gradients: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Border radius: 8px (cards), 12px (modals/overlays)
- Shadows: `0 10px 40px rgba(0,0,0,0.2)` (login), `0 1px 3px rgba(0,0,0,0.1)` (cards)

## Common Pitfalls

1. **Editing `/games/` without syncing to `/docs/games/`** — changes won't deploy
2. **Sound errors blocking game progression** — always try/catch audio calls
3. **Forgetting `btn.disabled = false`** in `showQuestion()` — buttons stay dead
4. **Using `showUnlockNotice()`** — this was removed; do NOT re-add it
5. **Inconsistent `checkAnswer` across games** — always schedule setTimeout BEFORE sounds
