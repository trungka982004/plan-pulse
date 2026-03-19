# System Architecture

This document describes the architecture of the Self-Improvement application.

## High Level Architecture

```text
Frontend (Vue 3) <──────────┐
        │                   │
        │ Supabase Client   │ External AI API
        ▼                   │ (OpenAI/Gemini)
Supabase (BaaS)             │
        │                   │
        ├ Auth Service      │ (Only if active
        ├ Database (Postgres)◀── in Settings)
        ├ Storage (Assets)
        └ Edge Functions
```

## Frontend Architecture

The frontend is built using Vue 3 with Composition API and connects directly to Supabase via `@supabase/supabase-js`.

Main responsibilities:
- UI rendering & State management (Pinia).
- Direct communication with Supabase for Auth and Data.
- AI Goal Coach integration logic (triggered based on User Settings).
- Web Push notification handling via Service Workers.

### Frontend Folder Structure

```text
src
│
├ components
│   ├ goals / habits / journal
│   ├ settings (AI Coach Toggle)
│   └ analytics (Charts)
│   └ common
│
├ stores
│   ├ authStore.ts (Supabase Auth)
│   ├ goalStore.ts / habitStore.ts
│   └ settingStore.ts (AI Coach state)
│
├ services
│   ├ supabase.ts (Client Init)
│   ├ aiService.ts (OpenAI/Gemini)
│   └ notificationService.ts
│
├ views
│   ├ DashboardView.vue
│   ├ GoalsView.vue
│   ├ HabitsView.vue
│   ├ JournalView.vue
│   └ SettingsView.vue
│
├ composables
├ router
└ utils
```

### State Management

State is managed using Pinia.
Stores are organized by domain.

Examples:
- `authStore`
- `goalStore`
- `habitStore`
- `journalStore`
- `analyticsStore`

Example structure:
```text
goalStore
 ├ goals
 ├ activeGoal
 ├ fetchGoals()
 ├ createGoal()
 └ updateGoal()
```

## Backend (Supabase BaaS)

Instead of a custom Node.js server, the application uses **Supabase** as a Backend-as-a-Service:

- **Authentication**: Managed via Supabase Auth (supports Email/Password & Google OAuth).
- **Database**: PostgreSQL with Row Level Security (RLS) to ensure data privacy.
- **Direct CRUD**: The frontend interacts directly with the database using the Supabase client, eliminating the need for a separate API server for CRUD operations.
- **Service Layer**: Components and stores use a unified Service Layer that wraps Supabase SDK calls.

## AI Goal Coach Integration

The AI Goal Coach is an optional feature that connects to external LLM APIs (OpenAI GPT-4 or Gemini 1.5 Pro).

- **Activation**: Controlled by `settingStore` and a toggle in `SettingsView`.
- **Default State**: Inactive (Silent).
- **Functionality**:
    - Analyzes existing Goals to suggest Milestones.
    - Proposes new Habits based on defined Goals.
    - Provides periodic productivity insights.
- **Security**: API keys are stored in environment variables (for development) or handled via Supabase Edge Functions (for production) to avoid exposing keys on the client side.

## Database Design

### Users
```text
users
-----
id
email
password_hash
created_at
```

### Goals
```text
goals
-----
id
user_id
title
description
deadline
status
progress
created_at
```

### Milestones
```text
milestones
-----------
id
goal_id
title
deadline
progress
```

### Habits
```text
habits
------
id
user_id
name
frequency
created_at
```

### Habit Logs
```text
habit_logs
-----------
id
habit_id
date
completed
```

### Journal Entries
```text
journal_entries
----------------
id
user_id
content
mood
created_at
```

## Service Integration (Supabase Client)

Instead of traditional REST API endpoints, the frontend utilizes the `@supabase/supabase-js` client for:

### Authentication
- `supabase.auth.signUp()` / `supabase.auth.signInWithPassword()`
- `supabase.auth.signInWithOAuth({ provider: 'google' })`
- `supabase.auth.signOut()`

### Database CRUD (Real-time & RLS)
- `supabase.from('goals').select(*)`
- `supabase.from('habits').insert(...)`
- `supabase.from('milestones').update(...)`
- All queries are automatically scoped to the logged-in user via **PostgreSQL RLS policies**.

### AI Goal Coach (Conditional)
- Only if `settingsStore.aiCoachActive` is `true`:
  - Calls `aiService.getGoalSuggestions()` or `aiService.analyzeProgress()`.
  - These calls may target either an external API directly or a Supabase Edge Function.
