# Self-Improvement Tracker

A modern **Self-Improvement and Goal Tracking application** built with **Vue 3**.

This application helps users manage long-term goals, build consistent habits, and track personal growth through data-driven insights.

The project originally started as a **Todo List application** and evolved into a **personal productivity and self-improvement platform**.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Documentation](#documentation)
- [Future Vision](#future-vision)
- [License](#license)

---

# Overview

The Self-Improvement Tracker focuses on helping users develop better habits and achieve meaningful goals.

Instead of simply tracking tasks, the system encourages **continuous self-development** by combining:

- Goal planning
- Habit tracking
- Daily reflection
- Progress analytics

---

# Features

## Goal Management

Users can create and manage long-term goals.

Examples:

- Learn a programming language
- Improve fitness
- Read a number of books
- Build a portfolio

Features include:

- Create goals
- Edit goals
- Delete goals
- Set deadlines
- Track goal progress
- Organize goals into milestones

---

## Habit Tracking

Habit tracking allows users to build daily routines and maintain consistency.

Users can:

- Create habits
- Track daily completion
- Monitor streaks
- View habit history

Example habits:

- Study 1 hour per day
- Exercise daily
- Read 20 pages

---

## Dashboard

The dashboard provides a quick overview of the user’s progress.

Information displayed:

- Today's habits
- Goal progress
- Habit streaks
- Activity summary

---

## Journal / Reflection

Users can write daily reflections to review their progress.

Examples:

- What did you learn today?
- What went well?
- What can be improved?

This feature supports personal awareness and long-term growth.

---

## Progress Analytics

The application visualizes user progress through charts and statistics.

Examples:

- Habit completion rate
- Goal progress
- Weekly productivity trends

---

# Tech Stack

## Frontend

- Vue.js 3 (Composition API)
- Vite 7
- Pinia (State Management)
- Vue Router
- Tailwind CSS
- PostCSS

## Runtime

- Node.js (v20 / v22+)

## Optional Libraries

Charts and visualization:

- Chart.js
- ApexCharts
- ECharts

---

# Project Structure

```
src/
├── components/          # Reusable Vue components
├── views/               # Page components
├── stores/              # Pinia stores
├── router/              # Vue Router configuration
├── services/            # API services
├── composables/         # Reusable Vue composables
└── utils/               # Utility functions
```

---

# Getting Started

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-repo/self-improvement-app.git
cd self-improvement-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

# Documentation

For detailed architecture and development guidelines, see:

- [ARCHITECTURE.md](ARCHITECTURE.md) — Application architecture
- [ROADMAP.md](ROADMAP.md) — Development roadmap

---

# Future Vision

This application aims to become a complete personal growth system. Future versions may include:

- Cloud synchronization (via Supabase)
- AI-powered **Goal Coach** (Optional feature)
- Gamification elements (XP, Levels, Badges)
- Advanced productivity analytics
- Mobile app version

---

# License

[MIT License](LICENSE)
