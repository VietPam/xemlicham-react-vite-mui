import { createTheme } from "@mui/material/styles";

// src/react-app/theme/theme.ts
import { PaletteMode } from "@mui/material";

// We create a function that takes 'light' or 'dark' and returns the config
export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    // You can customize specific colors for each mode if you want!
    ...(mode === 'light'
      ? {
          // Custom Light Mode colors
          primary: { main: '#1976d2' },
          background: { default: '#f5f7fa', paper: '#ffffff' },
        }
      : {
          // Custom Dark Mode colors
          primary: { main: '#90caf9' }, // Lighter blue for dark mode
          background: { default: '#121212', paper: '#1e1e1e' },
        }),
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export const theme = createTheme({
  palette: {
    primary: {
      main: "#d32f2f", // A traditional red often used in Asian calendars
    },
    secondary: {
      main: "#f57c00",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});