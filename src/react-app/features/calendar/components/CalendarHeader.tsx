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
      {/* 1. Change the Box to flexWrap and adjust flexDirection for mobile */}
      <Box 
        display="flex" 
        flexDirection={{ xs: "column", sm: "row" }} // Stack vertically on mobile, row on desktop
        justifyContent="space-between" 
        alignItems="center" 
        gap={1.5} // Adds nice spacing when they wrap
        mb={2} 
        p={1}
      >
        <Box display="flex" alignItems="center" width={{ xs: "100%", sm: "auto" }} justifyContent="space-between">
          <IconButton onClick={() => dispatch(prev())}>
            <ArrowBackIcon />
          </IconButton>
          
          <Typography variant="h6" fontWeight="bold" sx={{ mx: 1, textAlign: "center", flexGrow: 1 }}>
            {viewMode === "month" ? `Tháng ${month} - ${year}` : `Năm ${year}`}
          </Typography>

          <IconButton onClick={() => dispatch(next())}>
            <ArrowForwardIcon />
          </IconButton>
        </Box>

        {/* 2. Group the Actions together so they sit nicely below the title on mobile */}
        <Box display="flex" alignItems="center" gap={1}>
          <Tooltip title="Đi đến tháng/năm">
            <IconButton onClick={() => setJumpDialogOpen(true)} color="primary">
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
          >
            <ToggleButton value="month" aria-label="month view">
              <CalendarViewMonthIcon sx={{ mr: 1, fontSize: 18 }} /> Tháng
            </ToggleButton>
            <ToggleButton value="year" aria-label="year view">
              <CalendarMonthIcon sx={{ mr: 1, fontSize: 18 }} /> Năm
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