import { Box, Typography } from "@mui/material";

export const EventsPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>Sự kiện của tôi</Typography>
      <Typography variant="body1">Danh sách sự kiện sẽ được hiển thị ở đây.</Typography>
    </Box>
  );
};