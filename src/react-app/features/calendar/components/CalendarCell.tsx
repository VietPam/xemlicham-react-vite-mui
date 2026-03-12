// src/react-app/features/calendar/components/CalendarCell.tsx
import { Box, Typography } from "@mui/material";
import { LunarDate } from "@/core/lunarEngine/solarToLunar";
import { LunarEvent } from "@/features/events/eventSlice";

interface CalendarCellProps {
  day: number | null;
  lunarDate?: LunarDate | null;
  isToday?: boolean;
  dayEvents?: LunarEvent[]; // <-- New prop
}

export const CalendarCell = ({ day, lunarDate, isToday, dayEvents = [] }: CalendarCellProps) => {
  if (!day) {
    return <Box sx={{ p: 2, border: "1px solid #eeeeee", backgroundColor: "#fafafa" }} />;
  }

  const displayLunarText = lunarDate 
    ? (lunarDate.day === 1 ? `${lunarDate.day}/${lunarDate.month}` : `${lunarDate.day}`)
    : "--";

  return (
    <Box
      sx={{
        p: 1,
        height: 85,
        border: "1px solid #eeeeee",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: isToday ? "#fff5f5" : "white",
        cursor: "pointer",
        position: "relative",
        transition: "all 0.2s ease-in-out",
        "&:hover": { backgroundColor: "#fafafa", boxShadow: "inset 0 0 0 1px #d32f2f" },
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Typography variant="body1" fontWeight={isToday ? "bold" : "medium"} color={isToday ? "primary.main" : "text.primary"}>
          {day}
        </Typography>

        {/* Event Indicators (Little dots in the top right) */}
        {dayEvents.length > 0 && (
          <Box display="flex" gap={0.5}>
            {dayEvents.slice(0, 3).map((_, i) => (
              <Box key={i} sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "secondary.main" }} />
            ))}
          </Box>
        )}
      </Box>

      {/* Lunar Date (Bottom Right) */}
      <Typography 
        variant="caption" 
        color={isToday ? "primary.main" : "text.secondary"}
        sx={{ alignSelf: "flex-end", fontWeight: lunarDate?.day === 1 ? "bold" : "normal" }}
      >
        {displayLunarText}
      </Typography>
    </Box>
  );
};