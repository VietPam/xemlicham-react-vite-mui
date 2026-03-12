// src/react-app/features/calendar/components/SearchDateDialog.tsx
import { useState } from "react";
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, TextField, Box, Tabs, Tab, Grid 
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { closeSearchDialog, jumpToDate } from "@/features/calendar/calendarSlice";
import { convertLunarToSolar } from "@/core/lunarEngine/lunarToSolar";

export const SearchDateDialog = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.calendar.isSearchDialogOpen);

  // Tab state: 0 for Solar (Dương), 1 for Lunar (Âm)
  const [tabValue, setTabValue] = useState(0);

  // Form state
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleClose = () => {
    dispatch(closeSearchDialog());
  };

  const handleSearch = () => {
    const d = parseInt(day);
    const m = parseInt(month);
    const y = parseInt(year);

    if (!m || !y) return; // Basic validation

    if (tabValue === 0) {
      // DƯƠNG LỊCH (Solar) Search
      // Just jump directly to the entered month and year
      dispatch(jumpToDate({ month: m, year: y }));
    } else {
     // ÂM LỊCH (Lunar)
      // d defaults to 1 if user leaves it blank
      const targetDay = d || 1; 
      
      // Use the engine to find the Solar equivalent!
      const solarDate = convertLunarToSolar(targetDay, m, y, false); 
      
      if (solarDate) {
        dispatch(jumpToDate({ month: solarDate.month, year: solarDate.year }));
      } else {
        alert("Ngày âm lịch không hợp lệ!");
        return; // don't close dialog if invalid
      }
    }

    handleClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ pb: 1, fontWeight: "bold" }}>Tìm kiếm ngày</DialogTitle>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} variant="fullWidth">
          <Tab label="Dương Lịch" sx={{ fontWeight: "bold" }} />
          <Tab label="Âm Lịch" sx={{ fontWeight: "bold" }} />
        </Tabs>
      </Box>

      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={2}>
          <Grid size={4}>
            <TextField 
              label="Ngày" 
              type="number" 
              fullWidth 
              size="small" 
              value={day} 
              onChange={(e) => setDay(e.target.value)} 
            />
          </Grid>
          <Grid size={4}>
            <TextField 
              label="Tháng" 
              type="number" 
              fullWidth 
              size="small" 
              value={month} 
              onChange={(e) => setMonth(e.target.value)} 
            />
          </Grid>
          <Grid size={4}>
            <TextField 
              label="Năm" 
              type="number" 
              fullWidth 
              size="small" 
              value={year} 
              onChange={(e) => setYear(e.target.value)} 
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} color="inherit">Hủy</Button>
        <Button onClick={handleSearch} variant="contained" disableElevation>Tìm Kiếm</Button>
      </DialogActions>
    </Dialog>
  );
};