// src/react-app/App.tsx
import { useState } from "react";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline, Box, Container, Toolbar } from "@mui/material"; // Removed old AppBar imports
import { store } from "@/app/store";
import { theme } from "@/theme/theme";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar"; // <-- Import the new TopBar
import { CalendarTable } from "@/features/calendar/components/CalendarTable";

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
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f7fa" }}>
          
          {/* The New Global Top Bar */}
          <TopBar drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />

          {/* The Responsive Sidebar */}
          <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
          
          {/* Main Content Area */}
          <Box component="main" sx={{ flexGrow: 1, p: { xs: 0, sm: 3 }, width: { sm: `calc(100% - ${drawerWidth}px)` }, height: "100vh", overflow: "auto" }}>
            
            {/* THIS SPACER IS NOW VISIBLE ON ALL SCREENS to push content below the TopBar */}
            <Toolbar /> 
            
            <Container disableGutters={true} maxWidth="lg" sx={{ pt: { xs: 1, sm: 2 } }}> 
              <CalendarTable />
            </Container>
          </Box>

        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;