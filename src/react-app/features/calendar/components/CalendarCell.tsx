import { Box, Typography } from "@mui/material";

interface CalendarCellProps {
  day: number | null;
  isToday?: boolean;
}

export const CalendarCell = ({ day, isToday }: CalendarCellProps) => {
  if (!day) {
    // Empty cell for padding at the start/end of the month
    return <Box sx={{ p: 2, border: "1px solid #e0e0e0", backgroundColor: "#fafafa" }} />;
  }

  return (
    <Box
      sx={{
        p: 2,
        height: 80,
        border: "1px solid #e0e0e0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: isToday ? "#ffebee" : "white",
        cursor: "pointer",
        "&:hover": { backgroundColor: "#f5f5f5" },
      }}
    >
      <Typography
        variant="h6"
        fontWeight={isToday ? "bold" : "normal"}
        color={isToday ? "primary.main" : "text.primary"}
      >
        {day}
      </Typography>
      {/* Lunar date placeholder for Milestone 2 */}
      <Typography variant="caption" color="text.secondary">
        --
      </Typography>
    </Box>
  );
};