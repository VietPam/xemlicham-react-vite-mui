// src/react-app/features/calendar/components/CalendarCell.tsx
import { Box, Typography } from "@mui/material";
import { LunarDate } from "@/core/lunarEngine/solarToLunar";

interface CalendarCellProps {
  day: number | null;
  lunarDate?: LunarDate | null;
  isToday?: boolean;
}

export const CalendarCell = ({ day, lunarDate, isToday }: CalendarCellProps) => {
  if (!day) {
    return <Box sx={{ p: 2, border: "1px solid #eeeeee", backgroundColor: "#fafafa" }} />;
  }

  // Vietnamese calendar rule: Show the lunar month if it's the 1st of the lunar month
  const displayLunarText = lunarDate 
    ? (lunarDate.day === 1 ? `${lunarDate.day}/${lunarDate.month}` : `${lunarDate.day}`)
    : "--";

  return (
    <Box
      sx={{
        p: 1,
        height: 80,
        border: "1px solid #eeeeee",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: isToday ? "#fff5f5" : "white",
        cursor: "pointer",
        position: "relative",
        transition: "all 0.2s ease-in-out",
        "&:hover": { 
          backgroundColor: "#fafafa",
          boxShadow: "inset 0 0 0 1px #d32f2f" 
        },
      }}
    >
      {/* Solar Date (Top Left) */}
      <Typography
        variant="body1"
        fontWeight={isToday ? "bold" : "medium"}
        color={isToday ? "primary.main" : "text.primary"}
      >
        {day}
      </Typography>

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