// src/react-app/features/calendar/components/CalendarTable.tsx
import { Box, Paper, Grid } from "@mui/material";
import dayjs from "dayjs";
import { useAppSelector } from "@/app/hooks";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarCell } from "./CalendarCell";
import { convertSolarToLunar } from "@/core/lunarEngine/solarToLunar";

const DAYS_OF_WEEK = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

export const CalendarTable = () => {
  const { month, year } = useAppSelector((state) => state.calendar);

  const startOfMonth = dayjs(`${year}-${month}-01`);
  const daysInMonth = startOfMonth.daysInMonth();
  const startDayOfWeek = startOfMonth.day();

  const daysArray: (number | null)[] = Array(startDayOfWeek).fill(null);
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  const today = dayjs();

  return (
    <Paper elevation={0} sx={{ border: "1px solid #e0e0e0", borderRadius: 2, overflow: 'hidden', maxWidth: 800, margin: "0 auto", mt: 4 }}>
      <CalendarHeader />
      
      <Grid container>
        {DAYS_OF_WEEK.map((day, index) => (
          <Grid size={12 / 7} key={day}>
            <Box 
              textAlign="center" 
              fontWeight="bold" 
              py={1.5} 
              bgcolor="#f8f9fa"
              color={index === 0 ? "primary.main" : "text.secondary"} // Make Sunday Red
              borderBottom="1px solid #e0e0e0"
            >
              {day}
            </Box>
          </Grid>
        ))}
      </Grid>

      <Grid container>
        {daysArray.map((day, index) => {
          const isToday = day === today.date() && month === today.month() + 1 && year === today.year();
          
          // Execute Core Engine Math
          const lunarDate = day ? convertSolarToLunar(day, month, year) : null;

          return (
            <Grid size={12 / 7} key={index}>
              <CalendarCell day={day} lunarDate={lunarDate} isToday={isToday} />
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};