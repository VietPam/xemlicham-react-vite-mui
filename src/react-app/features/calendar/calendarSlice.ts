// src/react-app/features/calendar/calendarSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

interface CalendarState {
  month: number;
  year: number;
  selectedDate: string | null;
  viewMode: "month" | "year";
  isSearchDialogOpen: boolean;
}

const initialState: CalendarState = {
  month: dayjs().month() + 1,
  year: dayjs().year(),
  selectedDate: dayjs().format("YYYY-MM-DD"),
  viewMode: "month",
  isSearchDialogOpen: false,
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    next: (state) => {
      if (state.viewMode === "year") {
        state.year += 1;
      } else {
        if (state.month === 12) { state.month = 1; state.year += 1; } 
        else { state.month += 1; }
      }
    },
    prev: (state) => {
      if (state.viewMode === "year") {
        state.year -= 1;
      } else {
        if (state.month === 1) { state.month = 12; state.year -= 1; } 
        else { state.month -= 1; }
      }
    },
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    setViewMode: (state, action: PayloadAction<"month" | "year">) => {
      state.viewMode = action.payload;
    },
    jumpToMonth: (state, action: PayloadAction<number>) => {
      state.month = action.payload;
      state.viewMode = "month";
    },
    // ---> ADD THIS NEW REDUCER <---
    jumpToDate: (state, action: PayloadAction<{ day: number; month: number; year: number }>) => {
      const { day, month, year } = action.payload;
      
      // 1. Jump to the correct month/year
      state.month = month;
      state.year = year;
      
      // 2. Force the view into 'month' mode so the user actually sees the grid
      state.viewMode = "month"; 
      
      // 3. Set the selected date (formatting it as YYYY-MM-DD to match standard formats)
      const formattedMonth = String(month).padStart(2, '0');
      const formattedDay = String(day).padStart(2, '0');
      state.selectedDate = `${year}-${formattedMonth}-${formattedDay}`;
    },
    openSearchDialog: (state) => {
      state.isSearchDialogOpen = true;
    },
    closeSearchDialog: (state) => {
      state.isSearchDialogOpen = false;
    },
    clearSelectedDate: (state) => {
      state.selectedDate = null; // or null, depending on how you typed it
    }
  },
});

export const { next, prev, setSelectedDate, setViewMode, jumpToMonth, openSearchDialog, closeSearchDialog, jumpToDate, clearSelectedDate } = calendarSlice.actions;
export default calendarSlice.reducer;