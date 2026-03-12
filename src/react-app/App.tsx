// src/react-app/App.tsx
import { useState } from "react";
import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline, Box, Container, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { store } from "@/app/store";
import { theme } from "@/theme/theme";
import { Sidebar } from "@/components/Sidebar";
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
          
          {/* MOBILE ONLY APP BAR */}
          <AppBar
            position="fixed"
            elevation={0}
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
              display: { sm: 'none' }, // Hides on desktop
              bgcolor: "white",
              borderBottom: "1px solid #e0e0e0",
              color: "text.primary"
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" fontWeight="bold" color="primary.main">
                Lịch Âm
              </Typography>
            </Toolbar>
          </AppBar>

          {/* The Responsive Sidebar */}
          <Sidebar 
            drawerWidth={drawerWidth} 
            mobileOpen={mobileOpen} 
            handleDrawerToggle={handleDrawerToggle} 
          />
          
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1, 
              // 1. Change padding to 0 on mobile (xs)
              p: { xs: 0, sm: 3 }, 
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              height: "100vh", 
              overflow: "auto" 
            }}
          >
            <Toolbar sx={{ display: { sm: 'none' } }} /> 
            
            {/* 2. Add 'disableGutters' to remove the Container's built-in side padding on mobile */}
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