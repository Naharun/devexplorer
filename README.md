# DevExplorer

A production-style developer intelligence platform that aggregates real-world data from multiple public APIs into a unified dashboard experience.

## Live Demo

Deploy on Vercel — see setup instructions below.

---

## Tech Stack

- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4+
- **State Management:** Redux Toolkit + RTK Query
- **Authentication:** Firebase Authentication
- **Charts:** Recharts
- **Icons:** Lucide React

---

## Features

- **Repository Explorer** — Search GitHub repos with language filter, sort by stars/forks/updated
- **Developer Explorer** — Search GitHub users, view profiles, followers, activity
- **Article System** — Browse Dev.to articles filtered by tags
- **News System** — Hacker News top/new/best stories with nested comments
- **Stack Overflow Explorer** — Search and browse Q&A with answers
- **Dashboard** — Saved repositories, developers, articles with localStorage persistence
- **Collections** — Group saved items into custom collections
- **Authentication** — Email/Password and Google OAuth via Firebase

---

## External APIs

| API | Usage |
|-----|-------|
| [GitHub REST API](https://docs.github.com/en/rest) | Repositories, developers, activity |
| [Dev.to API](https://developers.forem.com/api) | Articles, tags |
| [Hacker News API](https://github.com/HackerNews/API) | Stories, comments |
| [Stack Exchange API](https://api.stackexchange.com/docs) | Questions, answers |
| Firebase Authentication | User login/signup |

> **Note:** Stack Exchange API has a rate limit of 300 requests/day without an API key.

---

## Folder Structure

```
src/
├── app/
│   ├── articles/
│   ├── collections/
│   ├── dashboard/
│   ├── developers/[username]/
│   ├── favorites/
│   ├── login/
│   ├── news/[id]/
│   ├── questions/[id]/
│   ├── repositories/[owner]/[repo]/
│   ├── signup/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── features/
│   │   ├── articles/
│   │   ├── auth/
│   │   ├── collections/
│   │   ├── dashboard/
│   │   ├── developers/
│   │   ├── news/
│   │   ├── questions/
│   │   └── repositories/
│   ├── layout/
│   │   └── Navbar.tsx
│   └── shared/
│       ├── SaveArticleButton.tsx
│       ├── SaveDeveloperButton.tsx
│       └── SaveRepositoryButton.tsx
│
├── hooks/
│   ├── useAuth.ts
│   └── useDebounce.ts
│
├── lib/
│   └── firebase.ts
│
├── providers/
│   ├── AuthProvider.tsx
│   └── ReduxProvider.tsx
│
├── redux/
│   ├── api/
│   │   ├── devtoApi.ts
│   │   ├── githubApi.ts
│   │   ├── hackerNewsApi.ts
│   │   └── stackExchangeApi.ts
│   ├── slices/
│   │   ├── authSlice.ts
│   │   ├── collectionsSlice.ts
│   │   ├── favoritesSlice.ts
│   │   └── recentlyViewedSlice.ts
│   ├── hooks.ts
│   └── store.ts
│
├── services/
│   └── authService.ts
│
└── types/
    ├── auth.ts
    ├── collection.ts
    ├── developer.ts
    ├── devto.ts
    ├── github.ts
    ├── hackernews.ts
    └── stackoverflow.ts
```

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Naharun/devexplorer.git
cd devexplorer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Get these values from your [Firebase Console](https://console.firebase.google.com) → Project Settings → Your apps.

### 4. Firebase Authentication setup

In Firebase Console:
- Enable **Email/Password** provider
- Enable **Google** provider
- Add `localhost` to Authorized domains

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment (Vercel)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add all `NEXT_PUBLIC_FIREBASE_*` environment variables in Vercel project settings
4. Deploy

---

## Architecture Overview

### RTK Query
All API calls are handled via RTK Query services (`githubApi`, `devtoApi`, `hackerNewsApi`, `stackExchangeApi`). This provides automatic caching, deduplication, and loading/error states.

### Redux Slices
- `authSlice` — Firebase user session
- `favoritesSlice` — Saved repos, developers, articles (persisted to localStorage)
- `collectionsSlice` — Custom grouped collections
- `recentlyViewedSlice` — Recently viewed items

### Authentication Flow
Firebase `onAuthStateChanged` listener in `AuthProvider` dispatches user state to Redux on every page load, enabling persistent sessions and protected routes.

---

## License

MIT