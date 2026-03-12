import { Box, Typography } from "@mui/material";

export const SettingsPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>Cài đặt</Typography>
      <Typography variant="body1">Tùy chỉnh giao diện và Dark Mode sẽ nằm ở đây.</Typography>
    </Box>
  );
};