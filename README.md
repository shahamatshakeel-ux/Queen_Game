<div align="center">

<img src="https://img.shields.io/badge/Built%20with-Lovable%20AI-ff69b4?style=for-the-badge&logo=sparkles&logoColor=white" alt="Built with Lovable AI" />

<br/><br/>

```
 ██████╗ ██╗   ██╗███████╗███████╗███╗   ██╗██╗  ██╗   ██╗
██╔═══██╗██║   ██║██╔════╝██╔════╝████╗  ██║██║  ╚██╗ ██╔╝
██║   ██║██║   ██║█████╗  █████╗  ██╔██╗ ██║██║   ╚████╔╝
██║▄▄ ██║██║   ██║██╔══╝  ██╔══╝  ██║╚██╗██║██║    ╚██╔╝
╚██████╔╝╚██████╔╝███████╗███████╗██║ ╚████║███████╗██║
 ╚══▀▀═╝  ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝
                                       G A M E  ♛
```

### ♛ &nbsp; The Ultimate N-Queens Puzzle Experience &nbsp; ♛

*Place queens. Solve the board. Rule the game.*

<br/>

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer-Motion-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)

<br/>

[![Deploy Status](https://img.shields.io/badge/Deploy-Azure%20Web%20Apps-0078D4?style=flat-square&logo=microsoftazure&logoColor=white)](https://azure.microsoft.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)

</div>

---

<br/>

## 🤖 Built with Lovable AI

> **Queenly Game was designed and developed using [Lovable AI](https://lovable.dev)** — the AI-powered full-stack web app builder that transforms ideas into production-ready applications. Lovable handled everything from UI generation and component scaffolding to Supabase integration and deployment pipelines — so the developer could focus on game logic and user experience, not boilerplate.

| What Lovable Did | Impact |
|---|---|
| 🎨 Generated glassmorphism UI components | Production-quality design from day one |
| ⚡ Scaffolded Supabase schema & RLS policies | Secure backend in minutes |
| 🔗 Wired React Query + Auth context | Seamless data flow out of the box |
| 🚀 Set up Azure CI/CD workflow | One-click cloud deployment |
| 🧩 Built full shadcn/ui component library | 40+ UI components ready to use |

<br/>

---

<br/>

## ♟️ What is Queenly Game?

**Queenly Game** is a beautifully crafted, browser-based implementation of the classic **N-Queens puzzle** — one of the most famous problems in computer science and combinatorics. Your challenge: place **N queens** on an **N×N chessboard** so that **no two queens attack each other** — no shared rows, columns, or diagonals.

With real-time conflict highlighting, smooth animations, a global leaderboard, and three difficulty levels — Queenly Game takes a timeless puzzle and wraps it in a modern, neon-lit experience that's as fun to look at as it is to play.

<br/>

---

<br/>

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎮 Core Gameplay
- **N-Queens puzzle engine** with real-time conflict detection
- **3 difficulty modes** — Easy, Medium, Hard
- **Multiple board sizes** (4×4 up to 12×12)
- **Undo / Redo** — full move history
- **Hint system** — limited per game for a fair challenge
- **Timer** — tracks every millisecond
- **Move counter** — fewer moves = better score
- **Confetti celebration** on puzzle completion

</td>
<td width="50%">

### 🏆 Competitive & Social
- **Global Leaderboard** — top 20 players ranked by best score
- **Podium display** — gold, silver, bronze for top 3
- **User Profiles** — track your personal stats
- **Game History** — full play-by-play record per user
- **Win Rate tracking** — see how you improve over time
- **Score algorithm** — rewards speed, low hints & hard difficulty

</td>
</tr>
<tr>
<td width="50%">

### 🔐 Auth & Backend
- **Email / Password authentication** via Supabase Auth
- **Auto-profile creation** on signup
- **Row Level Security (RLS)** on all tables
- **Protected routes** — `/play`, `/leaderboard`, `/history`, `/profile`
- **Edge Function** (`submit-game-result`) for secure score submission
- **Database migrations** tracked and versioned

</td>
<td width="50%">

### 🎨 UI / UX
- **Glassmorphism design** — frosted cards with neon glows
- **Framer Motion animations** — smooth transitions everywhere
- **Responsive layout** — mobile, tablet, and desktop ready
- **Dark-first theme** — neon pink, blue, and gold accents
- **Column & row labels** on the board (A–L, 1–12)
- **Ambient board glow** that pulses with the game
- **Colorful cell hover gradients** per position

</td>
</tr>
</table>

<br/>

---

<br/>

## 🛠️ Tech Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                       QUEENLY GAME STACK                        │
├──────────────────────┬──────────────────────────────────────────┤
│  Frontend Framework  │  React 18 + TypeScript 5.8               │
│  Build Tool          │  Vite 5.4 + SWC                          │
│  Styling             │  Tailwind CSS 3.4 + tailwindcss-animate  │
│  UI Components       │  shadcn/ui (Radix UI primitives)         │
│  Animations          │  Framer Motion 12                        │
│  Icons               │  Lucide React                            │
│  Routing             │  React Router DOM v6                     │
│  Data Fetching       │  TanStack React Query v5                 │
│  Forms               │  React Hook Form + Zod validation        │
│  Charts              │  Recharts                                │
│  Backend             │  Supabase (Postgres + Auth + Edge Fn)    │
│  Deployment          │  Azure Web Apps (GitHub Actions CI/CD)   │
│  Testing             │  Vitest + Testing Library + Playwright   │
│  Package Manager     │  Bun                                     │
│  AI Builder          │  Lovable AI                              │
└──────────────────────┴──────────────────────────────────────────┘
```

<br/>

---

<br/>

## 🗂️ Project Structure

```
queenly-game/
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📁 game/
│   │   │   ├── GameBoard.tsx        ← Interactive N×N chessboard
│   │   │   ├── GameControls.tsx     ← Difficulty, stats, actions
│   │   │   └── Confetti.tsx         ← Win celebration effect
│   │   ├── 📁 layout/
│   │   │   └── AppLayout.tsx        ← Nav + shell wrapper
│   │   ├── 📁 ui/                   ← 40+ shadcn/ui components
│   │   ├── NavLink.tsx
│   │   └── RequireAuth.tsx          ← Route guard HOC
│   │
│   ├── 📁 pages/
│   │   ├── Index.tsx                ← Dashboard / home
│   │   ├── Play.tsx                 ← Game screen
│   │   ├── Leaderboard.tsx          ← Global rankings
│   │   ├── HistoryPage.tsx          ← Personal game history
│   │   ├── Profile.tsx              ← User stats page
│   │   ├── Login.tsx / Signup.tsx   ← Auth pages
│   │   ├── About.tsx                ← Developer info
│   │   └── NotFound.tsx
│   │
│   ├── 📁 hooks/
│   │   └── useQueenGame.ts          ← Core game state & logic
│   │
│   ├── 📁 contexts/
│   │   └── AuthContext.tsx          ← Global auth state
│   │
│   └── 📁 integrations/supabase/
│       ├── client.ts                ← Supabase client setup
│       └── types.ts                 ← Auto-generated DB types
│
├── 📁 supabase/
│   ├── 📁 functions/
│   │   └── submit-game-result/      ← Edge function (score submit)
│   └── 📁 migrations/               ← Versioned DB schema
│
└── 📁 .github/workflows/
    └── azure-webapps-node.yml       ← CI/CD pipeline
```

<br/>

---

<br/>

## 🎯 How to Play

```
  ┌─────────────────────────────────────────────────────────┐
  │                                                         │
  │   1. CHOOSE DIFFICULTY                                  │
  │      🌱 Easy   → 4–6 board  · 2 hints                  │
  │      ⚡ Medium → 6–8 board  · 1 hint                   │
  │      🔥 Hard   → 8–12 board · 1 hint                   │
  │                                                         │
  │   2. PLACE QUEENS                                       │
  │      Click any cell to place (or remove) a queen ♛     │
  │      Conflicting queens glow RED — fix them!            │
  │                                                         │
  │   3. WIN CONDITION                                      │
  │      Place exactly N queens with zero conflicts         │
  │      🎉 Confetti erupts. Your score is submitted!       │
  │                                                         │
  │   SCORE = Board Size × 1000                             │
  │          − (Moves × 10)                                 │
  │          − (Time in seconds × 5)                        │
  │          − (Hints Used × 200)                           │
  │                                                         │
  └─────────────────────────────────────────────────────────┘
```

**Pro tips:**
- 🧠 Use hints only when truly stuck — each hint costs 200 points
- ⏱️ Speed matters but a clean board matters more
- 🔁 Undo / Redo freely — they don't count as moves

<br/>

---

<br/>

## 🗄️ Database Schema

```sql
-- Profiles (auto-created on signup)
profiles        → id, user_id, display_name, avatar_url, created_at

-- Game History (every game attempt)
game_history    → id, user_id, board_size, moves, time_ms,
                  score, completed, difficulty, hints_used, created_at

-- Leaderboard (live view)
leaderboard     → display_name, best_score, best_time_ms,
                  total_games, wins, win_rate, fewest_hints
```

All tables use **Row Level Security (RLS)** — users can only read/write their own data. The leaderboard view is publicly readable.

<br/>

---

<br/>

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ or **Bun** 1.0+
- A **Supabase** project (free tier works)

### 1. Clone the repo

```bash
git clone https://github.com/shahamatshakeel-ux/queenly-game.git
cd queenly-game
```

### 2. Install dependencies

```bash
# Using Bun (recommended — faster)
bun install

# Or using npm
npm install
```

### 3. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and fill in your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Apply database migrations

```bash
# Via Supabase CLI
supabase db push

# Or paste migrations manually in the Supabase SQL editor
# Files are in: supabase/migrations/
```

### 5. Run locally

```bash
bun run dev
# → http://localhost:5173
```

### 6. Build for production

```bash
bun run build
bun run preview
```

<br/>

---

<br/>

## ☁️ Deployment (Azure)

This project includes a pre-configured **GitHub Actions CI/CD pipeline** for Azure Web Apps.

```
.github/workflows/azure-webapps-node.yml
```

**Steps to deploy:**
1. Create an **Azure Web App** (Node.js runtime)
2. Add the following secrets to your GitHub repository:
   - `AZURE_WEBAPP_PUBLISH_PROFILE`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Push to `main` — the pipeline builds and deploys automatically

<br/>

---

<br/>

## 🧪 Testing

```bash
# Unit tests (Vitest)
bun run test

# Watch mode
bun run test:watch

# E2E tests (Playwright)
npx playwright test
```

<br/>

---

<br/>

## 👨‍💻 Developer

<div align="center">

```
  ╔══════════════════════════════════════╗
  ║                                      ║
  ║        ♛  Shahamat Shakeel  ♛        ║
  ║                                      ║
  ║   Aspiring Software Developer        ║
  ║   AI Enthusiast · BAI Student        ║
  ║                                      ║
  ╚══════════════════════════════════════╝
```

A passionate developer and technology enthusiast with a strong interest in **game development**, **AI**, and **software engineering**. Always building interactive, user-friendly projects that solve real problems.

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-shahamatshakeel--ux-181717?style=for-the-badge&logo=github)](https://github.com/shahamatshakeel-ux)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Shahamat%20Shakeel-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/shahamat-shakeel-1b4601403)

</div>

<br/>

---

<br/>

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. **Fork** the project
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a **Pull Request**

<br/>

---

<br/>

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

<br/>

---

<br/>

<div align="center">

*Made with ♛ by Shahamat Shakeel · Powered by [Lovable AI](https://lovable.dev)*

<br/>

**If you like this project, please ⭐ the repository — it means a lot!**

</div>