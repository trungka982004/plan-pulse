# Development Roadmap

This document describes the development stages of the Self-Improvement App.

## Phase 1 — MVP

**Goal:** Build a minimum usable product.

**Features:**
- **Authentication**
  - Register
  - Login
  - Logout
- **Goal Management**
  - Create goals
  - Edit goals
  - Delete goals
- **Habit Tracking**
  - Create habits
  - Mark habits as completed
- **Dashboard**
  - Display today's habits
  - Show goal progress

**Pages:**
- Dashboard
- Goals
- Habits

## Phase 2 — Core Product

**Goal:** Turn the MVP into a real productivity tool.

**New features:**
- **Milestones**
  ```text
  Goal
   ├ milestone
   ├ milestone
  ```
- **Habit Calendar**
  Example:
  ```text
  ✔ ✔ ✘ ✔
  ✔ ✔ ✔ ✔
  ```
- **Journal / Reflection**
  - Users can write daily reflections.
- **Progress Analytics**
  - Habit completion charts
  - Goal progress visualization

**Pages:**
- Dashboard
- Goals
- Habits
- Journal
- Analytics

## Phase 3 — UX Improvements

Focus on improving user experience.

**Features:**
- Habit streak counter
- Goal categories
- Reminder notifications
- Drag and drop tasks
- Dark mode
- Data visualization charts

## Phase 4 — Advanced Features & Backend (Supabase)

**Goal:** Move to a real backend and add intelligent assistants.

**Features:**
- **Supabase Integration (BaaS)**
  - Authentication (Google/Email).
  - Real-time Database (PostgreSQL).
  - Data persistence across devices.
- **AI Goal Coach (Optional)**
  - Toggle in **Settings** (Off by default).
  - AI can help users:
    - Break large goals into smaller steps.
    - Suggest useful habits based on goals.
    - Provide productivity insights.
- **Advanced Analytics**
  - Productivity Score.
  - Long-term progress trends.
  - Deep-dive into habit success rates.
- **Smart Notifications**
  - Web Push reminders.
  - Milestones celebrations.
  - Motivational prompts.

## Long-Term Vision

The application aims to evolve into a complete personal growth platform combining:
- Goal planning
- Habit tracking
- Personal journaling
- Data-driven productivity insights

Future versions may include:
- AI productivity assistants
- Gamification elements (XP, Levels, Badges)
- Smart scheduling
- Cross-device synchronization
- Integration with calendar and health platforms
