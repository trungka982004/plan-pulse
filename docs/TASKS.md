# To-Do Tasks Breakdown

This list breaks down the roadmap from the `ROADMAP.md` file and the current Todo List project analysis process into **specific tasks** that can be started immediately.

**Total of 24 Tasks** ranging from refactoring old code to completion of Phase 4.

---

## Phase 0: Restructuring & Foundation (Refactoring) ✅
Clean up and reorganize the current Todo project.
- [x] **Task 0.1:** Reorganize standard folder structure (create `services/`, `composables/`, `utils/`, rename `store` -> `stores`).
- [x] **Task 0.2:** Refactor Todo components (rename and separate into `Goal base` & `Habit base`).
- [x] **Task 0.3:** Build new system layout (Basic Sidebar/Navbar for navigation).
- [x] **Task 0.4:** Establish Service Layer (Mock API using LocalStorage) to simulate backend.

---

## Phase 1: Minimum Viable Product (MVP) ✅
Complete minimum functional flows to make the application run.
- [x] **Task 1.1:** Develop Authentication feature (Register, Login, Logout - handle Mock/Local).
- [x] **Task 1.2:** Build Goals Management module (View, Create, Edit, Delete).
- [x] **Task 1.3:** Build Habits Management module (View, Create, Daily check-in button).
- [x] **Task 1.4:** Design and build `DashboardView` page (Display today's Habits list, overview of a few Goals).
- [x] **Task 1.5:** Configure and connect Vue Router system linking all Phase 1 pages.

---

## Phase 2: Core Product ✅
Upgrade the application to truly become a self-development tool.
- [x] **Task 2.1:** Add **Milestones** feature for Goals (Break down large goals into smaller stages).
- [x] **Task 2.2:** Build **Habit Calendar** (Visual calendar showing the check-in history of a habit in a month).
- [x] **Task 2.3:** Build **Journal / Reflection** module (Record daily emotion logs/reflections).
- [x] **Task 2.4:** Build preliminary **Analytics / Statistics** module (Simple pie charts/progress for Goals/Habits).

---

## Phase 3: UX Improvements ✅
Polish and improve user experience (UX) and user interface (UI).
- [x] **Task 3.1:** Write logic for Habit streak counter system and display on UI.
- [x] **Task 3.2:** Add Goal filters & categorization (Goal Categories/Tags).
- [x] **Task 3.3:** Integrate **Drag & Drop** feature (Drag and drop to reorder tasks or change milestone status).
- [x] **Task 3.4:** Complete **Dark/Light Mode** from the existing settingStore.
- [x] **Task 3.5:** Integrate powerful charting libraries (like `Chart.js` or `ApexCharts`) into the Analytics module.

---

## Phase 4: Advanced Features & Backend (Supabase) ✅
Bring the application to a real environment with a powerful Backend (Supabase) and smart features.

- [x] **Task 4.1:** **Supabase Integration:** Automatically sync Goals/Habits to Cloud & Secure Auth System (Router Guards).
- [x] **Task 4.2:** **AI Goal Coach:** Integrate Gemini 2.5 Pro to provide personalized strategies and habit analysis.
- [x] **Task 4.3:** **Advanced Analytics:** Productivity Score system (40% Goals - 60% Habits) & Visual charts.
- [x] **Task 4.4:** **Smart Notifications:** Intelligent 3-tier notification system (Morning, Evening, Celebration) via Web Push & In-app Bell UI.

---

## Phase 5: Security & Profile Customization (Polishing) ✅
Enhance security, personalization, and UI aesthetics for a premium feel.

- [x] **Task 5.1:** **Secure Password Management:** Two-step verification for password changes & visibility toggles (Eye icon).
- [x] **Task 5.2:** **User Profile Enhancement:** Profile Bio support & Avatar management (URL/Local upload to Supabase Storage).
- [x] **Task 5.3:** **Premium UI Overhaul:** Implement Gradient design (Analysis-style) for all major action buttons & custom icons.
- [x] **Task 5.4:** **Persistence & Stability:** Fix "Auth Refresh Link" issues with Async Router Guards & handle browser permissions for Push Notifications.
- [x] **Task 5.5:** **Database Consolidation:** Finalize Master SQL Schema (RLS, Triggers, Storage Policies).

---
*Project progress: **100% Complete (29/29 Tasks)**. Ready for real-world deployment!* 🚀🎊

