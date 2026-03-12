// src/react-app/features/calendar/components/CalendarCell.tsx
import { Box, Typography } from "@mui/material";
import { LunarDate } from "@/core/lunarEngine/solarToLunar";
import { LunarEvent } from "@/features/events/eventSlice";
// src/react-app/features/calendar/components/CalendarCell.tsx
// 1. Add isSelected to the props interface
interface CalendarCellProps {
  day: number | null;
  lunarDate?: LunarDate | null;
  isToday?: boolean;
  isSelected?: boolean; // <-- Add this
  dayEvents?: LunarEvent[];
  onClick?: () => void;
}

export const CalendarCell = ({ day, lunarDate, isToday, isSelected, dayEvents = [], onClick }: CalendarCellProps) => {
  if (!day) {
    return <Box sx={{ p: 2, border: "1px solid #eeeeee", backgroundColor: "#fafafa" }} />;
  }

  const displayLunarText = lunarDate 
    ? (lunarDate.day === 1 ? `${lunarDate.day}/${lunarDate.month}` : `${lunarDate.day}`)
    : "--";

  return (
    <Box
      onClick={onClick}
      sx={{
        p: 1,
        height: 85,
        border: "1px solid #eeeeee",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        // 2. Change the background if it is selected!
        backgroundColor: isSelected ? "#e3f2fd" : (isToday ? "#fff5f5" : "white"),
        // 3. Add a highlight ring if selected
        boxShadow: isSelected ? "inset 0 0 0 2px #1976d2" : "none",
        cursor: "pointer",
        position: "relative",
        transition: "all 0.2s ease-in-out",
        "&:hover": { backgroundColor: isSelected ? "#e3f2fd" : "#fafafa", boxShadow: "inset 0 0 0 2px #d32f2f" },
        "&:active": { transform: "scale(0.98)" }
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        {/* We make the text primary blue if it is selected */}
        <Typography variant="body1" fontWeight={isToday || isSelected ? "bold" : "medium"} color={isSelected ? "primary.main" : (isToday ? "error.main" : "text.primary")}>
          {day}
        </Typography>

        {/* Event Indicators */}
        {dayEvents.length > 0 && (
          <Box display="flex" gap={0.5}>
            {dayEvents.slice(0, 3).map((_, i) => (
              <Box key={i} sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "secondary.main" }} />
            ))}
          </Box>
        )}
      </Box>

      {/* Lunar Date */}
      <Typography 
        variant="caption" 
        color={isSelected ? "primary.main" : (isToday ? "error.main" : "text.secondary")}
        sx={{ alignSelf: "flex-end", fontWeight: lunarDate?.day === 1 ? "bold" : "normal" }}
      >
        {displayLunarText}
      </Typography>
    </Box>
  );
};