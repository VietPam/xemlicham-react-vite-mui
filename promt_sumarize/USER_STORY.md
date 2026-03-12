# Lunar Calendar Platform – User Story Milestones

This document defines the project milestones through the lens of user experience. Each milestone is considered complete only when the defined user stories pass their acceptance criteria.

---

## Milestone 1: Project Foundation & Static UI
**Focus:** Establishing the visual framework and basic solar calendar navigation.

* **User Story 1.1: View Current Month**
    * *As a user,* I want to open the application and immediately see a standard solar calendar for the current month.
    * **Acceptance Criteria:** The calendar grid displays the correct number of days (28, 29, 30, or 31) starting on the correct day of the week based on the user's system time.
* **User Story 1.2: Navigate Solar Months**
    * *As a user,* I want to click "Next" and "Previous" buttons to navigate through different months and years.
    * **Acceptance Criteria:** The UI updates instantly without page reloads, and the header correctly displays the currently viewed month and year.
* **User Story 1.3: Responsive Layout**
    * *As a user,* I want to view the calendar on my mobile phone or desktop so that I can check dates on any device.
    * **Acceptance Criteria:** The Material UI grid adapts to different screen sizes without breaking the table structure or hiding necessary text.

---

## Milestone 2: Core Lunar Integration
**Focus:** Powering the UI with the framework-independent mathematical engine.

* **User Story 2.1: View Lunar Dates**
    * *As a user,* I want to see the corresponding lunar date written beneath every standard solar date on the calendar.
    * **Acceptance Criteria:** Every cell displays a secondary, smaller number representing the lunar day. If it is the 1st of the lunar month, the lunar month is also displayed (e.g., "1/3").
* **User Story 2.2: Identify Leap Months**
    * *As a user,* I want to easily identify if a lunar month is a leap month so I can track traditional timings accurately.
    * **Acceptance Criteria:** Lunar leap months are visually distinct (e.g., marked with a specific icon or text like "Nhuận").
* **User Story 2.3: Accurate Historical and Future Browsing**
    * *As a user,* I want to navigate to a past year (e.g., 1990) or a future year (e.g., 2050) and trust that the lunar dates are mathematically accurate.
    * **Acceptance Criteria:** The UI successfully queries the core engine for any date between 1900–2100, and the displayed data matches verified astronomical records.

---

## Milestone 3: Lunar Event System
**Focus:** Allowing users to personalize the calendar with recurring, lunar-based events.

* **User Story 3.1: Add a Lunar Event**
    * *As a user,* I want to select a date and add a recurring event based on the *lunar* calendar (like a death anniversary or birthday).
    * **Acceptance Criteria:** The user can fill out a form (Title, Lunar Day, Lunar Month, Repeat Yearly) and save it to the local state.
* **User Story 3.2: View Events in the Current Year**
    * *As a user,* I want to look at the calendar for the current year and see exactly which solar day my saved lunar event falls on.
    * **Acceptance Criteria:** The application automatically converts the saved lunar event to the correct solar date for the currently viewed year and displays an event indicator (like a dot) on that specific calendar cell.
* **User Story 3.3: Event Details**
    * *As a user,* I want to click on a day that has an event indicator to read the details of what is happening that day.
    * **Acceptance Criteria:** Clicking a cell opens a modal or side panel listing the titles and descriptions of all events falling on that date.

---

## Milestone 4: Cultural & Advanced Features
**Focus:** Adding pre-packaged value through traditional data and optimizing the experience.

* **User Story 4.1: Traditional Holidays**
    * *As a user,* I want traditional Vietnamese holidays (like Tết or Vu Lan) to be automatically marked on the calendar without me having to add them manually.
    * **Acceptance Criteria:** Standard traditional holidays are pre-configured, instantly converted to the correct solar dates each year, and displayed distinctly from personal events.
* **User Story 4.2: Zodiac Information (Can Chi)**
    * *As a user,* I want to click on a specific day and see its "Can Chi" (zodiac designation for day, month, and year).
    * **Acceptance Criteria:** The event details panel includes the calculated Heavenly Stems and Earthly Branches for the selected date.

---

## Future Expansion: Finance & Cloud 
**Focus:** Scaling the application beyond a simple personal tool.

* **User Story 5.1: Cross-Device Sync**
    * *As a user,* I want to log in so that the personal lunar events I added on my phone also appear on my laptop.
    * **Acceptance Criteria:** Events sync seamlessly via a cloud database instead of relying purely on local browser storage.
* **User Story 5.2: Financial Market Planning**
    * *As a user,* I want to toggle a "Finance Calendar" mode to see how traditional multi-day holidays impact stock market operations.
    * **Acceptance Criteria:** The calendar overlays standard T+2.5 settlement delays, visually pushing settlement dates past prolonged lunar holiday closures (like the Tết break).