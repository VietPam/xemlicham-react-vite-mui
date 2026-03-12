// src/react-app/pages/SettingsPage.tsx
import { Box, Typography, Switch, FormControlLabel, Paper, Divider } from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { toggleTheme } from "@/features/theme/themeSlice";

export const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);
  const isDark = mode === "dark";

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>Cài đặt</Typography>
      
      {/* Settings Card */}
      <Paper elevation={0} sx={{ borderRadius: 2, border: "1px solid", borderColor: "divider" }}>
        
        {/* Giao diện Section */}
        <Box sx={{ p: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box display="flex" alignItems="center" gap={2}>
            <Box sx={{ 
              p: 1, 
              borderRadius: 1, 
              bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
              display: "flex"
            }}>
              {isDark ? <DarkModeIcon color="primary" /> : <LightModeIcon color="primary" />}
            </Box>
            <Box>
              <Typography variant="h6" fontWeight="medium">Chế độ tối (Dark Mode)</Typography>
              <Typography variant="body2" color="text.secondary">
                Thay đổi giao diện sáng/tối cho toàn bộ ứng dụng.
              </Typography>
            </Box>
          </Box>
          
          <FormControlLabel
            control={<Switch checked={isDark} onChange={() => dispatch(toggleTheme())} color="primary" />}
            label=""
            sx={{ m: 0 }}
          />
        </Box>
        
        <Divider />
        
        {/* Placeholder for future settings */}
        <Box sx={{ p: 3 }}>
          <Typography variant="body2" color="text.secondary" fontStyle="italic">
            Các cài đặt khác sẽ được thêm vào sau...
          </Typography>
        </Box>

      </Paper>
    </Box>
  );
};