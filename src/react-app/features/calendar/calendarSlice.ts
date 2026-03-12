import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

interface CalendarState {
  month: number;
  year: number;
  selectedDate: string | null;
  viewMode: "month" | "year"; // <-- Add this
}

const initialState: CalendarState = {
  month: dayjs().month() + 1,
  year: dayjs().year(),
  selectedDate: dayjs().format("YYYY-MM-DD"),
  viewMode: "month", // <-- Default to month view
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    next: (state) => { // Rename to a generic 'next'
      if (state.viewMode === "year") {
        state.year += 1;
      } else {
        if (state.month === 12) { state.month = 1; state.year += 1; } 
        else { state.month += 1; }
      }
    },
    prev: (state) => { // Rename to a generic 'prev'
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
      state.viewMode = "month"; // Auto-switch back to month view
    }
  },
});

export const { next, prev, setSelectedDate, setViewMode, jumpToMonth } = calendarSlice.actions;
export default calendarSlice.reducer;