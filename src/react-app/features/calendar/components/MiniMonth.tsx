import { Box, Typography, Grid, Paper } from "@mui/material";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { jumpToMonth } from "@/features/calendar/calendarSlice";

const DAYS_OF_WEEK = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

export const MiniMonth = ({ targetMonth }: { targetMonth: number }) => {
  const dispatch = useAppDispatch();
  const { year } = useAppSelector((state) => state.calendar);
  const today = dayjs();

  const startOfMonth = dayjs(`${year}-${targetMonth}-01`);
  const daysInMonth = startOfMonth.daysInMonth();
  const startDayOfWeek = startOfMonth.day();

  const daysArray: (number | null)[] = Array(startDayOfWeek).fill(null);
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 1.5, 
        border: "1px solid #e0e0e0", 
        borderRadius: 2,
        cursor: "pointer",
        transition: "all 0.2s",
        "&:hover": { borderColor: "primary.main", boxShadow: 2 }
      }}
      onClick={() => dispatch(jumpToMonth(targetMonth))}
    >
      <Typography variant="subtitle1" fontWeight="bold" color="primary.main" textAlign="center" mb={1}>
        Tháng {targetMonth}
      </Typography>
      
      <Grid container spacing={0.5}>
        {DAYS_OF_WEEK.map((day) => (
          <Grid size={12 / 7} key={day}>
            <Typography variant="caption" display="block" textAlign="center" color="text.secondary" fontWeight="bold">
              {day.replace("T", "")} {/* Shorten T2 to 2 for space */}
            </Typography>
          </Grid>
        ))}
        
        {daysArray.map((day, index) => {
          const isToday = day === today.date() && targetMonth === today.month() + 1 && year === today.year();
          return (
            <Grid size={12 / 7} key={index}>
              <Box 
                display="flex" 
                justifyContent="center" 
                alignItems="center"
                height={24}
                sx={{
                  bgcolor: isToday ? "primary.main" : "transparent",
                  color: isToday ? "white" : "text.primary",
                  borderRadius: "50%",
                }}
              >
                <Typography variant="caption" fontWeight={isToday ? "bold" : "regular"}>
                  {day || ""}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};