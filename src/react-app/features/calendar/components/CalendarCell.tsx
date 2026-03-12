// src/react-app/features/calendar/components/CalendarCell.tsx
import { Box, Typography, Tooltip, ClickAwayListener } from "@mui/material";
import { LunarDate } from "@/core/lunarEngine/solarToLunar";
import { LunarEvent } from "@/features/events/eventSlice";
// 2. Add onClearSelection to your props interface
interface CalendarCellProps {
  day: number | null;
  lunarDate?: LunarDate | null;
  isToday?: boolean;
  isSelected?: boolean;
  dayEvents?: LunarEvent[];
  onClick?: () => void;
  onClearSelection?: () => void; // <-- Add this new prop
}

export const CalendarCell = ({ 
  day, lunarDate, isToday, isSelected, dayEvents = [], onClick, onClearSelection 
}: CalendarCellProps) => {
  
  if (!day) {
    return <Box sx={{ p: 2, border: "1px solid #eeeeee", backgroundColor: "#fafafa" }} />;
  }

  const displayLunarText = lunarDate 
    ? (lunarDate.day === 1 ? `${lunarDate.day}/${lunarDate.month}` : `${lunarDate.day}`)
    : "--";

  // 3. Extract the inner cell content so we can wrap it cleanly
  const cellContent = (
    <Box
      onClick={onClick}
      sx={{
        p: 1,
        height: 85,
        border: "1px solid #eeeeee",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: isSelected ? "#e3f2fd" : (isToday ? "#fff5f5" : "white"),
        boxShadow: isSelected ? "inset 0 0 0 2px #1976d2" : "none",
        cursor: "pointer",
        position: "relative",
        transition: "all 0.2s ease-in-out",
        "&:hover": { backgroundColor: isSelected ? "#e3f2fd" : "#fafafa", boxShadow: "inset 0 0 0 2px #d32f2f" },
        "&:active": { transform: "scale(0.98)" }
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Typography variant="body1" fontWeight={isToday || isSelected ? "bold" : "medium"} color={isSelected ? "primary.main" : (isToday ? "error.main" : "text.primary")}>
          {day}
        </Typography>

        {dayEvents.length > 0 && (
          <Box display="flex" gap={0.5}>
            {dayEvents.slice(0, 3).map((_, i) => (
              <Box key={i} sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "secondary.main" }} />
            ))}
          </Box>
        )}
      </Box>

      <Typography 
        variant="caption" 
        color={isSelected ? "primary.main" : (isToday ? "error.main" : "text.secondary")}
        sx={{ alignSelf: "flex-end", fontWeight: lunarDate?.day === 1 ? "bold" : "normal" }}
      >
        {displayLunarText}
      </Typography>
    </Box>
  );

  // 4. Wrap with ClickAwayListener and Tooltip ONLY if it is selected
  if (isSelected) {
    return (
      <ClickAwayListener onClickAway={() => onClearSelection && onClearSelection()}>
        <Box> {/* Extra Box needed so Tooltip and ClickAwayListener don't fight over refs */}
          <Tooltip 
            open={true} // Forces it to stay open as long as it's selected
            title="Ngày bạn tìm" 
            placement="top" 
            arrow
            slotProps={{
              tooltip: { sx: { bgcolor: "primary.main", fontSize: "13px", fontWeight: "bold", py: 1, px: 2 } },
              arrow: { sx: { color: "primary.main" } }
            }}
          >
            {cellContent}
          </Tooltip>
        </Box>
      </ClickAwayListener>
    );
  }

  // If not selected, just render the cell normally
  return cellContent;
};