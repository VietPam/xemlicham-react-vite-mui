import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

interface CalendarState {
  month: number; // 1-12
  year: number;
  selectedDate: string | null; // ISO string like YYYY-MM-DD
}

const initialState: CalendarState = {
  month: dayjs().month() + 1, // dayjs months are 0-indexed (0-11)
  year: dayjs().year(),
  selectedDate: dayjs().format("YYYY-MM-DD"),
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    nextMonth: (state) => {
      if (state.month === 12) {
        state.month = 1;
        state.year += 1;
      } else {
        state.month += 1;
      }
    },
    prevMonth: (state) => {
      if (state.month === 1) {
        state.month = 12;
        state.year -= 1;
      } else {
        state.month -= 1;
      }
    },
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
  },
});

export const { nextMonth, prevMonth, setSelectedDate } = calendarSlice.actions;
export default calendarSlice.reducer;