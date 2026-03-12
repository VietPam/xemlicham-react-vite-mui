# Lunar Calendar Platform – Project Plan

## 1. Project Overview

This project is a **React + TypeScript + MUI application** designed to display a calendar and support future features related to **Vietnamese lunar dates**.

The system will allow users to:

* Display a calendar table
* Convert between solar and lunar dates
* Store important events using lunar dates
* Automatically calculate yearly solar equivalents of lunar events
* Extend the platform with additional features later

The project is designed to be **feature-based and scalable**, with a **separation between UI and calendar calculation logic**.

---

# 2. Technology Stack

## Frontend

* React
* TypeScript
* Vite
* MUI (Material UI)
* Redux Toolkit
* Dayjs

## State Management

* Redux Toolkit
* RTK Query (future)

## Development Tools

* ESLint
* Prettier
* Absolute imports
* Feature-based architecture

---

# 3. High Level Architecture

The project is divided into **three main layers**.

```
UI Layer
State Layer
Core Engine
```

### UI Layer

Responsible for:

* rendering components
* user interaction
* page layout

### State Layer

Responsible for:

* global state
* calendar state
* event state

### Core Engine

Responsible for:

* lunar calculations
* solar conversions
* astronomy algorithms

This layer **must not depend on React**.

---

# 4. Feature-Based Source Structure

```
src
│
├── app
│   ├── store.ts
│   ├── hooks.ts
│   └── providers
│
├── core
│   └── lunarEngine
│       ├── julianDay.ts
│       ├── newMoon.ts
│       ├── sunLongitude.ts
│       ├── leapMonth.ts
│       ├── solarToLunar.ts
│       ├── lunarToSolar.ts
│       └── types.ts
│
├── features
│
│   ├── calendar
│   │   ├── components
│   │   │   ├── CalendarTable.tsx
│   │   │   ├── CalendarHeader.tsx
│   │   │   └── CalendarCell.tsx
│   │   │
│   │   ├── calendarSlice.ts
│   │   ├── calendarSelectors.ts
│   │   └── types.ts
│
│   ├── lunar
│   │   ├── hooks
│   │   │   └── useLunarDate.ts
│   │   └── utils
│   │
│   └── events
│       ├── components
│       ├── eventSlice.ts
│       ├── eventSelectors.ts
│       └── types.ts
│
├── pages
│   └── CalendarPage.tsx
│
├── components
│   └── layout
│       └── MainLayout.tsx
│
├── utils
│
├── theme
│   └── theme.ts
│
├── App.tsx
└── main.tsx
```

---

# 5. Core Lunar Engine

The lunar engine is the **most important part of the system**.

It must be:

* framework independent
* reusable
* deterministic
* fully tested

Directory:

```
core/lunarEngine
```

## Core Modules

### Julian Day Conversion

```
julianDay.ts
```

Responsibilities:

* convert Gregorian date → Julian Day Number
* convert Julian Day → Gregorian date

---

### New Moon Calculation

```
newMoon.ts
```

Responsibilities:

* calculate the time of each new moon
* determine lunar month boundaries

---

### Solar Longitude

```
sunLongitude.ts
```

Responsibilities:

* compute the sun’s longitude
* detect solar terms
* determine leap month rules

---

### Leap Month Logic

```
leapMonth.ts
```

Responsibilities:

* determine if a lunar month is a leap month
* detect missing solar terms

---

### Solar to Lunar Conversion

```
solarToLunar.ts
```

Responsibilities:

* convert Gregorian date → lunar date

Output structure:

```
{
  day
  month
  year
  leap
}
```

---

### Lunar to Solar Conversion

```
lunarToSolar.ts
```

Responsibilities:

* convert lunar date → Gregorian date

Used for:

* birthdays
* death anniversaries
* traditional holidays

---

# 6. Calendar Feature

Location:

```
features/calendar
```

Responsibilities:

* render monthly calendar
* show solar date
* show lunar date
* highlight events

Components:

```
CalendarTable
CalendarHeader
CalendarCell
```

Example calendar cell data:

```
{
  solarDate
  lunarDate
  events
}
```

---

# 7. Event System

Location:

```
features/events
```

The system allows users to store events based on **lunar dates**.

Example events:

* birthdays
* death anniversaries
* festivals
* personal reminders

---

## Event Data Model

```
Event
```

Structure:

```
{
  id
  title
  description
  lunarDay
  lunarMonth
  lunarYear
  isLeapMonth
  repeatYearly
}
```

---

## Example

```
{
  title: "Grandfather death anniversary",
  lunarDay: 10,
  lunarMonth: 3,
  repeatYearly: true
}
```

Each year the system will compute:

```
solarDate = lunarToSolar(day, month, currentYear)
```

---

# 8. Redux State Design

## Calendar State

```
calendar
```

Structure:

```
{
  month
  year
  selectedDate
}
```

---

## Event State

```
events
```

Structure:

```
{
  events[]
}
```

---

# 9. Calendar Rendering Logic

Steps:

1. get current month
2. generate all solar dates
3. convert each date to lunar
4. load events
5. render calendar grid

Flow:

```
Month selected
    ↓
Generate solar days
    ↓
Convert to lunar dates
    ↓
Load stored events
    ↓
Render calendar UI
```

---

# 10. Future Features

The architecture is designed to support additional modules.

Possible future features:

### Lunar Holiday System

```
features/holidays
```

Examples:

* Tet
* Mid Autumn Festival
* Vu Lan

---

### Astrology

```
features/zodiac
```

Examples:

* Can Chi
* Zodiac animals
* Lucky days

---

### Finance Calendar

Possible future integration:

* stock market calendar
* trading signals
* economic events

---

### Cloud Sync

Future expansion:

* backend API
* database storage
* user accounts

---

# 11. Performance Considerations

Lunar calculations are expensive.

Possible optimization strategies:

### Memoization

Cache computed results.

### Precomputed Tables

Use lookup tables for years 1900–2100.

### Indexed Event Lookup

Events indexed by:

```
lunarMonth + lunarDay
```

---

# 12. Testing Strategy

Core engine must be fully tested.

Test cases:

* solar → lunar conversion
* lunar → solar conversion
* leap month handling
* edge cases across centuries

Example test range:

```
1900 – 2100
```

---

# 13. Development Phases

## Phase 1

Project foundation

* React setup
* MUI integration
* Redux setup
* calendar table UI

---

## Phase 2

Core lunar engine

* Julian day
* new moon
* solar longitude
* conversion functions

---

## Phase 3

Event system

* store lunar events
* yearly conversion
* calendar highlighting

---

## Phase 4

Advanced features

* holiday detection
* zodiac
* cloud sync

---

# 14. Key Design Principle

The **lunar engine must remain independent from React**.

```
React UI
   ↓
Redux State
   ↓
Lunar Engine
```

This ensures the engine can later be reused in:

* backend API
* mobile app
* other applications

---

# End of Document
