// src/react-app/components/Sidebar.tsx
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Toolbar, 
  Typography, 
  Box, 
  Divider 
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search"
import EventIcon from "@mui/icons-material/Event";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAppDispatch } from "@/app/hooks";
import { openSearchDialog } from "@/features/calendar/calendarSlice";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

export const Sidebar = ({ drawerWidth, mobileOpen, handleDrawerToggle }: SidebarProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // <-- Add this
  const location = useLocation(); // <-- Add this to know the current path

  // Helper function to handle navigation and close the mobile menu
  const handleNavigate = (path: string) => {
    navigate(path);
    if (mobileOpen) handleDrawerToggle();
  };
  const drawerContent = (
    <div>
      <Toolbar>
        <Typography variant="h6" fontWeight="bold" color="primary">Lịch Vạn Niên</Typography>
      </Toolbar>
      <Divider />
      <List sx={{ px: 1 }}>
        
        {/* Lịch Của Tôi (Home) */}
        <ListItem disablePadding>
          <ListItemButton 
            selected={location.pathname === "/"} // Highlights if active
            onClick={() => handleNavigate("/")}
            sx={{ borderRadius: 1, mb: 0.5 }}
          >
            <ListItemIcon><CalendarMonthIcon color={location.pathname === "/" ? "primary" : "inherit"} /></ListItemIcon>
            <ListItemText primary="Lịch Của Tôi" sx={{ color: location.pathname === "/" ? "primary.main" : "inherit" }} />
          </ListItemButton>
        </ListItem>

        {/* Sự kiện của tôi */}
        <ListItem disablePadding>
          <ListItemButton 
            selected={location.pathname === "/events"}
            onClick={() => handleNavigate("/events")}
            sx={{ borderRadius: 1, mb: 0.5 }}
          >
            <ListItemIcon><EventIcon color={location.pathname === "/events" ? "primary" : "inherit"} /></ListItemIcon>
            <ListItemText primary="Sự kiện của tôi" sx={{ color: location.pathname === "/events" ? "primary.main" : "inherit" }} />
          </ListItemButton>
        </ListItem>

        {/* Tìm Ngày (Keep this as a Redux action, not a route!) */}
        <ListItem disablePadding>
          <ListItemButton 
            onClick={() => {
              dispatch(openSearchDialog());
              if (mobileOpen) handleDrawerToggle();
            }}
            sx={{ borderRadius: 1, mb: 0.5 }}
          >
            <ListItemIcon><SearchIcon /></ListItemIcon>
            <ListItemText primary="Tìm Ngày" />
          </ListItemButton>
        </ListItem>

      </List>
      
      <Divider sx={{ my: 1 }} />
      
      <List sx={{ px: 1 }}>
        {/* Cài đặt */}
        <ListItem disablePadding>
          <ListItemButton 
            selected={location.pathname === "/settings"}
            onClick={() => handleNavigate("/settings")}
            sx={{ borderRadius: 1 }}
          >
            <ListItemIcon><SettingsIcon color={location.pathname === "/settings" ? "primary" : "inherit"} /></ListItemIcon>
            <ListItemText primary="Cài đặt" sx={{ color: location.pathname === "/settings" ? "primary.main" : "inherit" }} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      
      {/* 1. MOBILE DRAWER (Temporary) */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} // Better open performance on mobile
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: "none" },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* 2. DESKTOP DRAWER (Permanent) */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: "#ffffff", borderRight: "1px solid #e0e0e0" },
        }}
        open
      >
        {drawerContent}
      </Drawer>
      
    </Box>
  );
};