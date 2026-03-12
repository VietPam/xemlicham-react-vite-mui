// src/react-app/App.tsx
import { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline, Box, Container, Toolbar, createTheme } from "@mui/material";
import { store } from "@/app/store";
import { useAppSelector } from "@/app/hooks"; // <-- Add this
import { getDesignTokens } from "@/theme/theme"; // <-- Import the new function
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { CalendarTable } from "@/features/calendar/components/CalendarTable";
import { SearchDateDialog } from "@/features/calendar/components/SearchDateDialog";
import { EventsPage } from "@/pages/EventsPage";
import { SettingsPage } from "@/pages/SettingsPage";

const drawerWidth = 260;

// 1. Create a wrapper component that can listen to Redux
function AppContent() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // 2. Get the current mode from Redux
  const mode = useAppSelector((state) => state.theme.mode);

  // 3. Generate the MUI Theme dynamically (useMemo prevents unnecessary re-renders)
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* Important: Use bgcolor="background.default" so it switches automatically! */}
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
          
          <TopBar drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
          <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
          
          <Box component="main" sx={{ flexGrow: 1, p: { xs: 0, sm: 3 }, width: { sm: `calc(100% - ${drawerWidth}px)` }, height: "100vh", overflow: "auto" }}>
            <Toolbar /> 
            <Routes>
              <Route path="/" element={<Container disableGutters={true} maxWidth="lg" sx={{ pt: { xs: 1, sm: 2 } }}><CalendarTable /></Container>} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </Box>

        </Box>
        <SearchDateDialog />
      </Router>
    </ThemeProvider>
  );
}

// 4. App just provides the Redux Store now
function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;