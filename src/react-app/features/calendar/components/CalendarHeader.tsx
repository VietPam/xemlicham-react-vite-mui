import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { nextMonth, prevMonth } from "@/features/calendar/calendarSlice";

export const CalendarHeader = () => {
  const dispatch = useAppDispatch();
  const { month, year } = useAppSelector((state) => state.calendar);

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} p={1}>
      <IconButton onClick={() => dispatch(prevMonth())}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h5" fontWeight="bold">
        Tháng {month} - {year}
      </Typography>
      <IconButton onClick={() => dispatch(nextMonth())}>
        <ArrowForwardIcon />
      </IconButton>
    </Box>
  );
};