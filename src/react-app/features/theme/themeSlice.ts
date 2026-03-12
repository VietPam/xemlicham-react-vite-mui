// src/react-app/features/theme/themeSlice.ts
import { createSlice } from "@reduxjs/toolkit";

// 1. Check if the user already saved a preference in their browser
const getInitialMode = (): "light" | "dark" => {
  const savedMode = localStorage.getItem("themeMode");
  return savedMode === "dark" ? "dark" : "light";
};

interface ThemeState {
  mode: "light" | "dark";
}

const initialState: ThemeState = {
  mode: getInitialMode(),
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      // 2. Flip the mode
      state.mode = state.mode === "light" ? "dark" : "light";
      // 3. Save it to localStorage
      localStorage.setItem("themeMode", state.mode);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;