import { Box, Paper, Grid } from "@mui/material";
import dayjs from "dayjs";
import { useAppSelector } from "@/app/hooks";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarCell } from "./CalendarCell";

const DAYS_OF_WEEK = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

export const CalendarTable = () => {
  const { month, year } = useAppSelector((state) => state.calendar);

  // Calculate days for the grid
  const startOfMonth = dayjs(`${year}-${month}-01`);
  const daysInMonth = startOfMonth.daysInMonth();
  const startDayOfWeek = startOfMonth.day(); // 0 is Sunday, 1 is Monday, etc.

  // Create an array representing the days of the month, padded with nulls at the start
  const daysArray: (number | null)[] = Array(startDayOfWeek).fill(null);
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  const today = dayjs();

  return (
    <Paper elevation={3} sx={{ p: 2, maxWidth: 800, margin: "0 auto", mt: 4 }}>
      <CalendarHeader />
      
      {/* Weekday headers */}
      <Grid container>
        {DAYS_OF_WEEK.map((day) => (
          <Grid item xs={12 / 7} key={day}>
            <Box textAlign="center" fontWeight="bold" py={1} borderBottom="2px solid #e0e0e0">
              {day}
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Calendar Grid */}
      <Grid container>
        {daysArray.map((day, index) => {
          const isToday = day === today.date() && month === today.month() + 1 && year === today.year();
          return (
            <Grid item xs={12 / 7} key={index}>
              <CalendarCell day={day} isToday={isToday} />
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};