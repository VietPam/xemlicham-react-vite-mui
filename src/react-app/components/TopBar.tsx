// src/react-app/components/TopBar.tsx
import { AppBar, Toolbar, IconButton, Box, ToggleButtonGroup, ToggleButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setViewMode } from "@/features/calendar/calendarSlice";

interface TopBarProps {
  drawerWidth: number;
  handleDrawerToggle: () => void;
}

export const TopBar = ({ drawerWidth, handleDrawerToggle }: TopBarProps) => {
  const dispatch = useAppDispatch();
  const viewMode = useAppSelector((state) => state.calendar.viewMode);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        bgcolor: "white",
        borderBottom: "1px solid #e0e0e0",
        color: "text.primary"
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left Side: Hamburger Menu (Mobile Only) */}
        <Box display="flex" alignItems="center">
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Right Side: Global View Toggles */}
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(_, newMode) => {
            if (newMode) dispatch(setViewMode(newMode));
          }}
          size="small"
          color="primary"
        >
          <ToggleButton value="month" sx={{ px: { xs: 2, sm: 3 }, fontWeight: "bold" }}>
            Tháng
          </ToggleButton>
          <ToggleButton value="year" sx={{ px: { xs: 2, sm: 3 }, fontWeight: "bold" }}>
            Năm
          </ToggleButton>
        </ToggleButtonGroup>
      </Toolbar>
    </AppBar>
  );
};