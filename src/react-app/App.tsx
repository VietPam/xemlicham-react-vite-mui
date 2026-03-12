// src/react-app/App.tsx
import { useState } from "react";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline, Box, Container, Toolbar } from "@mui/material"; // Removed old AppBar imports
import { store } from "@/app/store";
import { theme } from "@/theme/theme";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar"; // <-- Import the new TopBar
import { CalendarTable } from "@/features/calendar/components/CalendarTable";
import { SearchDateDialog } from "@/features/calendar/components/SearchDateDialog";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EventsPage } from "@/pages/EventsPage";
import { SettingsPage } from "@/pages/SettingsPage";
const drawerWidth = 260;

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* 2. Wrap everything inside the Router */}
        <Router>
          <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
            
            <TopBar drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
            <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
            
            <Box component="main" sx={{ flexGrow: 1, p: { xs: 0, sm: 3 }, width: { sm: `calc(100% - ${drawerWidth}px)` }, height: "100vh", overflow: "auto" }}>
              <Toolbar /> 
              
              {/* 3. Replace the hardcoded CalendarTable with Routes */}
              <Routes>
                {/* Home Route: The Calendar */}
                <Route path="/" element={
                  <Container disableGutters={true} maxWidth="lg" sx={{ pt: { xs: 1, sm: 2 } }}> 
                    <CalendarTable />
                  </Container>
                } />
                
                {/* New Routes */}
                <Route path="/events" element={<EventsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>

            </Box>
          </Box>
          <SearchDateDialog />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;