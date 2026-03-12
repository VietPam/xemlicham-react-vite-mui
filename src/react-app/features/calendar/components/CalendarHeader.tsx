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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} p={1}>
        <Box display="flex" alignItems="center">
          <IconButton onClick={() => dispatch(prev())}>
            <ArrowBackIcon />
          </IconButton>
          
          <Typography variant="h5" fontWeight="bold" sx={{ mx: 1, minWidth: 150, textAlign: "center" }}>
            {viewMode === "month" ? `Tháng ${month} - ${year}` : `Năm ${year}`}
          </Typography>

          {/* JUMP TO DATE BUTTON */}
          <Tooltip title="Đi đến tháng/năm">
            <IconButton onClick={() => setJumpDialogOpen(true)} color="primary" sx={{ mr: 1 }}>
              <SearchIcon />
            </IconButton>
          </Tooltip>

          <IconButton onClick={() => dispatch(next())}>
            <ArrowForwardIcon />
          </IconButton>
        </Box>

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

      {/* Render the Dialog */}
      <JumpToDateDialog 
        open={jumpDialogOpen} 
        onClose={() => setJumpDialogOpen(false)} 
      />
    </>
  );
};