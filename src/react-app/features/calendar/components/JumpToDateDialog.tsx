// src/react-app/features/calendar/components/JumpToDateDialog.tsx
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { jumpToDate } from "@/features/calendar/calendarSlice";

interface JumpToDateDialogProps {
  open: boolean;
  onClose: () => void;
}

export const JumpToDateDialog = ({ open, onClose }: JumpToDateDialogProps) => {
  const dispatch = useAppDispatch();
  const currentMonth = useAppSelector((state) => state.calendar.month);
  const currentYear = useAppSelector((state) => state.calendar.year);

  // Local state for the form inputs
  const [inputMonth, setInputMonth] = useState(currentMonth);
  const [inputYear, setInputYear] = useState<number | "">(currentYear);

  // Sync local state when dialog opens
  useEffect(() => {
    if (open) {
      setInputMonth(currentMonth);
      setInputYear(currentYear);
    }
  }, [open, currentMonth, currentYear]);

  const handleJump = () => {
    // Basic validation to ensure we have a valid year
    const finalYear = typeof inputYear === "number" ? inputYear : currentYear;
    
    // Dispatch the jump action
    dispatch(jumpToDate({ month: inputMonth, year: finalYear }));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle fontWeight="bold">Đi Đến Ngày</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" gap={2} mt={1}>
          {/* Month Dropdown */}
          <TextField
            select
            label="Tháng"
            value={inputMonth}
            onChange={(e) => setInputMonth(Number(e.target.value))}
            fullWidth
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
              <MenuItem key={m} value={m}>
                Tháng {m}
              </MenuItem>
            ))}
          </TextField>

          {/* Year Number Input */}
          <TextField
            label="Năm"
            type="number"
            value={inputYear}
            onChange={(e) => setInputYear(e.target.value === "" ? "" : Number(e.target.value))}
            fullWidth
            inputProps={{ min: 1900, max: 2100 }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Hủy</Button>
        <Button 
          onClick={handleJump} 
          variant="contained" 
          color="primary"
          disabled={inputYear === "" || inputYear < 1900 || inputYear > 2100}
        >
          Đi Đến
        </Button>
      </DialogActions>
    </Dialog>
  );
};