import { Box, Typography, IconButton, ToggleButton, ToggleButtonGroup } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { next, prev, setViewMode } from "@/features/calendar/calendarSlice";

export const CalendarHeader = () => {
  const dispatch = useAppDispatch();
  const { month, year, viewMode } = useAppSelector((state) => state.calendar);

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} p={1}>
      <Box display="flex" alignItems="center">
        <IconButton onClick={() => dispatch(prev())}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" fontWeight="bold" sx={{ mx: 2, minWidth: 160, textAlign: "center" }}>
          {viewMode === "month" ? `Tháng ${month} - ${year}` : `Năm ${year}`}
        </Typography>
        <IconButton onClick={() => dispatch(next())}>
          <ArrowForwardIcon />
        </IconButton>
      </Box>

      <ToggleButtonGroup
        value={viewMode}
        exclusive
        onChange={(_, newMode) => {
          if (newMode) dispatch(setViewMode(newMode));
        }}
        size="small"
      >
        <ToggleButton value="month" aria-label="month view">
          <CalendarViewMonthIcon sx={{ mr: 1, fontSize: 18 }} /> Tháng
        </ToggleButton>
        <ToggleButton value="year" aria-label="year view">
          <CalendarMonthIcon sx={{ mr: 1, fontSize: 18 }} /> Năm
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};