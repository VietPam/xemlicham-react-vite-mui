// src/react-app/features/events/eventSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LunarEvent {
  id: string;
  title: string;
  description?: string;
  lunarDay: number;
  lunarMonth: number;
  lunarYear?: number; 
  isLeapMonth: boolean;
  repeatYearly: boolean; // e.g., Death anniversaries or Tet
}

interface EventState {
  events: LunarEvent[];
}

const initialState: EventState = {
  events: [
    // Pre-loading a test event for Lunar New Year (Tết) so we can see it working immediately
    {
      id: "test-tet",
      title: "Tết Nguyên Đán",
      lunarDay: 1,
      lunarMonth: 1,
      isLeapMonth: false,
      repeatYearly: true,
    }
  ],
};

export const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<LunarEvent>) => {
      state.events.push(action.payload);
    },
    removeEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(e => e.id !== action.payload);
    }
  },
});

export const { addEvent, removeEvent } = eventSlice.actions;
export default eventSlice.reducer;