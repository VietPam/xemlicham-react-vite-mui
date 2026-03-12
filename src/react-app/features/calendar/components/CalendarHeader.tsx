// src/react-app/features/calendar/components/CalendarHeader.tsx
import { useState } from "react";
import { Box, Typography, IconButton, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search"; // <-- Import Search Icon
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { next, prev, setViewMode } from "@/features/calendar/calendarSlice";
import { JumpToDateDialog } from "./JumpToDateDialog"; // <-- Import Dialog

export const CalendarHeader = () => {
  const dispatch = useAppDispatch();
  const { month, year, viewMode } = useAppSelector((state) => state.calendar);
  
  // State to control the Jump to Date dialog
  const [jumpDialogOpen, setJumpDialogOpen] = useState(false);

  return (
    <>
      <Box 
        display="flex" 
        flexDirection={{ xs: "column", sm: "row" }} 
        justifyContent="space-between" 
        alignItems="center" 
        gap={2} // Slightly more breathing room between the two rows
        mb={2} 
        p={1}
      >
        {/* ROW 1: Navigation */}
        <Box display="flex" alignItems="center" width={{ xs: "100%", sm: "auto" }} justifyContent="space-between">
          <IconButton onClick={() => dispatch(prev())}>
            <ArrowBackIcon />
          </IconButton>
          
          <Typography variant="h6" fontWeight="bold" sx={{ textAlign: "center", flexGrow: 1 }}>
            {viewMode === "month" ? `Tháng ${month} - ${year}` : `Năm ${year}`}
          </Typography>

          <IconButton onClick={() => dispatch(next())}>
            <ArrowForwardIcon />
          </IconButton>
        </Box>

        {/* ROW 2: Actions */}
        <Box 
          display="flex" 
          alignItems="center" 
          width={{ xs: "100%", sm: "auto" }} 
          justifyContent={{ xs: "space-between", sm: "flex-end" }} // Spreads elements on mobile, pushes to right on desktop
        >
          <Tooltip title="Đi đến tháng/năm">
            <IconButton 
              onClick={() => setJumpDialogOpen(true)} 
              color="primary"
              sx={{ bgcolor: "rgba(0, 0, 0, 0.04)" }} // Gives it a soft, button-like background
            >
              <SearchIcon />
            </IconButton>
          </Tooltip>

          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_, newMode) => {
              if (newMode) dispatch(setViewMode(newMode));
            }}
            size="small"
            color="primary" // Makes the active state use your main theme color
          >
            {/* Removed the small icons and added horizontal padding (px) for a wider, cleaner click area */}
            <ToggleButton value="month" sx={{ px: 3, fontWeight: "bold" }}>
              Tháng
            </ToggleButton>
            <ToggleButton value="year" sx={{ px: 3, fontWeight: "bold" }}>
              Năm
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {/* Render the Dialog */}
      <JumpToDateDialog 
        open={jumpDialogOpen} 
        onClose={() => setJumpDialogOpen(false)} 
      />
    </>
  );
};