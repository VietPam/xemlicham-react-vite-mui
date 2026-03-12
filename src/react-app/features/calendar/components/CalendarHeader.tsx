// src/react-app/features/calendar/components/CalendarHeader.tsx
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { next, prev } from "@/features/calendar/calendarSlice";

export const CalendarHeader = () => {
  const dispatch = useAppDispatch();
  const { month, year, viewMode } = useAppSelector((state) => state.calendar);

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1} px={1}>
      <IconButton onClick={() => dispatch(prev())}>
        <ArrowBackIcon />
      </IconButton>
      
      <Typography variant="h6" fontWeight="bold" sx={{ textAlign: "center", flexGrow: 1 }}>
        {viewMode === "month" ? `Tháng ${month} - ${year}` : `Năm ${year}`}
      </Typography>

      <IconButton onClick={() => dispatch(next())}>
        <ArrowForwardIcon />
      </IconButton>
    </Box>
  );
};