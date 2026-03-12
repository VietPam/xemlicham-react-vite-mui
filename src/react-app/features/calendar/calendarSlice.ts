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
    jumpToDate: (state, action: PayloadAction<{ month: number; year: number }>) => {
      state.month = action.payload.month;
      state.year = action.payload.year;
    },
    openSearchDialog: (state) => {
      state.isSearchDialogOpen = true;
    },
    closeSearchDialog: (state) => {
      state.isSearchDialogOpen = false;
    },
  },
});

export const { next, prev, setSelectedDate, setViewMode, jumpToMonth, openSearchDialog, closeSearchDialog, jumpToDate } = calendarSlice.actions;
export default calendarSlice.reducer;