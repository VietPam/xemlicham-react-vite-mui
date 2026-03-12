# Lunar Calendar Platform – Project Milestones

This document defines the structured milestones for the Lunar Calendar Platform. The execution is broken down into four primary phases, ensuring the core engine is isolated, fully tested, and ready for future integrations (such as cloud synchronization or financial calendar extensions).

---

## Milestone 1: Project Foundation & UI Skeleton
**Goal:** Establish the development environment, architectural boilerplate, and a static representation of the calendar UI. 

### Deliverables:
* **Repository Setup:** Initialize Vite + React + TypeScript project with ESLint, Prettier, and absolute import path configurations.
* **Architecture Implementation:** Create the `src` folder structure separating `core`, `features`, `pages`, and `components`.
* **State Management:** Configure Redux Toolkit with an empty `calendarSlice` and `eventSlice`.
* **Theme & Layout:** Setup Material UI (MUI) custom theme (`theme.ts`) and build the `MainLayout.tsx`.
* **Static UI Components:** * Develop `CalendarTable.tsx`, `CalendarHeader.tsx`, and `CalendarCell.tsx`.
  * Render a standard 30/31-day solar grid using Dayjs (mocking the lunar data for now).

### Definition of Done (DoD):
* Application compiles without TypeScript or ESLint errors.
* The calendar grid renders correctly for any given standard solar month.
* Redux store is successfully provided to the React tree.

---

## Milestone 2: Core Lunar Engine Implementation
**Goal:** Build the framework-independent mathematical and astronomical engine for calendar conversions. This is the most critical technical milestone.

### Deliverables:
* **Astronomical Base Modules:**
  * Implement `julianDay.ts` (Gregorian ↔ Julian conversions).
  * Implement `sunLongitude.ts` (Solar terms detection).
  * Implement `newMoon.ts` (Lunar month boundaries).
* **Core Logic & Rules:**
  * Implement `leapMonth.ts` to calculate missing solar terms and determine leap months.
* **Conversion APIs:**
  * Implement `solarToLunar.ts` returning `{ day, month, year, leap }`.
  * Implement `lunarToSolar.ts`.
* **Unit Testing Pipeline:**
  * Write comprehensive test suites verifying conversions across edge cases and the 1900–2100 century range.

### Definition of Done (DoD):
* Core modules have zero dependencies on React or DOM APIs.
* Test coverage for the `core/lunarEngine` directory is at least 90%.
* Lunar/Solar conversions match verified historical and future lunar data precisely.

---

## Milestone 3: Event System & State Integration
**Goal:** Connect the UI layer to the Core Engine and implement the lunar-based event management system.

### Deliverables:
* **Engine Integration:** Wire the `calendarSlice` to the core engine so the `CalendarTable` dynamically displays accurate lunar dates beneath solar dates.
* **Event Data Model:** Define TS interfaces for the `Event` structure (birthdays, death anniversaries, recurring lunar events).
* **Event State & Hooks:** * Implement `eventSlice.ts` to handle CRUD operations for user events.
  * Create `useLunarDate.ts` hook to dynamically calculate the current year's solar equivalent for recurring lunar events.
* **UI Updates:** * Add visual indicators (dots/badges) on `CalendarCell` for days with events.
  * Create a modal/drawer for users to add and edit lunar events.

### Definition of Done (DoD):
* Users can navigate between months, and lunar dates calculate instantly without UI lag.
* Users can add a recurring lunar event, and it correctly appears on the corresponding solar date for the currently viewed year.

---

## Milestone 4: Advanced Features & Optimization
**Goal:** Polish the application, optimize performance for the heavy mathematical calculations, and introduce cultural/niche features.

### Deliverables:
* **Performance Optimization:** * Implement memoization for heavy astronomical calculations.
  * Establish precomputed lookup tables for common years if necessary to reduce CPU load.
* **Holiday & Zodiac Modules:** * Implement the `features/holidays` module to automatically flag Tet, Mid-Autumn Festival, etc.
  * Implement the `features/zodiac` module (Can Chi calculations, zodiac animals).
* **Financial/Trading Calendar Groundwork:** Build out UI extensions capable of overlaying market-specific data (e.g., trading settlement days or market closures based on lunar holidays) alongside traditional events.
* **SEO & Deployment:** Generate `sitemap.xml` and `robots.txt`, verify with Search Console, and deploy via a serverless platform (e.g., Cloudflare Pages or Cloud Run).

### Definition of Done (DoD):
* Performance profiling shows no dropped frames during rapid month-to-month navigation.
* SEO metadata is correctly configured for production.
* Vietnamese traditional holidays populate automatically without user input.

---

## Future Milestone (Phase 5): Cloud Native Sync & Multi-Agent Support
* **Backend API:** Extract the standalone `core/lunarEngine` to a serverless backend environment.
* **Database Integration:** Persist user events in a cloud database with user authentication.
* **LLM Integration:** Expose the calendar state and event endpoints to an Orchestrator-Worker AI chatbot system, allowing users to query their lunar schedule naturally via text.