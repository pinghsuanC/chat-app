# DiscordDup

A Discord-inspired chat application.

---

## Stack

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS v4
- Zustand (state management)
- i18next + react-i18next (EN/ZH)

### Backend
- Node.js + Express + TypeScript
- `tsx watch` for dev

### Database
- PostgreSQL via Supabase (free tier) — source of truth
- Redis (`ioredis`) — caching, presence, typing indicators

### Auth
- Passport.js (`passport-local`, `passport-google-oauth20`)
- JWT (`jsonwebtoken`)
- Bcrypt (password hashing)

---

## Database Design

### Approach
- Supabase is used **only as a hosted PostgreSQL database** — Supabase Auth is NOT used (paid feature)
- Auth is implemented entirely in the Express backend

### PostgreSQL Tables

#### `users`
Stores all users regardless of how they signed up.
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| username | text | unique |
| email | text | unique |
| password_hash | text | null for Google OAuth users |
| google_id | text | null for email/password users |
| avatar_url | text | nullable |
| created_at | timestamptz | |

#### `conversations`
A thread between 2 or more users.
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| created_at | timestamptz | |

#### `conversation_participants`
Which users belong to which conversation.
| Column | Type | Notes |
|---|---|---|
| conversation_id | uuid | FK → conversations.id |
| user_id | uuid | FK → users.id |
| joined_at | timestamptz | |
| PK | (conversation_id, user_id) | |

#### `messages`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| conversation_id | uuid | FK → conversations.id |
| sender_id | uuid | FK → users.id |
| content | text | |
| created_at | timestamptz | |
| edited_at | timestamptz | nullable |

### Redis Key Conventions
| Key pattern | Value | Purpose |
|---|---|---|
| `user:{id}:online` | `1` | Presence — expires if no heartbeat |
| `conversation:{id}:cache` | JSON | Last N messages, fast load |
| `typing:{conversationId}:{userId}` | `1` | Typing indicator — auto-expires |
| `unread:{userId}:{conversationId}` | integer | Unread message count |

---

## Auth Decisions

### Why not Supabase Auth?
Supabase Auth is a paid feature. The project must stay on free tiers only.

### Approach
The Express backend owns authentication entirely. Supabase is only used as a database.

### Login methods
- **Email + password** — hashed with bcrypt, verified by `passport-local`
- **Google OAuth** — handled by `passport-google-oauth20`
  - User clicks "Sign in with Google"
  - Google redirects back to the Express backend with an auth code
  - Express backend exchanges the code with Google for the user's profile
  - Backend creates/finds the user in the `users` table
  - Backend issues its own JWT to the frontend

### Token flow
```
User logs in (email or Google)
  → Express backend verifies credentials
  → Issues short-lived JWT (access token, ~15min)
  → Issues long-lived refresh token (7-30 days)
  → Frontend stores tokens
  → Every API request sends Authorization: Bearer <access_token>
  → Backend verifies JWT signature — no DB hit needed
  → When access token expires, frontend uses refresh token to get a new one
```

### Why JWT over API keys?
API keys are for machine-to-machine communication. JWT is for identifying a human user across requests. Both login methods (email and Google) result in the same JWT format — the rest of the app never needs to know how someone authenticated.

---

## Known Issues & Fixes

### React Router v7 — `<Link>` not navigating
**Symptom:** Clicking a `<Link>` is visible and responds to hover/click, but does not redirect to the target route.

**Root cause:** `@types/react-router-dom` v5.3.3 was installed as a dev dependency. This is the type package for React Router v5 and conflicts with React Router v7, which ships its own types. The conflicting types can interfere with how the router resolves and handles navigation.

**Fix:** Remove the stale type package — React Router v7 does not need it.
```bash
npm uninstall @types/react-router-dom
```

---

## Todo
- [ ] Finalize database schema
- [ ] Implement auth (email/password + Google OAuth)
- [ ] Wire backend → PostgreSQL (replace in-memory store)
- [ ] Wire Redis (presence, cache, typing indicators)
- [ ] WebSockets for real-time messaging
- [ ] Real contacts from DB (replace hardcoded list)
- [ ] Message timestamps
- [ ] File/image uploads (Supabase Storage free tier)
- [ ] Deploy (Vercel/Netlify frontend, Railway/Render backend)
