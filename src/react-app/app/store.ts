// src/react-app/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "@/features/calendar/calendarSlice";
import eventReducer from "@/features/events/eventSlice"; // <-- Add this

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    events: eventReducer, // <-- Add this
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;