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
import EventNoteIcon from "@mui/icons-material/EventNote";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAppDispatch } from "@/app/hooks";
import { openSearchDialog } from "@/features/calendar/calendarSlice";

interface SidebarProps {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

export const Sidebar = ({ drawerWidth, mobileOpen, handleDrawerToggle }: SidebarProps) => {
  const dispatch = useAppDispatch();
  // We put the contents in a variable so we don't write it twice!
  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar sx={{ my: 1 }}>
        <Box sx={{ bgcolor: "primary.main", color: "white", p: 1, borderRadius: 1, display: "flex", mr: 1.5 }}>
          <CalendarMonthIcon />
        </Box>
        <Typography variant="h6" fontWeight="bold" color="primary.main">
          Lịch Âm
        </Typography>
      </Toolbar>

      <Divider />

      <Box sx={{ overflow: "auto", mt: 2 }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton sx={{ mx: 1, borderRadius: 1, backgroundColor: "#fff5f5" }}>
              <ListItemIcon sx={{ color: "primary.main" }}><CalendarMonthIcon /></ListItemIcon>
              <ListItemText primary="Lịch Của Tôi" primaryTypographyProps={{ fontWeight: "bold", color: "primary.main" }} />
            </ListItemButton>
          </ListItem>
          {/* Search / Jump to Date Button */}
          {/* Search / Jump to Date Button */}
          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => {
                dispatch(openSearchDialog());
                if (mobileOpen) handleDrawerToggle(); // Closes sidebar on mobile after clicking
              }}
              sx={{ mx: 1, borderRadius: 1, "&:hover": { backgroundColor: "#f5f7fa" } }}
            >
              <ListItemIcon><SearchIcon /></ListItemIcon>
              <ListItemText primary="Tìm Ngày" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{ mx: 1, borderRadius: 1, "&:hover": { backgroundColor: "#f5f7fa" } }}>
              <ListItemIcon><EventNoteIcon /></ListItemIcon>
              <ListItemText primary="Quản Lý Sự Kiện" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      <Box sx={{ mt: "auto", mb: 2 }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton sx={{ mx: 1, borderRadius: 1, "&:hover": { backgroundColor: "#f5f7fa" } }}>
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText primary="Cài Đặt" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
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